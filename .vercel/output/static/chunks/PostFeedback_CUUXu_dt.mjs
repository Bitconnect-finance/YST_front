import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent, e as renderScript } from './astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { $ as $$Image } from './_astro_assets_Cru6olkC.mjs';
import { f as formatDate } from './AvatarBlogLarge_Bskrl7cT.mjs';
import { $ as $$Icon } from './MainLayout_BqcN3IPA.mjs';
import 'clsx';

const $$Astro$2 = createAstro("https://screwfast.uk");
const $$CardRelated = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CardRelated;
  const { blogEntry, recentBlogLocale = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="group block rounded-xl outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:ring-zinc-200 dark:focus:outline-none"${addAttribute(recentBlogLocale !== "" ? `/${recentBlogLocale}/blog/${blogEntry.slug}/` : `/blog/${blogEntry.slug}/`, "href")} data-astro-prefetch> <div> ${renderComponent($$result, "Image", $$Image, { "class": "aspect-video rounded-xl", "src": blogEntry.data.cardImage, "alt": blogEntry.data.cardImageAlt, "draggable": "false", "format": "avif" })} <!-- The title of the blog post --> <h3 class="mt-2 text-balance text-lg font-medium text-neutral-800 group-hover:text-orange-400 dark:text-neutral-300 dark:group-hover:text-neutral-50"> ${blogEntry.data.title} </h3> <!-- The formatted publication date of the blog post --> <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400"> ${formatDate(blogEntry.data.pubDate)} </p> </div></a>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/cards/CardRelated.astro", void 0);

const $$Bookmark = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button type="button" class="focus-visible:ring-secondary group inline-flex items-center rounded-lg p-2.5 text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-100 focus:outline-none focus-visible:outline-none focus-visible:ring-1 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:bg-neutral-700" data-bookmark-button="bookmark-button"> ${renderComponent($$result, "Icon", $$Icon, { "name": "bookmark" })} </button> ${renderScript($$result, "/Users/gg/iost/demo/YST_front/src/components/ui/buttons/Bookmark.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/buttons/Bookmark.astro", void 0);

const $$Astro$1 = createAstro("https://screwfast.uk");
const $$SocialShare = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialShare;
  const {
    pageTitle,
    title = Astro2.currentLocale === "fr" ? "Partager" : "Share"
  } = Astro2.props;
  const socialPlatforms = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/share.php?u=${Astro2.url}&title=${pageTitle}`,
      svg: "facebook"
    },
    {
      name: "X",
      url: `https://twitter.com/home/?status=${pageTitle}${Astro2.url}`,
      svg: "x"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${Astro2.url}&title=${pageTitle}`,
      svg: "linkedIn"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="hs-dropdown relative inline-flex [--auto-close:inside] [--placement:top-left]"> <button id="hs-dropup" type="button" class="hs-dropdown-toggle inline-flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:ring dark:text-neutral-400 dark:ring-zinc-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:outline-none"> ${renderComponent($$result, "Icon", $$Icon, { "name": "share" })} ${title} </button> <div class="hs-dropdown-menu duration z-10 hidden w-72 divide-y divide-neutral-200 rounded-lg bg-neutral-50 p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800" aria-labelledby="hs-dropup"> <div class="py-2 first:pt-0 last:pb-0"> ${socialPlatforms.map((platform) => renderTemplate`<a class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-200 focus:bg-neutral-100  focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 "${addAttribute(platform.url, "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": platform.svg })}
Share on ${platform.name} </a>`)} </div> <div class="py-2 first:pt-0 last:pb-0"> <button type="button" class="js-clipboard hover:text-dark focus-visible:ring-secondary group inline-flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-200 focus:bg-neutral-100 focus:outline-none focus-visible:outline-none focus-visible:ring-1 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" data-clipboard-success-text="Copied"> <svg class="js-clipboard-default h-4 w-4 transition group-hover:rotate-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path> </svg> <svg class="js-clipboard-success hidden h-4 w-4 text-neutral-700 dark:text-neutral-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="20 6 9 17 4 12"></polyline> </svg> <span class="js-clipboard-success-text">Copy link</span> </button> </div> </div> </div> <!--Import the necessary Dropdown and Clipboard plugins--> <!--https://preline.co/plugins/html/dropdown.html--> <!-- https://clipboardjs.com/ --> ${renderScript($$result, "/Users/gg/iost/demo/YST_front/src/components/ui/buttons/SocialShare.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/gg/iost/demo/YST_front/src/components/ui/buttons/SocialShare.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/buttons/SocialShare.astro", void 0);

const $$Astro = createAstro("https://screwfast.uk");
const $$PostFeedback = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostFeedback;
  const { title, firstChoice, secondChoice } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="mt-12 flex items-center justify-center gap-x-2"> <h3 class="text-neutral-700 dark:text-neutral-300">${title}</h3> <button type="button" class="group inline-flex items-center gap-x-2 rounded-lg border border-neutral-400 px-3 py-2 text-sm font-medium text-neutral-700 hover:border-yellow-500 hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500 dark:border-neutral-500 dark:text-neutral-300 dark:hover:bg-yellow-500 dark:hover:text-neutral-700 dark:hover:border-yellow-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"> <svg class="size-4 flex-shrink-0 transition duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg> ${firstChoice} </button> <button type="button" class="group inline-flex items-center gap-x-2 rounded-lg border border-neutral-400 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-400/30 dark:border-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-700/60 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"> <svg class="size-4 flex-shrink-0 transition duration-300 group-hover:translate-y-1 group-focus-visible:translate-y-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path></svg> ${secondChoice} </button> </div>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/feedback/PostFeedback.astro", void 0);

export { $$Bookmark as $, $$SocialShare as a, $$PostFeedback as b, $$CardRelated as c };
