import { Meta } from '@storybook/vue3';

import QrDialog from './QrDialog.vue';
import { FullScreenDialog } from '../core/module';

export default {
  title: 'Session/QrDialog',
  component: QrDialog,
} as Meta;

const Template = (args: unknown) => ({
  components: { QrDialog, FullScreenDialog },
  setup: () => args,
  template: `
    <FullScreenDialog>
      <QrDialog :url="url" />
    </FullScreenDialog>
  `,
});

export const Default = {
  render: Template,
  args: {
    url: 'https://example.com',
  },
};
