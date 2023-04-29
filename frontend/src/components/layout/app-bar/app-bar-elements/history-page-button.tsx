/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { IconButton } from '../../../common/icon-button/icon-button'
import Link from 'next/link'
import React from 'react'
import { ClockHistory } from 'react-bootstrap-icons'
import { Trans } from 'react-i18next'

export const HistoryPageButton: React.FC = () => {
  return (
    <Link href={'/history'} passHref={true}>
      <IconButton size={'sm'} icon={ClockHistory}>
        <Trans i18nKey='navigation.history' />
      </IconButton>
    </Link>
  )
}
