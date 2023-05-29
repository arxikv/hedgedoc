'use client'

/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { NoteIdProps } from '../../../../components/common/note-loading-boundary/note-loading-boundary'
import { NoteLoadingBoundary } from '../../../../components/common/note-loading-boundary/note-loading-boundary'
import { EditorPageContent } from '../../../../components/editor-page/editor-page-content'
import { EditorToRendererCommunicatorContextProvider } from '../../../../components/editor-page/render-context/editor-to-renderer-communicator-context-provider'
import { ResetRealtimeStateBoundary } from '../../../../components/editor-page/reset-realtime-state-boundary'
import { useApplyDarkModeStyle } from '../../../../hooks/dark-mode/use-apply-dark-mode-style'
import type { NextPage } from 'next'
import React from 'react'

interface PageParams {
  params: NoteIdProps
}

/**
 * Renders a page that is used by the user to edit markdown notes. It contains the editor and a renderer.
 */
const EditorPage: NextPage<PageParams> = ({ params }) => {
  useApplyDarkModeStyle()

  return (
    <ResetRealtimeStateBoundary>
      <NoteLoadingBoundary noteId={params.noteId}>
        <EditorToRendererCommunicatorContextProvider>
          <EditorPageContent />
        </EditorToRendererCommunicatorContextProvider>
      </NoteLoadingBoundary>
    </ResetRealtimeStateBoundary>
  )
}

export default EditorPage
