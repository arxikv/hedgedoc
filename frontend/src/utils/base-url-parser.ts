/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { BaseUrls } from '../components/common/base-url/base-url-context-provider'
import { getGlobalValue, setGlobalValue } from './global-ref'
import { Logger } from './logger'
import { isBuildTime, isTestMode } from './test-modes'
import { MissingTrailingSlashError, parseUrl } from '@hedgedoc/commons'
import { Optional } from '@mrdrogdrog/optional'

const logger = new Logger('Base URL Configuration')

const extractUrlFromEnvVar = (envVarName: string, envVarValue: string | undefined): Optional<URL> => {
  try {
    return parseUrl(envVarValue)
  } catch (error) {
    if (error instanceof MissingTrailingSlashError) {
      logger.error(`The path in ${envVarName} must end with an '/'`)
      return Optional.empty()
    } else {
      throw error
    }
  }
}

const extractEditorBaseUrlFromEnv = (): Optional<URL> => {
  const envValue = extractUrlFromEnvVar('HD_BASE_URL', process.env.HD_BASE_URL)
  if (envValue.isEmpty()) {
    logger.error("HD_BASE_URL isn't a valid URL!")
  }
  return envValue
}

const extractRendererBaseUrlFromEnv = (editorBaseUrl: URL): Optional<URL> => {
  if (isTestMode) {
    logger.info('Test mode activated. Using editor base url for renderer.')
    return Optional.of(editorBaseUrl)
  }

  if (!process.env.HD_RENDERER_BASE_URL) {
    logger.info('HD_RENDERER_BASE_URL is unset. Using editor base url for renderer.')
    return Optional.of(editorBaseUrl)
  }

  return extractUrlFromEnvVar('HD_RENDERER_BASE_URL', process.env.HD_RENDERER_BASE_URL)
}

const parseBaseUrls = (): BaseUrls => {
  return extractEditorBaseUrlFromEnv()
    .flatMap((editorBaseUrl) =>
      extractRendererBaseUrlFromEnv(editorBaseUrl).map((rendererBaseUrl) => {
        return {
          editor: editorBaseUrl.toString(),
          renderer: rendererBaseUrl.toString()
        }
      })
    )
    .orElseThrow(() => new Error('couldnt parse env vars'))
}

const cacheKey = 'baseUrls'

/**
 * Extracts the editor and renderer base urls from the environment variables.
 *
 * @return An {@link Optional} with the base urls.
 */
export const getBaseUrls = (): BaseUrls => {
  if (isBuildTime) {
    return {
      editor: 'https://example.org/',
      renderer: 'https://example.org/'
    }
  }
  let baseUrls = getGlobalValue<BaseUrls>(cacheKey)

  if (baseUrls === undefined) {
    baseUrls = parseBaseUrls()
    setGlobalValue(cacheKey, baseUrls)

    logger.info('Editor base URL', baseUrls.editor.toString())
    logger.info('Renderer base URL', baseUrls.renderer.toString())
  }

  return baseUrls
}
