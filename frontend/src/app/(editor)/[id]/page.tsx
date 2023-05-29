/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { getNote } from '../../../api/notes'
import { getBaseUrls } from '../../../utils/base-url-parser'
import { redirect } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: { id: string | undefined }
}

/**
 * Redirects the user to the editor if the link is a root level direct link to a version 1 note.
 */
const DirectLinkFallback = async ({ params }: PageProps) => {
  if (params.id === undefined) {
    throw new Error('No note id found in path')
  }
  const noteData = await getNote(params.id, getBaseUrls().editor)
  if (noteData.metadata.version !== 1) {
    throw new Error('Note is not a version 1 note')
  }

  redirect(`/n/${params.id}`)

  return <span>Loading...</span>
}

export default DirectLinkFallback
