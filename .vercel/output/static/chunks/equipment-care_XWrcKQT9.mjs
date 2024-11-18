import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_CKj95Dky.mjs';
import { $ as $$Image } from './_astro_assets_Cru6olkC.mjs';
import { q as $$Card, t as $$LinkCard, o as $$CardGrid, v as $$Aside } from './Code_B4CevDhR.mjs';
import 'clsx';

const frontmatter = {
  "title": "Equipment Care & Maintenance",
  "description": "Explore ScrewFast's comprehensive documentation for an in-depth look at our premium tools and construction services.",
  "sidebar": {
    "label": "Equipment Care",
    "order": 2
  }
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  return createVNode(Fragment, {
    children: [createVNode($$Card, {
      title: "Maintaining Your ScrewFast Tools",
      icon: "approve-check-circle",
      children: [createVNode($$LinkCard, {
        description: "Step-by-step guide for the routine care and maintenance of your ScrewFast tools to ensure long-lasting functionality.",
        href: "/guides/getting-started"
      }), createVNode($$LinkCard, {
        description: "Cleaning, storage, and inspection practices to keep tools in optimal condition",
        href: "/guides/getting-started"
      })]
    }), "\n", createVNode($$CardGrid, {
      children: [createVNode($$Card, {
        title: "Best Practices for Equipment Longevity",
        icon: "star",
        "set:html": "<ul>\n<li>Strategies for extending the life of your tools and equipment through proper use and handling</li>\n<li>A preventative maintenance schedule that will help avoid common wear and tear</li>\n</ul>"
      }), createVNode($$Card, {
        title: "Troubleshooting Common Tool Issues",
        icon: "rocket",
        "set:html": "<ul>\n<li>Solutions for frequently encountered issues with ScrewFast equipment</li>\n<li>Advice on when to seek professional repair services versus performing DIY fixes</li>\n</ul>"
      })]
    }), "\n", createVNode($$Aside, {
      "set:html": "<p>Remember that attentiveness to the condition and care of your tools and equipment is paramount to ensuring their longevity and reliability. Regular maintenance not only helps prevent downtime but can also ensure the safety of those who use them. For each guide and reference listed here, we offer additional support through our customer service channels should you require personalized assistance.</p>"
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}

const url = "src/content/docs/tools/equipment-care.mdx";
const file = "/Users/gg/iost/demo/YST_front/src/content/docs/tools/equipment-care.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/gg/iost/demo/YST_front/src/content/docs/tools/equipment-care.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
