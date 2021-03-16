import { Meta, Story } from '@storybook/react';
import ScrollContainer, {
  ScrollContainerProps,
  StyledScrollContainer,
} from '.';
import React from 'react';
import styled from 'styled-components';

export default {
  title: 'UiKit/Base/ScrollContainer',
  component: ScrollContainer,
} as Meta;

const Wrapper = styled.div`
  width: 200px;
  ${StyledScrollContainer} {
    max-height: 150px;

    p {
      padding-right: 10px;
    }
  }
`;

const Template: Story<ScrollContainerProps> = args => (
  <Wrapper>
    <ScrollContainer {...args}>
      <div id="c_start"></div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, culpa
        dolorum debitis quas deserunt ut ipsam ratione quos earum eligendi.
        Fugiat quia voluptas aliquid sunt aliquam voluptatum fugit, officia
        quam. Neque sunt ex dolorem voluptas? Nulla omnis voluptatem, facilis
        deserunt ullam quae sapiente fugiat molestias, autem hic magni illum
        nam!
      </p>
      <div id="c_end"></div>
    </ScrollContainer>
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  maskOverflow: false,
  observeEndSelector: '#c_end',
  observeStartSelector: '#c_start',
};
