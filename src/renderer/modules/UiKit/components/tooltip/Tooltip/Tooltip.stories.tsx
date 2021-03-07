import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react';

import Tooltip, { TooltipProps } from '.';

export default {
  title: 'UiKit/Tooltips/Tooltip',
  component: Tooltip,
} as Meta;

const Template: Story<TooltipProps> = args => {
  const hoverRef = useRef<HTMLElement>(null);
  const [state, setState] = useState(false);

  if (!state) {
    setTimeout(() => {
      setState(true);
    }, 1);
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
    >
      <button ref={hoverRef as any}>Some Button</button>

      <Tooltip
        defaultVisible={args.defaultVisible}
        placement={args.placement}
        triggerRef={hoverRef.current}
      >
        Some Text Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis illo corporis dolor.
      </Tooltip>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultVisible: true,
  placement: 'top',
};
