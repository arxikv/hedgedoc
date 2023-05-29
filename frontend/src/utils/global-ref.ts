/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const getGlobalValue = <T>(cacheKey: string): T | undefined => {
  return (global as unknown as Record<string, T | undefined>)[cacheKey]
}

export const setGlobalValue = <T>(cacheKey: string, value: T): void => {
  ;(global as unknown as Record<string, T>)[cacheKey] = value
}
