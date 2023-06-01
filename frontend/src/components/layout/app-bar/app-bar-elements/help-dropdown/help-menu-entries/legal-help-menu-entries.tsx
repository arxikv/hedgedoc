/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useFrontendConfig } from '../../../../../common/frontend-config-context/use-frontend-config'
import { ShowIf } from '../../../../../common/show-if/show-if'
import React, { Fragment, useMemo } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export const LegalHelpMenuEntries: React.FC = () => {
  useTranslation()
  const specialUrls = useFrontendConfig().specialUrls
  const linksConfigured = useMemo(
    () => specialUrls.privacy || specialUrls.termsOfUse || specialUrls.imprint,
    [specialUrls]
  )

  if (!linksConfigured) {
    return null
  }

  return (
    <Fragment>
      <Dropdown.Header>
        <Trans i18nKey={'help.legal'} />
      </Dropdown.Header>
      <ShowIf condition={!!specialUrls.privacy}>
        <Dropdown.Item href={specialUrls.privacy}>
          <Trans i18nKey={'landing.footer.privacy'} />
        </Dropdown.Item>
      </ShowIf>
      <ShowIf condition={!!specialUrls.termsOfUse}>
        <Dropdown.Item href={specialUrls.termsOfUse}>
          <Trans i18nKey={'landing.footer.termsOfUse'} />
        </Dropdown.Item>
      </ShowIf>
      <ShowIf condition={!!specialUrls.imprint}>
        <Dropdown.Item href={specialUrls.imprint}>
          <Trans i18nKey={'landing.footer.imprint'} />
        </Dropdown.Item>
      </ShowIf>
      <Dropdown.Divider />
    </Fragment>
  )
}
