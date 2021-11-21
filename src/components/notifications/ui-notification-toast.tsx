/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, ProgressBar, Toast } from 'react-bootstrap'
import type { UiNotification } from '../../redux/ui-notifications/types'
import { ForkAwesomeIcon } from '../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../common/show-if/show-if'
import type { IconName } from '../common/fork-awesome/types'
import { Trans, useTranslation } from 'react-i18next'
import { Logger } from '../../utils/logger'
import { cypressId } from '../../utils/cypress-attribute'
import { useEffectOnce, useInterval } from 'react-use'
import { dismissUiNotification } from '../../redux/ui-notifications/methods'

const STEPS_PER_SECOND = 10
const log = new Logger('UiNotificationToast')

export interface UiNotificationProps extends UiNotification {
  notificationId: number
}

export const UiNotificationToast: React.FC<UiNotificationProps> = ({
  titleI18nKey,
  contentI18nKey,
  titleI18nOptions,
  contentI18nOptions,
  date,
  icon,
  dismissed,
  notificationId,
  durationInSecond,
  buttons
}) => {
  const { t } = useTranslation()
  const [remainingSteps, setRemainingSteps] = useState<number>(() => durationInSecond * STEPS_PER_SECOND)

  const dismissNow = useCallback(() => {
    log.debug(`Dismiss notification ${notificationId} immediately`)
    setRemainingSteps(0)
  }, [notificationId])

  useEffectOnce(() => {
    log.debug(`Show notification ${notificationId}`)
  })

  useInterval(
    () => setRemainingSteps((lastRemainingSteps) => lastRemainingSteps - 1),
    useMemo(() => (dismissed || remainingSteps <= 0 ? null : 1000 / STEPS_PER_SECOND), [dismissed, remainingSteps])
  )

  useEffect(() => {
    if (remainingSteps <= 0 && !dismissed) {
      log.debug(`Dismiss notification ${notificationId}`)
      dismissUiNotification(notificationId)
    }
  }, [dismissed, remainingSteps, notificationId])

  const buttonsDom = useMemo(
    () =>
      buttons?.map((button, buttonIndex) => {
        const buttonClick = () => {
          button.onClick()
          dismissNow()
        }
        return (
          <Button key={buttonIndex} size={'sm'} onClick={buttonClick} variant={'link'}>
            {button.label}
          </Button>
        )
      }),
    [buttons, dismissNow]
  )

  const contentDom = useMemo(() => {
    return t(contentI18nKey, contentI18nOptions)
      .split('\n')
      .map((value, lineNumber) => {
        return (
          <Fragment key={lineNumber}>
            {value}
            <br />
          </Fragment>
        )
      })
  }, [contentI18nKey, contentI18nOptions, t])

  return (
    <Toast show={!dismissed} onClose={dismissNow} {...cypressId('notification-toast')}>
      <Toast.Header>
        <strong className='mr-auto'>
          <ShowIf condition={!!icon}>
            <ForkAwesomeIcon icon={icon as IconName} fixedWidth={true} className={'mr-1'} />
          </ShowIf>
          <Trans i18nKey={titleI18nKey} tOptions={titleI18nOptions} />
        </strong>
        <small>{date.toRelative({ style: 'short' })}</small>
      </Toast.Header>
      <Toast.Body>{contentDom}</Toast.Body>
      <ProgressBar
        variant={'info'}
        now={remainingSteps}
        max={durationInSecond * STEPS_PER_SECOND}
        min={STEPS_PER_SECOND}
      />
      <div>{buttonsDom}</div>
    </Toast>
  )
}
