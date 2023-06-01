/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { MotdModal } from '../global-dialogs/motd-modal/motd-modal'
import { BaseAppBar } from '../layout/app-bar/base-app-bar'
import { Footer } from './footer/footer'
import { HeaderBar } from './navigation/header-bar/header-bar'
import type { PropsWithChildren } from 'react'
import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'

/**
 * Renders the layout for both intro and history page.
 *
 * @param children The children that should be rendered on the page.
 */
export const LandingLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Fragment>
      <MotdModal />
      <BaseAppBar />
      <Container className='text-light d-flex flex-column'>
        <HeaderBar />
        <div className={'d-flex flex-column justify-content-between flex-fill text-center'}>
          <main>{children}</main>
          <Footer />
        </div>
      </Container>
    </Fragment>
  )
}
