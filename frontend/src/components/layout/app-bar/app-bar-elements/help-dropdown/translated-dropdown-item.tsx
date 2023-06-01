/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { UiIcon } from '../../../../common/icons/ui-icon'
import { ShowIf } from '../../../../common/show-if/show-if'
import type { TOptions } from 'i18next'
import React, { useMemo } from 'react'
import { Dropdown } from 'react-bootstrap'
import type { Icon } from 'react-bootstrap-icons'
import type { DropdownItemProps } from 'react-bootstrap/DropdownItem'
import { useTranslation } from 'react-i18next'

interface TranslatedDropdownItemProps extends DropdownItemProps {
  i18nKey: string
  i18nKeyOptions?: TOptions
  icon?: Icon
  target?: string
}

export const TranslatedDropdownItem: React.FC<TranslatedDropdownItemProps> = ({
  i18nKey,
  i18nKeyOptions,
  icon,
  ...props
}) => {
  const { t } = useTranslation()
  const title = useMemo(() => t(i18nKey, i18nKeyOptions ?? {}), [i18nKey, i18nKeyOptions, t])

  return (
    <Dropdown.Item {...props} title={title} className={'d-flex align-items-center'}>
      <ShowIf condition={!!icon}>
        <UiIcon icon={icon} className={'me-2'} />
      </ShowIf>
      <span>{title}</span>
    </Dropdown.Item>
  )
}
