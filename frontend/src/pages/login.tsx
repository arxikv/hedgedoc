/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { AuthProviderWithCustomName } from '../api/config/types'
import { AuthProviderType } from '../api/config/types'
import { CustomBranding } from '../components/common/custom-branding/custom-branding'
import { useFrontendConfig } from '../components/common/frontend-config-context/use-frontend-config'
import { HedgeDocLogoWithText } from '../components/common/hedge-doc-logo/hedge-doc-logo-with-text'
import { Redirect } from '../components/common/redirect'
import { ShowIf } from '../components/common/show-if/show-if'
import { BaseLayout } from '../components/layout/base-layout'
import { filterOneClickProviders } from '../components/login-page/auth/utils'
import { ViaLdap } from '../components/login-page/auth/via-ldap'
import { ViaLocal } from '../components/login-page/auth/via-local'
import { ViaOneClick } from '../components/login-page/auth/via-one-click'
import { IntroCustomContent } from '../components/login-page/intro/intro-custom-content'
import { useApplicationState } from '../hooks/common/use-application-state'
import React, { useMemo } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

/**
 * Renders the login page with buttons and fields for the enabled auth providers.
 * Redirects the user to the history page if they are already logged in.
 */
export const LoginPage: React.FC = () => {
  useTranslation()
  const authProviders = useFrontendConfig().authProviders
  const userLoggedIn = useApplicationState((state) => !!state.user)

  const ldapProviders = useMemo(() => {
    return authProviders
      .filter((provider) => provider.type === AuthProviderType.LDAP)
      .map((provider) => {
        const ldapProvider = provider as AuthProviderWithCustomName
        return (
          <ViaLdap
            providerName={ldapProvider.providerName}
            identifier={ldapProvider.identifier}
            key={ldapProvider.identifier}
          />
        )
      })
  }, [authProviders])

  const localLoginEnabled = useMemo(() => {
    return authProviders.some((provider) => provider.type === AuthProviderType.LOCAL)
  }, [authProviders])

  const oneClickProviders = useMemo(() => {
    return authProviders.filter(filterOneClickProviders).map((provider, index) => (
      <div className={'p-2 d-flex flex-column social-button-container'} key={index}>
        <ViaOneClick provider={provider} />
      </div>
    ))
  }, [authProviders])

  if (userLoggedIn) {
    return <Redirect to={'/history'} />
  }

  return (
    <BaseLayout>
      <Row>
        <div className={'d-flex align-items-center flex-column'}>
          <HedgeDocLogoWithText direction={'horizontal'} textColor={'auto'} size={128} />
          <span className={'my-4'}>
            <CustomBranding />
          </span>
        </div>
      </Row>
      <Row className={'mt-1'}>
        <Col xs={8}>
          <IntroCustomContent />
        </Col>
        <Col xs={4}>
          <ShowIf condition={ldapProviders.length > 0 || localLoginEnabled}>
            <ShowIf condition={localLoginEnabled}>
              <ViaLocal />
            </ShowIf>
            {ldapProviders}
          </ShowIf>
          <ShowIf condition={oneClickProviders.length > 0}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>
                  <Trans i18nKey='login.signInVia' values={{ service: '' }} />
                </Card.Title>
                {oneClickProviders}
              </Card.Body>
            </Card>
          </ShowIf>
        </Col>
      </Row>
    </BaseLayout>
  )
}

export default LoginPage
