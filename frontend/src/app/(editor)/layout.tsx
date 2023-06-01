/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import '../../../global-styles/index.scss'
import { ApplicationLoader } from '../../components/application-loader/application-loader'
import { BaseUrlContextProvider } from '../../components/common/base-url/base-url-context-provider'
import { FrontendConfigContextProvider } from '../../components/common/frontend-config-context/frontend-config-context-provider'
import appleTouchIcon from '../../components/favicon/apple-touch-icon.png'
import favicon16 from '../../components/favicon/favicon-16x16.png'
import favicon32 from '../../components/favicon/favicon-32x32.png'
import faviconIco from '../../components/favicon/favicon.ico'
import { ExpectedOriginBoundary } from '../../components/layout/expected-origin-boundary'
import { UiNotificationBoundary } from '../../components/notifications/ui-notification-boundary'
import { StoreProvider } from '../../redux/store-provider'
import { getBaseUrls } from '../../utils/base-url-parser'
import { configureLuxon } from '../../utils/configure-luxon'
import { getFrontendConfig } from '../../utils/frontend-config-fetcher'
import type { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'
import { AppBar } from '../../components/editor-page/app-bar/app-bar'

configureLuxon()

interface RootLayoutProps extends PropsWithChildren {
  appBar: React.ReactNode
}

export default async function RootLayout({ children, appBar }: RootLayoutProps) {
  const baseUrls = getBaseUrls()
  const frontendConfig = await getFrontendConfig() //some tests mock the frontend config. Therefore it needs to be fetched in the browser.

  return (
    <html lang='en'>
      <head>
        <base href={baseUrls?.editor} />
      </head>
      <body>
        <ExpectedOriginBoundary expectedOrigin={baseUrls.editor}>
          <BaseUrlContextProvider baseUrls={baseUrls}>
            <FrontendConfigContextProvider config={frontendConfig}>
              <StoreProvider>
                <ApplicationLoader>
                  <UiNotificationBoundary>
                    <div className={'d-flex flex-column vh-100'}>
                      {appBar}
                      {children}
                    </div>
                  </UiNotificationBoundary>
                </ApplicationLoader>
              </StoreProvider>
            </FrontendConfigContextProvider>
          </BaseUrlContextProvider>
        </ExpectedOriginBoundary>
      </body>
    </html>
  )
}

export function generateMetadata(): Promise<Metadata> {
  const url = getBaseUrls().editor
  if (url === undefined) {
    throw new Error()
  }
  return Promise.resolve({
    metadataBase: new URL(url),
    icons: {
      apple: appleTouchIcon.src,
      icon: [
        { url: favicon32.src, sizes: '32x32', type: 'image/png' },
        { url: favicon16.src, sizes: '16x16', type: 'image/png' }
      ],
      shortcut: faviconIco.src
    },
    themeColor: '#b51f08',
    applicationName: 'HedgeDoc',
    appleWebApp: {
      title: 'HedgeDoc'
    },
    description: 'HedgeDoc - Collaborative markdown notes',
    viewport: 'width=device-width, initial-scale=1',
    title: 'HedgeDoc',
    manifest: '/icons/site.webmanifest'
  })
}
