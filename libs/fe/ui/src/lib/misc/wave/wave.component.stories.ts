import type { Meta, StoryObj } from '@storybook/angular';

import { WaveComponent } from './wave.component';

const meta: Meta<WaveComponent> = {
  component: WaveComponent,
  title: 'fe/ui/misc/wave',
};
export default meta;
type Story = StoryObj<WaveComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-wave>
        <p>wave works!</p>
      </lib-wave>
    `,
  }),
};