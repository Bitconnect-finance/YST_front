/* empty css                                 */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { S as SITE, a as $$MainLayout } from '../chunks/MainLayout_BqcN3IPA.mjs';
import { $ as $$CardBlog, a as $$CardBlogRecent, b as $$CardInsight } from '../chunks/CardInsight_D70Dve1Y.mjs';
import { g as getCollection } from '../chunks/_astro_content_Dpbg9Idg.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const englishBlogEntries = await getCollection("blog", ({ id }) => {
    return id.startsWith("en/");
  });
  const englishInsightsEntries = await getCollection("insights", ({ id }) => {
    return id.startsWith("en/");
  });
  const blogPosts = englishBlogEntries.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const insightPosts = englishInsightsEntries;
  const mostRecentPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);
  const title = "Your Gateway to Construction Excellence";
  const subTitle = "Explore the latest news, tips, and insights from ScrewFast to enhance your construction projects. From product spotlights to project management strategies, our blog is your go-to resource for all things hardware and construction.";
  const secondTitle = "Insights";
  const secondSubTitle = "Stay up-to-date with the latest trends and developments in the construction industry with insights from ScrewFast's team of industry experts. ";
  const pageTitle = `Blog | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle, "structuredData": {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://screwfast.uk/blog",
    url: "https://screwfast.uk/blog",
    name: "Blog | ScrewFast",
    description: "Stay up-to-date with the latest trends and developments in the construction industry with insights from ScrewFast's team of industry experts.",
    isPartOf: {
      "@type": "WebSite",
      url: "https://screwfast.uk",
      name: "ScrewFast",
      description: "ScrewFast offers top-tier hardware tools and expert construction services to meet all your project needs."
    },
    inLanguage: "en-US"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-[85rem] space-y-8 px-4 pt-16 sm:px-6 lg:px-8 2xl:max-w-full"> <!--Page header--> <div class="mx-auto max-w-3xl text-left sm:text-center"> <h1 class="block text-balance text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-5xl lg:text-6xl"> ${title} </h1> <p class="mt-4 text-pretty text-lg text-neutral-600 dark:text-neutral-400"> ${subTitle} </p> </div> </section> <section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> <!--Blog posts grid--> <div class="grid gap-6 lg:grid-cols-2"> ${otherPosts.map((blogEntry) => renderTemplate`${renderComponent($$result2, "CardBlog", $$CardBlog, { "blogEntry": blogEntry })}`)} </div> </section>  <section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> ${renderComponent($$result2, "CardBlogRecent", $$CardBlogRecent, { "blogEntry": mostRecentPost })} </section>  <section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14"> <h2 class="text-2xl font-bold text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight"> ${secondTitle} </h2> <p class="mt-1 text-pretty text-neutral-600 dark:text-neutral-400"> ${secondSubTitle} </p> </div> <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${insightPosts.map((insightEntry) => renderTemplate`${renderComponent($$result2, "CardInsight", $$CardInsight, { "insightEntry": insightEntry })}`)} </div> </section> ` })}`;
}, "/Users/gg/iost/demo/YST_front/src/pages/blog/index.astro", void 0);

const $$file = "/Users/gg/iost/demo/YST_front/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
