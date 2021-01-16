import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '@uikit/components/form/Input';
import useYupValidationResolver from '@uikit/util/yupValidationResolver';
import lolLogo from '@assets/lol-logo.png';
import asheSplash from '@assets/placeholder/ashe-splash.jpg';
import styled from 'styled-components';
import Checkbox from '@uikit/components/form/Checkbox';
import PrimaryMagicButton from '@uikit/components/form/buttons/PrimaryMagicButton';
import gitVersion from '../../../../../git-version.json';

interface FormValues {
  password: string;
  email: string;
  staySignedIn: boolean;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 223px;
  grid-template-areas: 'splash panel';
  height: 100%;
`;

const Panel = styled.div`
  padding-top: 32px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-left: 1px solid ${(props) => props.theme.colors.grey.frame};
  background-color: ${(props) => props.theme.colors.black};
`;

const LeagueLogoImg = styled.img`
  margin-left: 9px;
  object-fit: contain;
  margin-top: 5px;
`;

const SignInContainer = styled.div`
  padding: 16px;
`;

const SignInHead = styled.h5`
  height: 36px;
`;

const SignInButton = styled(PrimaryMagicButton)`
  display: block;
  width: 100%;
`;

const SplashContainer = styled.div`
  background: url(${asheSplash}) no-repeat center;
`;

const FooterContainer = styled.div`
  padding: 16px;

  p {
    margin: 0;
  }

  a {
    display: inline-block;
  }
`;

const VersionFooter = styled.div`
  border-top: 1px solid #1e282d;
  span {
    cursor: default;
    text-align: center;
    display: block;
    color: #3c3c41;
    font-family: LoL Display;
    font-size: 12px;
    font-weight: 600;
    line-height: 2.74;
  }
`;

const LoginView = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email('Enter a valid email')
          .required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
    []
  );

  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver,
    mode: 'onChange',
  });

  // eslint-disable-next-line no-console
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Container>
      <SplashContainer />
      <Panel>
        <LeagueLogoImg
          src={lolLogo}
          alt="League of legends logo"
          width="150"
          height="65"
        />
        <SignInContainer>
          <SignInHead>Sign in</SignInHead>

          <form noValidate onSubmit={onSubmit}>
            <Input
              label="E-Mail"
              name="email"
              id="kuchen"
              type="email"
              error={errors.email}
              register={register}
            />
            <Input
              label="Password"
              name="password"
              id="password"
              type="password"
              error={errors.password}
              register={register}
            />
            <br />
            <Checkbox
              label="Remember Me"
              name="staySignedIn"
              id="staySignedIn"
              register={register}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <SignInButton disabled={!formState.isValid}>Sign in</SignInButton>
          </form>
        </SignInContainer>
        <FooterContainer>
          <p>
            <a href="#foo" className="external">
              Forgot your email?
            </a>
          </p>
          <p>
            <a href="#foo" className="external">
              Forgot your password?
            </a>
          </p>
          <p>
            <a href="#foo" className="external">
              Create an account
            </a>
          </p>
        </FooterContainer>
        <VersionFooter>
          <span>
            V{gitVersion.semver.version}.{gitVersion.hash}
          </span>
        </VersionFooter>
      </Panel>
    </Container>
  );
};

export default LoginView;
