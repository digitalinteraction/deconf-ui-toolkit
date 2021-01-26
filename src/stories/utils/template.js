//
// This method wraps the normal creation of a storybook template using v-bind
// so you only need to call one method, rather than create each template manually
// NOTE: it breaks when using the "default" slot as it tries to assign to default which is forbidden
//
export function createTemplate(components) {
  const name = Object.keys(components)[0];

  return (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: components,
      template: `
        <${name} v-bind="{ ${Object.keys(argTypes).join(', ')} }" />
      `
    };
  };
}
