<script lang="ts">
import { createTextVNode, defineComponent, h, VNode } from 'vue';
import { Localised } from '@openlab/deconf-shared';
import { localiseFromObject, namespaceForApi } from '../lib/module.js';

//
// i18n
// - n/a
//
// icons
// - n/a
// - n/a
//
// sass
// - n/a
//
// store actions
// - api/fetchContent { slug }
//

interface Data {
  content: Localised | undefined;
}

export default defineComponent({
  name: 'ApiContent',
  props: {
    slug: { type: String, required: true },
  },
  data(): Data {
    return {
      content: undefined,
    };
  },
  computed: {
    domContent(): HTMLDivElement {
      const html = document.createElement('div');
      if (this.content) {
        const localeHtml = localiseFromObject(this.$i18n.locale, this.content);
        if (localeHtml) html.innerHTML = localeHtml;
      }
      return html;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.content = await this.$store.dispatch(
        namespaceForApi(this.$deconf, 'fetchContent'),
        { slug: this.slug },
      );
    },

    /** Convert a HTML node to a Vue.js VNode */
    domToVue(node: Node): VNode {
      if (node instanceof Text) {
        return h(createTextVNode(node.textContent ?? ''));
      }

      // Convert dom attributes to a plain record
      const attrs: Record<string, unknown> = {};
      if (node instanceof Element) {
        for (const key of node.attributes) {
          attrs[key.name] = key.value;
        }
      }

      return h(
        node.nodeName,
        { ...attrs },
        Array.from(node.childNodes).map((child) => this.domToVue(child)),
      );
    },
  },
  render(): VNode {
    const dom = this.domContent as HTMLDivElement;
    // Go through each child of the api content
    // if a <div id="xyz"> attempt to replace with a slot
    // otherwise, copy the dom node across

    const children: VNode[] = [];
    for (const child of dom.children) {
      if (child.id && this.$slots[child.id]) {
        children.push(...this.$slots[child.id]!());
      } else {
        children.push(this.domToVue(child));
      }
    }

    return h('div', { class: 'content' }, children);
  },
});
</script>
