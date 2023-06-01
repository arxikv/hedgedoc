/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { UiIcon } from '../../../../common/icons/ui-icon'
import { CheatsheetHelpMenuEntry } from './help-menu-entries/cheatsheet-help-menu-entry'
import { LegalHelpMenuEntries } from './help-menu-entries/legal-help-menu-entries'
import { ProjectLinksHelpMenuEntry } from './help-menu-entries/project-links-help-menu-entry'
import { ShortcutsHelpMenuEntry } from './help-menu-entries/shortcuts-help-menu-entry'
import { VersionInfoHelpMenuEntry } from './help-menu-entries/version-info-help-menu-entry'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { QuestionLg as IconQuestion } from 'react-bootstrap-icons'
import { Trans, useTranslation } from 'react-i18next'

/**
 * Renders the help dropdown in the app bar.
 */
export const HelpDropdown: React.FC = () => {
  useTranslation()

  return (
    <Dropdown>
      <Dropdown.Toggle size={'sm'}>
        <UiIcon icon={IconQuestion} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>
          <Trans i18nKey={'help.help'} />
        </Dropdown.Header>
        <ShortcutsHelpMenuEntry />
        <CheatsheetHelpMenuEntry />
        <Dropdown.Divider />
        <LegalHelpMenuEntries />
        <Dropdown.Header>
          <Trans i18nKey={'help.about'} />
        </Dropdown.Header>
        <VersionInfoHelpMenuEntry />
        <ProjectLinksHelpMenuEntry />
      </Dropdown.Menu>
    </Dropdown>
  )
}
