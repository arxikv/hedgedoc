/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { isMac } from '../../../utils/is-mac'
import React from 'react'

/**
 * Renders a keyboard control/command key hint depending on if the browser is running on macOS or not.
 */
export const ModifierKey: React.FC = () => {
  return isMac() ? <kbd>⌘</kbd> : <kbd>Ctrl</kbd>
}
