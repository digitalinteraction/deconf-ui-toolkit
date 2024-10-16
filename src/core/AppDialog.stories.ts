import { Component } from 'vue';
import { Meta } from '@storybook/vue3';
import { DialogPlugin } from '../lib/dialog-plugin';
import AppDialog from './AppDialog.vue';

export default {
  title: 'Core/AppDialog',
  component: AppDialog,
} as Meta;

const dialogPlugin = new DialogPlugin();

const MockDialog: Component = {
  props: ['name'],
  methods: {
    onClick() {
      dialogPlugin.close();
    },
  },
  template: `
    <div>
      <p> Hello, {{ name }} </p>
      <p> <button @click="onClick">Close</button> </p>
    </div>
  `,
};

const Template = (args: unknown) => ({
  components: { AppDialog },
  setup: () => args,
  data: () => ({ dialogPlugin }),
  methods: {
    onClick() {
      dialogPlugin.show(MockDialog, { name: 'Geoff' });
    },
  },
  template: `
    <div style="padding: 250px 0; background: red; text-align: center;" >
      <AppDialog :dialog-plugin="dialogPlugin" />
      <button @click="onClick">Show dialog</button>
    </div>
  `,
});

export const Default = {
  render: Template,
};
