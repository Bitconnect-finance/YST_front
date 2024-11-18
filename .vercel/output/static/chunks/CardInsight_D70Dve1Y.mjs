import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, b as addAttribute } from './astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { $ as $$Image } from './_astro_assets_Cru6olkC.mjs';
import { f as formatDate, $ as $$AvatarBlogLarge } from './AvatarBlogLarge_Bskrl7cT.mjs';
import { $ as $$PrimaryCTA } from './PrimaryCTA_4UjoUGX4.mjs';
import { $ as $$Icon } from './MainLayout_BqcN3IPA.mjs';

const $$Astro$3 = createAstro("https://screwfast.uk");
const $$AvatarBlog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$AvatarBlog;
  const { blogEntry } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex-shrink-0"> ${renderComponent($$result, "Image", $$Image, { "class": "size-[46px] rounded-full border-2 border-neutral-50", "src": blogEntry.data.authorImage, "alt": blogEntry.data.authorImageAlt, "draggable": "false", "format": "avif" })} </div>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/avatars/AvatarBlog.astro", void 0);

const $$Astro$2 = createAstro("https://screwfast.uk");
const $$CardBlog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CardBlog;
  const { blogEntry, blogLocale = "" } = Astro2.props;
  return renderTemplate`<!-- The following anchor tag is the main container for the card.
     It's a link to the blog post detailed page.
     The data-astro-prefetch is an Astro specific Dynamic HTML feature,
     which automatically prefetches the linked page to speed up navigation. -->${maybeRenderHead()}<a class="group relative block rounded-xl outline-none ring-zinc-500 transition duration-500 focus-visible:ring dark:ring-zinc-200 dark:focus:outline-none"${addAttribute(blogLocale !== "" ? `/${blogLocale}/blog/${blogEntry.slug}/` : `/blog/${blogEntry.slug}/`, "href")} data-astro-prefetch> <!-- The container for the blog post's cover image. Uses astro:assets' Image for image source --> <div class="relative h-[350px] w-full flex-shrink-0 overflow-hidden rounded-xl before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-neutral-900/[.7]"> ${renderComponent($$result, "Image", $$Image, { "class": "absolute start-0 top-0 size-full object-cover transition duration-500 group-hover:scale-110", "src": blogEntry.data.cardImage, "alt": blogEntry.data.cardImageAlt, "draggable": "false", "loading": "eager", "format": "avif" })} </div> <!-- The container for the blog author's avatar and associated metadata (author name and publication date) --> <div class="absolute inset-x-0 top-0 z-10"> <div class="flex h-full flex-col p-4 sm:p-6"> <div class="flex items-center"> ${renderComponent($$result, "AvatarBlog", $$AvatarBlog, { "blogEntry": blogEntry })} <div class="ms-2.5 sm:ms-4"> <h4 class="font-bold text-neutral-50"> ${blogEntry.data.author} </h4> <p class="text-xs text-neutral-50/[.8]"> ${formatDate(blogEntry.data.pubDate)} </p> </div> </div> </div> </div> <!-- The container for the blog post's title and description --> <div class="absolute inset-x-0 bottom-0 z-10"> <div class="flex h-full flex-col p-4 sm:p-6"> <h3 class="text-balance text-lg font-bold text-neutral-50 group-hover:text-neutral-50/[.8] sm:text-3xl"> ${blogEntry.data.title} </h3> <p class="mt-2 text-pretty text-neutral-50/[.8]"> ${blogEntry.data.description} </p> </div> </div> </a>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/cards/CardBlog.astro", void 0);

const $$Astro$1 = createAstro("https://screwfast.uk");
const $$CardBlogRecent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardBlogRecent;
  const { blogEntry, recentBlogLocale = "" } = Astro2.props;
  return renderTemplate`<!-- Root container, which is divided into 2 grid column layout for larger screens -->${maybeRenderHead()}<div class="grid gap-8 sm:grid-cols-2 sm:items-center"> <!-- Container for the blog post's cover image --> <div class="sm:order-2"> <div class="relative rounded-lg pt-[50%] sm:pt-[100%]"> ${renderComponent($$result, "Image", $$Image, { "class": "absolute start-0 top-0 size-full rounded-xl object-cover", "src": blogEntry.data.cardImage, "alt": blogEntry.data.cardImageAlt, "draggable": "false", "loading": "eager", "format": "avif" })} </div> </div> <!-- Container for the blog post's heading, author avatar, author's role, and read more button --> <div class="sm:order-1"> <!-- Blog title which is also a hyperlink to the blog detail page  --> <h2 class="text-balance text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight"> <a class="outline-none ring-zinc-500 transition duration-300 hover:text-orange-400 focus-visible:ring dark:text-neutral-300 dark:ring-zinc-200 dark:hover:text-neutral-50 dark:focus:outline-none"${addAttribute(recentBlogLocale !== "" ? `/${recentBlogLocale}/blog/${blogEntry.slug}/` : `/blog/${blogEntry.slug}/`, "href")}> ${blogEntry.data.description} </a> </h2> <!-- Container for the author's avatar and metadata --> <div class="mt-6 flex items-center sm:mt-10"> ${renderComponent($$result, "AvatarBlogLarge", $$AvatarBlogLarge, { "blogEntry": blogEntry })} <div class="ms-3 sm:ms-4"> <p class="font-bold text-neutral-800 dark:text-neutral-200 sm:mb-1"> ${blogEntry.data.author} </p> <p class="text-xs text-neutral-500"> ${blogEntry.data.role} </p> </div> </div> <!-- Read More button which is a link to the blog post detailed page --> <div class="mt-5"> ${renderComponent($$result, "PrimaryCTA", $$PrimaryCTA, { "url": recentBlogLocale !== "" ? `/${recentBlogLocale}/blog/${blogEntry.slug}/` : `/blog/${blogEntry.slug}/`, "title": "Read More", "data-astro-prefetch": true })} </div> </div> </div>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/cards/CardBlogRecent.astro", void 0);

const $$Astro = createAstro("https://screwfast.uk");
const $$CardInsight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardInsight;
  const {
    insightEntry,
    label = Astro2.currentLocale === "fr" ? "Lire plus" : "Read more"
  } = Astro2.props;
  return renderTemplate`<!-- The anchor tag is the root container for the "Insight" card. It links to the insight detail page. -->${maybeRenderHead()}<a class="group rounded-xl outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:ring-zinc-200 dark:focus:outline-none"${addAttribute(`/insights/${insightEntry.slug}/`, "href")}> <!-- This is the container for the insight's cover image. --> <div class="relative overflow-hidden rounded-xl pt-[50%] sm:pt-[70%]"> ${renderComponent($$result, "Image", $$Image, { "class": "absolute start-0 top-0 size-full rounded-xl object-cover transition duration-500 ease-in-out group-hover:scale-105", "src": insightEntry.data.cardImage, "alt": insightEntry.data.cardImageAlt, "draggable": "false", "format": "avif" })} </div> <!-- This is the container for the insight's title and description. --> <div class="mt-7"> <!-- The title of the insight --> <h3 class="text-xl font-bold text-neutral-800 group-hover:text-neutral-600 dark:text-neutral-200 dark:group-hover:text-neutral-400"> ${insightEntry.data.title} </h3> <!-- The description of the insight --> <p class="mt-3 text-neutral-600 dark:text-neutral-400"> ${insightEntry.data.description} </p> <!-- The "Read More" hyperlink going to the full insight. With an arrow icon --> <p class="mt-5 inline-flex items-center gap-x-1 font-medium text-orange-400 decoration-2 group-hover:underline dark:text-orange-300"> ${label} ${renderComponent($$result, "Icon", $$Icon, { "name": "arrowRightStatic" })} </p> </div> </a>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/cards/CardInsight.astro", void 0);

export { $$CardBlog as $, $$CardBlogRecent as a, $$CardInsight as b };
