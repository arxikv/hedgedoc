/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { NoteTitleElement } from './app-bar-elements/note-title-element/note-title-element'
import { BaseAppBar } from './base-app-bar'
import React from 'react'

export const EditorAppBar: React.FC = () => {
  return (
    <BaseAppBar>
      <NoteTitleElement />
    </BaseAppBar>
  )
}
