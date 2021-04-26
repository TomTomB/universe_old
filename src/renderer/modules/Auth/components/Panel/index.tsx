import * as yup from 'yup';
import {
  Checkbox,
  FramedSelect,
  Input,
  PrimaryMagicButton,
} from '@uikit/components/form';
import React, { FC, useMemo } from 'react';
import { generateId, useYupValidationResolver } from '@uikit/util';
import PanelFooter from '../../components/Panel/Footer';
import lolLogo from '@assets/logos/lol-logo.png';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const PanelContainer = styled.div`
  padding-top: 32px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-left: 1px solid ${props => props.theme.colors.grey.frame};
  background-color: ${props => props.theme.colors.black};
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

interface FormValues {
  password: string;
  email: string;
  staySignedIn: boolean;
}

const Panel: FC = () => {
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
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(data => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <PanelContainer>
      <LeagueLogoImg
        src={lolLogo}
        alt="League of legends logo"
        width="150"
        height="65"
      />
      <SignInContainer>
        <SignInHead>Sign in </SignInHead>

        <form noValidate onSubmit={onSubmit}>
          <Input
            name="email"
            spellcheck={false}
            label="E-Mail"
            id="kuchen"
            type="email"
            error={formState.errors.email}
            register={register}
          />
          <Input
            spellcheck={false}
            label="Password"
            name="password"
            id="password"
            type="password"
            error={formState.errors.password}
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
          <FramedSelect
            register={register}
            name="someSelect"
            id="someSelect"
            label="Some Label"
            items={[
              { label: 'An Option 1', value: 'opt-1' },
              { label: 'An Option 2', value: 'opt-2' },
              { label: 'An Option 3', value: 'opt-3' },
              { label: 'An Option 4', value: 'opt-4' },
              { label: 'An Option 5', value: generateId() },
              { label: 'Cool Option 6', value: generateId(), disabled: true },
              { label: 'Cold Option 7', value: generateId() },
              { label: 'Best Option 8', value: generateId() },
            ]}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <SignInButton disabled={!formState.isValid}>Sign in</SignInButton>
        </form>
      </SignInContainer>

      <PanelFooter />
    </PanelContainer>
  );
};

export default Panel;
