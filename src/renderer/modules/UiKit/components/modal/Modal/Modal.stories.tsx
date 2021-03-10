import React from 'react';
import { Story, Meta } from '@storybook/react';

import Modal, { ModalProps } from '.';
import register from '@mocks/register';

export default {
  title: 'UiKit/Modal/Modal',
  component: Modal,
  args: {
    register,
  },
} as Meta;

const Template: Story<ModalProps> = args => (
  <Modal {...args}>
    <div style={{ margin: '1rem', textAlign: 'center' }}>
      <h1>Some Content</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus libero
        sunt quaerat aliquid incidunt commodi iste amet? Ex, fugiat magni. sunt
        quaerat aliquid incidunt commodi iste amet? Ex, fugiat magni.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
        necessitatibus cupiditate eius excepturi! Itaque, reprehenderit quae.
        Est exercitationem voluptatibus autem fuga placeat. Beatae laudantium
        voluptatibus dolore esse accusamus deserunt incidunt ullam, provident
        blanditiis, omnis repudiandae fugit, eaque quos officiis rem?
      </p>
    </div>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  show: true,
  position: 'bottom',
  bottomButtons: [
    {
      buttonText: 'Close',
      click: () => {},
    },
  ],
};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
  show: true,
  position: 'bottom',
  topRightCloseButton: {
    variant: 'circle',
    click: () => {},
  },
  bottomButtons: [],
};

export const WithToastButton = Template.bind({});
WithToastButton.args = {
  show: true,
  position: 'bottom',
  topRightCloseButton: {
    variant: 'toast',
    click: () => {},
  },
  bottomButtons: [],
};

export const WithToastBackgroundButton = Template.bind({});
WithToastBackgroundButton.args = {
  show: true,
  position: 'bottom',
  topRightCloseButton: {
    variant: 'toast',
    toastWithBackground: true,
    click: () => {},
  },
  bottomButtons: [],
};

export const WithCaret = Template.bind({});
WithCaret.args = {
  show: true,
  position: 'bottom',
  caret: true,
  bottomButtons: [],
};
