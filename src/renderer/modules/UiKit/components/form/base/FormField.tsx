import styled from 'styled-components';
import { StyledLabel } from '../Label';

const FormField = styled.div`
  position: relative;
  ${StyledLabel} {
    margin-bottom: 2px;
  }

  & + & {
    margin-top: 2px;
  }
`;

export default FormField;
