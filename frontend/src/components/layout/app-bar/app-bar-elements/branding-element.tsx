/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { CustomBranding } from '../../../common/custom-branding/custom-branding'
import { HedgeDocLogoSize, HedgeDocLogoWithText } from '../../../common/hedge-doc-logo/hedge-doc-logo-with-text'
import styles from '../navbar.module.scss'
import Link from 'next/link'
import React from 'react'
import { Navbar } from 'react-bootstrap'

/**
 * Renders the HedgeDoc branding and branding customizations for the app bar.
 */
export const BrandingElement: React.FC = () => {
  return (
    <Navbar.Brand className={styles.side}>
      <Link href='/' className='text-secondary text-decoration-none d-flex align-items-center'>
        <HedgeDocLogoWithText direction={'horizontal'} textColor={'auto'} size={HedgeDocLogoSize.SMALL} />
        <span className={styles['branding-separator']}>
          <CustomBranding inline={true} />
        </span>
      </Link>
    </Navbar.Brand>
  )
}
