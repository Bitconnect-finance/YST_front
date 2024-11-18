/* empty css                                       */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, F as Fragment } from '../../../chunks/astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { S as SITE, a as $$MainLayout } from '../../../chunks/MainLayout_BqcN3IPA.mjs';
import { $ as $$AvatarBlogLarge, f as formatDate, c as capitalize } from '../../../chunks/AvatarBlogLarge_Bskrl7cT.mjs';
import { $ as $$Bookmark, a as $$SocialShare, b as $$PostFeedback, c as $$CardRelated } from '../../../chunks/PostFeedback_CUUXu_dt.mjs';
import { $ as $$Image } from '../../../chunks/_astro_assets_Cru6olkC.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_Dpbg9Idg.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://screwfast.uk");
async function getStaticPaths() {
  const blogPosts = await getCollection("blog", ({ id }) => {
    return id.startsWith("fr/");
  });
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { post } = Astro2.props;
  const blogPosts = await getCollection(
    "blog",
    ({ id }) => {
      return id.startsWith("fr/");
    }
  );
  const relatedPosts = blogPosts.filter(
    (blogEntry) => blogEntry.slug !== post.slug
  );
  const pageTitle = `${post.data.title} | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-3xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10"> <div class="max-w-2xl"> <div class="mb-6 flex items-center justify-between"> <div class="flex w-full gap-x-5 sm:items-center sm:gap-x-3"> ${renderComponent($$result2, "AvatarBlogLarge", $$AvatarBlogLarge, { "blogEntry": post })} <div class="grow"> <div class="flex items-center justify-between gap-x-2"> <div> <div class="hs-tooltip inline-block [--placement:bottom] [--trigger:hover]"> <!--Post metadata and author info--> <span class="font-bold text-neutral-700 dark:text-neutral-300"> ${post.data.author} </span> </div> <ul class="text-xs text-neutral-500"> <li class="relative inline-block pe-6 before:absolute before:end-2 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-neutral-300 last:pe-0 last-of-type:before:hidden dark:text-neutral-400 dark:before:bg-neutral-600"> ${formatDate(post.data.pubDate)} </li> <li class="relative inline-block pe-6 before:absolute before:end-2 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-neutral-300 last:pe-0 last-of-type:before:hidden dark:text-neutral-400 dark:before:bg-neutral-600"> ${post.data.readTime} min read
</li> </ul> </div> </div> </div> </div> </div> <!--Blog post title--> <h2 class="mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-200 md:text-3xl"> ${post.data.title} </h2> <!--Blog post contents--> <div class="mb-5 space-y-5 md:mb-8 md:space-y-8"> ${post.data.contents.map(
    (content, index) => index === 1 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <p class="text-pretty text-lg text-neutral-700 dark:text-neutral-300"> ${content} </p> ${renderComponent($$result3, "Image", $$Image, { "class": "w-full rounded-xl object-cover", "src": post.data.cardImage, "alt": post.data.cardImageAlt, "draggable": "false", "format": "avif" })} ` })}` : renderTemplate`<p class="text-pretty text-lg text-neutral-700 dark:text-neutral-300"> ${content} </p>`
  )} </div> <div class="mx-auto grid max-w-screen-lg gap-y-5 sm:flex sm:items-center sm:justify-between sm:gap-y-0"> <!--Blog post tags--> <div class="flex flex-wrap gap-x-2 gap-y-1 sm:flex-nowrap sm:items-center sm:gap-y-0"> ${post.data.tags?.map((tag, index) => renderTemplate`<span class="inline-flex items-center gap-x-1.5 rounded-lg bg-neutral-400/30 px-3 py-1.5 text-xs font-medium text-neutral-700 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring dark:bg-neutral-700/60 dark:text-neutral-300"> ${capitalize(tag)} </span>`)} </div> <!--Bookmark and Share buttons--> <div class="flex items-center justify-end gap-x-1.5"> ${renderComponent($$result2, "Bookmark", $$Bookmark, {})} <div class="mx-3 block h-4 border-e border-neutral-400 dark:border-neutral-500"></div> <div class="inline-flex"> ${renderComponent($$result2, "SocialShare", $$SocialShare, { "pageTitle": post.data.title })} </div> </div> </div> </div> ${renderComponent($$result2, "PostFeedback", $$PostFeedback, { "title": "Cet article \xE9tait-il utile?", "firstChoice": "Oui", "secondChoice": "Non" })} </section>  <section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"> <div class="mb-10 max-w-2xl"> <h2 class="text-balance text-2xl font-bold text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight">
Articles connexes
</h2> </div> <div class="grid grid-cols-2 gap-6"> ${relatedPosts.map((entry) => renderTemplate`${renderComponent($$result2, "CardRelated", $$CardRelated, { "blogEntry": entry, "recentBlogLocale": "fr" })}`)} </div> </section> ` })}`;
}, "/Users/gg/iost/demo/YST_front/src/pages/fr/blog/[...slug].astro", void 0);

const $$file = "/Users/gg/iost/demo/YST_front/src/pages/fr/blog/[...slug].astro";
const $$url = "/fr/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
