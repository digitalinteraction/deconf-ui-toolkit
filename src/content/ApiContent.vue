<script lang="ts">
import type { VNode } from 'vue';
import { Localised } from '@openlab/deconf-shared';
import { localiseFromObject } from '../lib/locales';
import { namespaceForApi } from '../lib/store';

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

export default {
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
        { slug: this.slug }
      );
    },

    /** Convert a HTML node to a Vue.js VNode */
    domToVue(node: Node): VNode | string {
      if (node instanceof Text) return node.textContent || '';

      // Convert dom attributes to a plain record
      let attrs: Record<string, unknown> = {};
      if (node instanceof Element) {
        for (const key of node.attributes) {
          attrs[key.name] = key.value;
        }
      }

      return this.$createElement(
        node.nodeName,
        { attrs },
        Array.from(node.childNodes).map((child) => this.domToVue(child))
      );
    },
  },
  render(createElement): VNode {
    // Go through each child of the api content
    // if a <div id="xyz"> attempt to replace with a slot
    // otherwise, copy the dom node across
    const children = Array.from(this.domContent.children).map((child) => {
      return child.id && this.$slots[child.id]
        ? (this.$slots[child.id] as VNode[])
        : (this.domToVue(child) as VNode);
    });

    return createElement('div', { staticClass: 'content' }, children);
  },
};
</script>
