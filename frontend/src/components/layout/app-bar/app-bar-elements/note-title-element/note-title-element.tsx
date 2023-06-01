/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useMayEdit } from '../../../../../hooks/common/use-may-edit'
import { useNoteTitle } from '../../../../../hooks/common/use-note-title'
import { ShowIf } from '../../../../common/show-if/show-if'
import styles from './note-title-element.module.css'
import React from 'react'

/**
 * Renders the title of the current note and an optional read-only marker.
 */
export const NoteTitleElement: React.FC = () => {
  const isWriteable = useMayEdit()
  const noteTitle = useNoteTitle()

  return (
    <div className={'d-flex flex-column align-items-center'}>
      <span>{noteTitle}</span>
      <ShowIf condition={!isWriteable}>
        <span className={`text-secondary ${styles['read-only-marker']}`}>read-only</span>
      </ShowIf>
    </div>
  )
}
