/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useBooleanState } from '../../../../../../hooks/common/use-boolean-state'
import { cypressId } from '../../../../../../utils/cypress-attribute'
import { CheatsheetContent } from '../../../../../cheatsheet/cheatsheet-content'
import { CheatsheetInNewTabButton } from '../../../../../cheatsheet/cheatsheet-in-new-tab-button'
import { CommonModal } from '../../../../../common/modals/common-modal'
import React, { Fragment } from 'react'
import { Dropdown, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export const CheatsheetHelpMenuEntry: React.FC = () => {
  const { t } = useTranslation()
  const [modalVisibility, showModal, closeModal] = useBooleanState()

  return (
    <Fragment>
      <Dropdown.Item
        {...cypressId('open.cheatsheet-button')}
        title={t('cheatsheet.button') ?? undefined}
        onClick={showModal}>
        <Trans i18nKey={'cheatsheet.button'}></Trans>
      </Dropdown.Item>
      <CommonModal
        modalSize={'xl'}
        show={modalVisibility}
        onHide={closeModal}
        showCloseButton={true}
        titleI18nKey={'cheatsheet.modal.title'}
        additionalTitleElement={
          <div className={'d-flex flex-row-reverse w-100 mx-2'}>
            <CheatsheetInNewTabButton onClick={closeModal} />
          </div>
        }>
        <Modal.Body>
          <CheatsheetContent />
        </Modal.Body>
      </CommonModal>
    </Fragment>
  )
}
