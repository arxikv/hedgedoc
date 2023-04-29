/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useApplyDarkModeStyle } from '../../hooks/dark-mode/use-apply-dark-mode-style'
import { useSaveDarkModePreferenceToLocalStorage } from '../../hooks/dark-mode/use-save-dark-mode-preference-to-local-storage'
import { MotdModal } from '../global-dialogs/motd-modal/motd-modal'
import { BaseAppBar } from './app-bar/base-app-bar'
import type { PropsWithChildren } from 'react'
import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'

/**
 * Renders the layout for both intro and history page.
 *
 * @param children The children that should be rendered on the page.
 */
export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  useApplyDarkModeStyle()
  useSaveDarkModePreferenceToLocalStorage()

  return (
    <Fragment>
      <MotdModal />
      <BaseAppBar />
      <main>
        <Container>{children}</Container>
      </main>
    </Fragment>
  )
}
