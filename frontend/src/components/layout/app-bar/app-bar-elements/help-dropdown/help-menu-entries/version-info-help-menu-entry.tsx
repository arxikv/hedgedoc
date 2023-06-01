/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useBooleanState } from '../../../../../../hooks/common/use-boolean-state'
import { VersionInfoModal } from '../../../../../global-dialogs/version-info-modal/version-info-modal'
import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export const VersionInfoHelpMenuEntry: React.FC = () => {
  const { t } = useTranslation()
  const [modalVisibility, showModal, closeModal] = useBooleanState()

  return (
    <Fragment>
      <Dropdown.Item title={t('landing.versionInfo.versionInfo') ?? undefined} onClick={showModal}>
        <Trans i18nKey={'landing.versionInfo.versionInfo'}></Trans>
      </Dropdown.Item>
      <VersionInfoModal show={modalVisibility} onHide={closeModal} />
    </Fragment>
  )
}
