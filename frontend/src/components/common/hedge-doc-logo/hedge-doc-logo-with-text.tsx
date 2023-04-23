/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import LogoHorizontalBlack from './logo_text_bw_horizontal.svg'
import LogoColorHorizontalBlack from './logo_text_color_horizontal_b.svg'
import LogoColorHorizontalWhite from './logo_text_color_horizontal_w.svg'
import LogoColorVerticalBlack from './logo_text_color_vertical_b.svg'
import LogoColorVerticalWhite from './logo_text_color_vertical_w.svg'
import LogoHorizontalWhite from './logo_text_wb_horizontal.svg'
import React from 'react'

export enum HedgeDocLogoSize {
  SMALL = 32,
  MEDIUM = 64,
  BIG = 256
}

export interface HedgeDocLogoProps {
  size?: HedgeDocLogoSize | number
  logoType: HedgeDocLogoType
}

export enum HedgeDocLogoType {
  COLOR_VERTICAL_WHITE,
  COLOR_VERTICAL_BLACK,
  COLOR_HORIZONTAL_WHITE,
  COLOR_HORIZONTAL_BLACK,
  BW_HORIZONTAL,
  WB_HORIZONTAL
}

/**
 * Renders the HedgeDoc logo with the app name in different types.
 *
 * @param size The size the logo should have.
 * @param logoType The logo type to be used.
 */
export const HedgeDocLogoWithText: React.FC<HedgeDocLogoProps> = ({ size = HedgeDocLogoSize.MEDIUM, logoType }) => {
  switch (logoType) {
    case HedgeDocLogoType.COLOR_VERTICAL_WHITE:
      return <LogoColorVerticalWhite className={'w-auto'} height={`${size}px`} width={'auto'} />
    case HedgeDocLogoType.COLOR_VERTICAL_BLACK:
      return <LogoColorVerticalBlack className={'w-auto'} height={`${size}px`} width={'auto'} />
    case HedgeDocLogoType.COLOR_HORIZONTAL_WHITE:
      return <LogoColorHorizontalWhite className={'w-auto'} height={`${size}px`} width={'auto'} />
    case HedgeDocLogoType.COLOR_HORIZONTAL_BLACK:
      return <LogoColorHorizontalBlack className={'w-auto'} height={`${size}px`} width={'auto'} />
    case HedgeDocLogoType.BW_HORIZONTAL:
      return <LogoHorizontalBlack className={'w-auto'} height={`${size}px`} width={'auto'} />
    case HedgeDocLogoType.WB_HORIZONTAL:
      return <LogoHorizontalWhite className={'w-auto'} height={`${size}px`} width={'auto'} />
    default:
      return null
  }
}
