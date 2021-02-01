import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import lolLogo from '@assets/lol-logo.png';
import styled from 'styled-components';
import { generateId, useYupValidationResolver } from '@uikit/util';
import {
  Checkbox,
  FramedSelect,
  Input,
  PlayButton,
  PlayButtonState,
  PrimaryMagicButton,
} from '@uikit/components/form';
// import loginVideoIntro from '@assets/video/intro-video-splash-kaisa.webm';
import loginVideoLoop from '@assets/video/video-splash-ss19-c.webm';
// import loginMusicIntro from '@assets/music/intro-sound-splash-kaisa.ogg';
import loginMusicLoop from '@assets/music/music-splash-ss19-c.ogg';
import loginPicture from '@assets/background/image-splash-ss19-c.jpg';
import { Link } from 'react-router-dom';
import gitVersion from '../../../../../../intermediate/git-version.json';
import SplashScreen from '../../components/SplashScreen';
import SplashScreenControls from '../../components/SplashScreenControls';

interface FormValues {
  password: string;
  email: string;
  staySignedIn: boolean;
}

const StyledPlayButton = styled(PlayButton)`
  position: absolute;
  top: 20px;
  left: 29px;
`;

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

const SplashScreenContainer = styled.div`
  position: relative;
  overflow: hidden;
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

const LoginView: FC = () => {
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

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <Container>
      <SplashScreenContainer>
        <SplashScreen
          music={{ loop: loginMusicLoop }}
          picture={loginPicture}
          video={{ loop: loginVideoLoop }}
        />
        <SplashScreenControls hasIntroVideo />
        <StyledPlayButton buttonState={PlayButtonState.Play} type="button">
          Play
        </StyledPlayButton>
      </SplashScreenContainer>
      <Panel>
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
              spellcheck={false}
              label="E-Mail"
              name="email"
              id="kuchen"
              type="email"
              error={errors.email}
              register={register}
            />
            <Input
              spellcheck={false}
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
                { label: 'Cool Option 6', value: generateId() },
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
            <Link to="/style" className="external">
              Create an account
            </Link>
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
