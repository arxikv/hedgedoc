/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { NoteTitleElement } from '../../../../components/layout/app-bar/app-bar-elements/note-title-element/note-title-element'
import { BaseAppBar } from '../../../../components/layout/app-bar/base-app-bar'
import React from 'react'

export default function EditorAppBar() {
  return (
    <BaseAppBar>
      <NoteTitleElement />
    </BaseAppBar>
  )
}
