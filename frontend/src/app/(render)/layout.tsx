/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import '../../../global-styles/index.scss'
import { ApplicationLoader } from '../../components/application-loader/application-loader'
import { BaseUrlContextProvider } from '../../components/common/base-url/base-url-context-provider'
import { FrontendConfigContextProvider } from '../../components/common/frontend-config-context/frontend-config-context-provider'
import { ExpectedOriginBoundary } from '../../components/layout/expected-origin-boundary'
import { StoreProvider } from '../../redux/store-provider'
import { getBaseUrls } from '../../utils/base-url-parser'
import { getFrontendConfig } from '../../utils/frontend-config-fetcher'
import React from 'react'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrls = getBaseUrls()
  const frontendConfig = await getFrontendConfig() //some tests mock the frontend config. Therefore it needs to be fetched in the browser.

  return (
    <html lang='en'>
      <head>
        <base href={baseUrls?.renderer} />
      </head>
      <body>
        <ExpectedOriginBoundary expectedOrigin={baseUrls.renderer}>
          <BaseUrlContextProvider baseUrls={baseUrls}>
            <FrontendConfigContextProvider config={frontendConfig}>
              <StoreProvider>
                <ApplicationLoader>{children}</ApplicationLoader>
              </StoreProvider>
            </FrontendConfigContextProvider>
          </BaseUrlContextProvider>
        </ExpectedOriginBoundary>
      </body>
    </html>
  )
}
