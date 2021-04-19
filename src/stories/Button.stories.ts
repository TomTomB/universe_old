import MyButton from './Button.vue';
import { Story, Args } from '@storybook/vue3';

export default {
  title: 'Example/Button',
  component: MyButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    onClick: {},
  },
} as Args;

const Template: Story = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<my-button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
