import IframeEmbed from './IframeEmbed.vue';

export default {
  title: 'Session/IframeEmbed',
  component: IframeEmbed
};

const Template = (args, { argTypes }) => ({
  components: { IframeEmbed },
  props: ['src', 'allow'],
  template: `
    <div style="max-width: 860px">
      <IframeEmbed :src="src" :allow="allow" />
    </div>
  `
});

export const Youtube = Template.bind({});
Youtube.args = {
  src: 'https://www.youtube-nocookie.com/embed/Qo4JIT8jMtI?controls=0',
  allow: 'encrypted-media; picture-in-picture'
};

export const Empty = Template.bind({});
Empty.args = {
  src: ''
};
