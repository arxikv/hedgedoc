/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ModalVisibilityProps } from '../../common/modals/common-modal'
import { CommonModal } from '../../common/modals/common-modal'
import { ShortcutsContent } from './shortcuts-content'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { QuestionCircle as IconQuestionCircle } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

export const ShortcutsModal: React.FC<ModalVisibilityProps> = ({ show, onHide }) => {
  const { t } = useTranslation()

  return (
    <CommonModal
      titleIcon={IconQuestionCircle}
      show={show}
      onHide={onHide}
      showCloseButton={true}
      title={t('editor.help.shortcuts.title') ?? undefined}>
      <Modal.Body>
        <ShortcutsContent />
      </Modal.Body>
    </CommonModal>
  )
}
