/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import links from '../../../../../../links.json'
import { DropdownHeader } from '../dropdown-header'
import { TranslatedDropdownItem } from '../translated-dropdown-item'
import React, { Fragment } from 'react'
import { ChatDotsFill as IconChatDotsFill } from 'react-bootstrap-icons'
import { Mastodon as IconMastodon } from 'react-bootstrap-icons'
import { People as IconPeople } from 'react-bootstrap-icons'

export const SocialLinksSubmenu: React.FC = () => {
  return (
    <Fragment>
      <DropdownHeader i18nKey={'appbar.help.social.header'} />
      <TranslatedDropdownItem
        i18nKey={'appbar.help.social.discourse'}
        icon={IconPeople}
        href={links.community}
        target={'_blank'}
      />
      <TranslatedDropdownItem
        i18nKey={'appbar.help.social.matrix'}
        icon={IconChatDotsFill}
        href={links.chat}
        target={'_blank'}
      />
      <TranslatedDropdownItem
        i18nKey={'appbar.help.social.mastodon'}
        icon={IconMastodon}
        href={links.mastodon}
        target={'_blank'}
      />
    </Fragment>
  )
}
