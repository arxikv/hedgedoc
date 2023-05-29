'use client'

/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { MotdModal } from '../../../../components/common/motd-modal/motd-modal'
import type { NoteIdProps } from '../../../../components/common/note-loading-boundary/note-loading-boundary'
import { NoteLoadingBoundary } from '../../../../components/common/note-loading-boundary/note-loading-boundary'
import { DocumentReadOnlyPageContent } from '../../../../components/document-read-only-page/document-read-only-page-content'
import { AppBar, AppBarMode } from '../../../../components/editor-page/app-bar/app-bar'
import { useNoteAndAppTitle } from '../../../../components/editor-page/head-meta-properties/use-note-and-app-title'
import { EditorToRendererCommunicatorContextProvider } from '../../../../components/editor-page/render-context/editor-to-renderer-communicator-context-provider'
import { useApplyDarkModeStyle } from '../../../../hooks/dark-mode/use-apply-dark-mode-style'
import { useSaveDarkModePreferenceToLocalStorage } from '../../../../hooks/dark-mode/use-save-dark-mode-preference-to-local-storage'
import type { NextPage } from 'next'
import React from 'react'

interface PageParams {
  params: NoteIdProps
}

/**
 * Renders a page that contains only the rendered document without an editor or realtime updates.
 */
const DocumentReadOnlyPage: NextPage<PageParams> = ({ params }) => {
  useApplyDarkModeStyle()
  useSaveDarkModePreferenceToLocalStorage()
  useNoteAndAppTitle()

  return (
    <EditorToRendererCommunicatorContextProvider>
      <NoteLoadingBoundary noteId={params.noteId}>
        <MotdModal />
        <div className={'d-flex flex-column mvh-100 bg-light'}>
          <AppBar mode={AppBarMode.BASIC} />
          <DocumentReadOnlyPageContent />
        </div>
      </NoteLoadingBoundary>
    </EditorToRendererCommunicatorContextProvider>
  )
}

export default DocumentReadOnlyPage
