import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react';

import SystemTooltip, { SystemTooltipProps } from '.';

export default {
  title: 'UiKit/Tooltips/SystemTooltip',
  component: SystemTooltip,
} as Meta;

const Template: Story<SystemTooltipProps> = args => {
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

      <SystemTooltip
        defaultVisible={args.defaultVisible}
        placement={args.placement}
        triggerRef={hoverRef.current}
      >
        Some Text Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis illo corporis dolor.
      </SystemTooltip>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultVisible: true,
  placement: 'top',
};
