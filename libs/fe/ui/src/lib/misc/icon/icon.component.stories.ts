import { type Meta, type StoryObj } from '@storybook/angular';

import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'fe/ui/misc/icon',
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Primary: Story = {
  args: {
    src: 'icon/main-nav-logo.svg',
    alt: 'school icon',
  },
};
