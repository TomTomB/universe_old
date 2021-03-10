import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import FlyoutFrame, { FlyoutFrameProps } from '.';

export default {
  title: 'UiKit/Modal/FlyoutFrame',
  component: FlyoutFrame,
} as Meta;

const Template: Story<FlyoutFrameProps> = args => {
  const [anim, setAnim] = useState<'idle' | 'closing' | undefined>('idle');

  return (
    <>
      {args.animated && (
        <button
          style={{ marginBottom: 40 }}
          onClick={() => {
            if (anim === 'idle') {
              setAnim('closing');
            } else {
              setAnim('idle');
            }
          }}
        >
          Toggle Anim
        </button>
      )}

      <FlyoutFrame {...args} animation={anim}>
        <div style={{ textAlign: 'center', padding: 12 }}>
          <h5>Some Content</h5>
          <p style={{ margin: 0 }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, quo.
            <br />
            Adipisicing elit. Illo, quo. Lorem ipsum dolor!
          </p>
        </div>
      </FlyoutFrame>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
