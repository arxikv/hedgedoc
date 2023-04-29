/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useDarkModeState } from '../../../hooks/dark-mode/use-dark-mode-state'
import LogoColorHorizontalBlack from './logo_text_color_horizontal_b.svg'
import LogoColorHorizontalWhite from './logo_text_color_horizontal_w.svg'
import LogoColorVerticalBlack from './logo_text_color_vertical_b.svg'
import LogoColorVerticalWhite from './logo_text_color_vertical_w.svg'
import React, { useMemo } from 'react'

export enum HedgeDocLogoSize {
  SMALL = 32,
  MEDIUM = 64,
  BIG = 256
}

export interface HedgeDocLogoProps {
  size?: HedgeDocLogoSize | number
  direction: 'horizontal' | 'vertical'
  textColor: 'black' | 'white' | 'auto'
}

/**
 * Renders the HedgeDoc logo with the app name in different types.
 *
 * @param size The size the logo should have.
 * @param logoType The logo type to be used.
 */
export const HedgeDocLogoWithText: React.FC<HedgeDocLogoProps> = ({
  size = HedgeDocLogoSize.MEDIUM,
  direction,
  textColor
}) => {
  const darkModeActivate = useDarkModeState()

  const textColorIsBlack = useMemo(() => {
    return textColor === 'auto' ? !darkModeActivate : textColor === 'black'
  }, [darkModeActivate, textColor])

  const LogoComponent = useMemo(() => {
    if (textColorIsBlack) {
      return direction === 'horizontal' ? LogoColorHorizontalBlack : LogoColorVerticalBlack
    } else {
      return direction === 'horizontal' ? LogoColorHorizontalWhite : LogoColorVerticalWhite
    }
  }, [direction, textColorIsBlack])

  return <LogoComponent className={'w-auto'} height={`${size}px`} width={'auto'} />
}
