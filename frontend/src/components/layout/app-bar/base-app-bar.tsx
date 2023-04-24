/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { NewNoteButton } from '../../common/new-note-button/new-note-button'
import { SettingsButton } from '../../global-dialogs/settings-dialog/settings-button'
import { BrandingElement } from './app-bar-elements/branding-element'
import { HelpDropdown } from './app-bar-elements/help-dropdown/help-dropdown'
import { UserElement } from './app-bar-elements/user-element'
import styles from './navbar.module.scss'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

export const BaseAppBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Navbar expand={true} className={'bg-light px-2 py-1 align-items-center'}>
      <BrandingElement />
      <Nav className={`d-flex align-items-center ${styles.center}`}>{children}</Nav>
      <Nav className={`d-flex align-items-center justify-content-end gap-2 flex-grow-1 ${styles.side}`}>
        <HelpDropdown />
        <SettingsButton />
        <NewNoteButton />
        <UserElement />
      </Nav>
    </Navbar>
  )
}
