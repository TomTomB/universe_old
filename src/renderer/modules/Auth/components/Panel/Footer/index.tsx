import { Link } from 'react-router-dom';
import React from 'react';
import gitVersion from '../../../../../../../intermediate/git-version.json';
import styled from 'styled-components';

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

const PanelFooter = () => {
  return (
    <>
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
    </>
  );
};

export default PanelFooter;
