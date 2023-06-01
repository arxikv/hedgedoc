/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useBooleanState } from '../../../../../../hooks/common/use-boolean-state'
import { ShortcutsModal } from '../../../../../global-dialogs/shortcuts-modal/shortcuts-modal'
import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export const ShortcutsHelpMenuEntry: React.FC = () => {
  const { t } = useTranslation()
  const [modalVisibility, showModal, closeModal] = useBooleanState()

  return (
    <Fragment>
      <Dropdown.Item title={t('editor.help.shortcuts.title') ?? undefined} onClick={showModal}>
        <Trans i18nKey={'editor.help.shortcuts.title'}></Trans>
      </Dropdown.Item>
      <ShortcutsModal show={modalVisibility} onHide={closeModal} />
    </Fragment>
  )
}
