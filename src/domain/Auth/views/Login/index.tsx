import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '@uikit/components/form/Input';
import useYupValidationResolver from '@uikit/util/yupValidationResolver';
import lolLogo from '@assets/app/lol-logo.png';
import asheSplash from '@assets/app/placeholder/ashe-splash.jpg';
import styled from 'styled-components';

interface FormValues {
  password: string;
  email: string;
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
`;

const SignInContainer = styled.div`
  padding: 16px;
`;

const SplashContainer = styled.div`
  background: url(${asheSplash}) no-repeat center;
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
  const { register, handleSubmit, errors } = useForm<FormValues>({
    resolver,
    mode: 'onTouched',
  });
  // eslint-disable-next-line no-console
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Container>
      <SplashContainer />
      <Panel>
        <LeagueLogoImg src={lolLogo} alt="League of legends logo" width="175" />
        <SignInContainer>
          <h5>Sign in</h5>

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
            <button type="submit">Submit</button>
          </form>
        </SignInContainer>
      </Panel>
    </Container>
  );
};

export default LoginView;
