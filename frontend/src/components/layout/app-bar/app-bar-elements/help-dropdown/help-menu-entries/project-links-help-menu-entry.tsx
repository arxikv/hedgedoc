/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useBooleanState } from '../../../../../../hooks/common/use-boolean-state'
import links from '../../../../../../links.json'
import { TranslatedExternalLink } from '../../../../../common/links/translated-external-link'
import { CommonModal } from '../../../../../common/modals/common-modal'
import React, { Fragment } from 'react'
import { Dropdown, Modal } from 'react-bootstrap'
import {
  Globe as IconGlobe,
  Flag as IconFlag,
  Hash as IconHash,
  PeopleFill as IconPeopleFill,
  Tag as IconTag
} from 'react-bootstrap-icons'
import { Trans, useTranslation } from 'react-i18next'

export const ProjectLinksHelpMenuEntry: React.FC = () => {
  const { t } = useTranslation()
  const [modalVisibility, showModal, closeModal] = useBooleanState()

  return (
    <Fragment>
      <Dropdown.Item title={t('help.projectLinks') ?? undefined} onClick={showModal}>
        <Trans i18nKey={'help.projectLinks'}></Trans>
      </Dropdown.Item>
      <CommonModal
        show={modalVisibility}
        onHide={closeModal}
        title={t('help.projectLinks') ?? undefined}
        showCloseButton={true}
        titleIcon={IconGlobe}
        modalSize={'sm'}>
        <Modal.Body>
          <ul className='list-unstyled'>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.community'
                href={links.community}
                icon={IconPeopleFill}
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.meetUsOn'
                i18nOption={{ service: 'Matrix' }}
                href={links.chat}
                icon={IconHash}
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.reportIssue'
                href={links.issues}
                icon={IconTag}
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.helpTranslating'
                href={links.translate}
                icon={IconFlag}
                className='text-primary'
              />
            </li>
          </ul>
        </Modal.Body>
      </CommonModal>
    </Fragment>
  )
}
