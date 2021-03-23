import { Meta, Story } from '@storybook/react';
import ScrollContainer, {
  InnerScrollContainer,
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

  #c_start,
  #c_end {
    position: absolute;
  }

  ${InnerScrollContainer} {
    height: 100%;
    width: 100%;
  }

  &.vertical {
    #c_start {
      top: 0;
    }
    #c_end {
      bottom: 0;
    }
  }

  &.horizontal {
    #c_start {
      left: 0;
    }
    #c_end {
      right: 0;
      top: 0;
    }

    ${InnerScrollContainer} {
      width: 300px;
    }

    ${StyledScrollContainer} {
      max-width: 150px;

      p {
        width: 300px;
        padding-bottom: 10px;
      }
    }
  }

  ${StyledScrollContainer} {
    max-height: 150px;

    p {
      padding-right: 10px;
    }
  }
`;

const Template: Story<ScrollContainerProps> = args => (
  <Wrapper className={args.scrollDirection}>
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

export const Vertical = Template.bind({});
Vertical.args = {
  maskOverflow: true,
  observeTopSelector: '#c_start',
  observeBottomSelector: '#c_end',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  maskOverflow: true,
  scrollDirection: 'horizontal',
  observeLeftSelector: '#c_start',
  observeRightSelector: '#c_end',
};
