import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from './astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { $ as $$PrimaryCTA } from './PrimaryCTA_4UjoUGX4.mjs';
import { $ as $$Image } from './_astro_assets_Cru6olkC.mjs';
import 'clsx';

const $$Astro$5 = createAstro("https://screwfast.uk");
const $$MainSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MainSection;
  const { title, subTitle, btnExists, btnTitle, btnURL } = Astro2.props;
  return renderTemplate`<!-- Root section of the component -->${maybeRenderHead()}<section class="mx-auto mt-10 max-w-[85rem] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="max-w-screen-md"> <!-- Section title --> <h1 class="mb-4 text-balance text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200"> ${title} </h1> <!-- Section subtitle --> <p class="mb-8 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-xl"> ${subTitle} </p> <!-- Conditional rendering of PrimaryCTA component if 'btnExists' property is truthy --> ${btnExists ? renderTemplate`<div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"> ${renderComponent($$result, "PrimaryCTA", $$PrimaryCTA, { "title": btnTitle, "url": btnURL })} </div>` : null} </div> </section>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/blocks/MainSection.astro", void 0);

const $$Astro$4 = createAstro("https://screwfast.uk");
const $$LeftSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LeftSection;
  const { title, subTitle, btnExists, btnTitle, btnURL, img, imgAlt } = Astro2.props;
  return renderTemplate`<!-- The root section of the component -->${maybeRenderHead()}<section class="mx-auto max-w-[85rem] items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 lg:px-8 lg:py-14 xl:gap-16 2xl:max-w-full"> <!-- The Image component which renders the image --> ${renderComponent($$result, "Image", $$Image, { "class": "w-full rounded-xl", "src": img, "alt": imgAlt, "draggable": "false", "format": "avif" })} <!-- The container for title, subtitle, and optional CTA button --> <div class="mt-4 md:mt-0"> <!-- The title of the section --> <h2 class="mb-4 text-balance text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200"> ${title} </h2> <!-- The subtitle of the section --> <p class="mb-4 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-lg"> ${subTitle} </p> <!-- Conditionally render the Primary CTA button if btnExists is true --> ${btnExists ? renderTemplate`${renderComponent($$result, "PrimaryCTA", $$PrimaryCTA, { "title": btnTitle, "url": btnURL })}` : null} </div> </section>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/blocks/LeftSection.astro", void 0);

const $$Astro$3 = createAstro("https://screwfast.uk");
const $$RightSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RightSection;
  const {
    title,
    subTitle,
    btnExists,
    btnTitle,
    btnURL,
    single,
    imgOne,
    imgOneAlt,
    imgTwo,
    imgTwoAlt
  } = Astro2.props;
  return renderTemplate`<!-- Root section of the component -->${maybeRenderHead()}<section class="mx-auto max-w-[85rem] items-center gap-16 px-4 py-10 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8 lg:py-14 2xl:max-w-full"> <div> <!-- Title of the section --> <h2 class="mb-4 text-balance text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200"> ${title} </h2> <!-- Subtitle of the section --> <p class="mb-4 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-lg"> ${subTitle} </p> <!-- Conditional rendering of the Primary Call-To-Action button if 'btnExists' is true --> ${btnExists ? renderTemplate`${renderComponent($$result, "PrimaryCTA", $$PrimaryCTA, { "title": btnTitle, "url": btnURL })}` : null} </div> <!-- Conditionally render one or two images based on 'single' property --> ${single ? renderTemplate`<div class="mt-8"> <!-- Single image --> ${renderComponent($$result, "Image", $$Image, { "class": "w-full rounded-lg", "src": imgOne, "alt": imgOneAlt, "format": "avif" })} </div>` : renderTemplate`<div class="mt-8 grid grid-cols-2 gap-4"> <!-- First image in a two-image layout --> ${renderComponent($$result, "Image", $$Image, { "class": "w-full rounded-xl", "src": imgOne, "alt": imgOneAlt, "draggable": "false", "format": "avif" })} <!-- Second image in a two-image layout --> ${renderComponent($$result, "Image", $$Image, { "class": "mt-4 w-full rounded-xl lg:mt-10", "src": imgTwo, "alt": imgTwoAlt, "draggable": "false", "format": "avif" })} </div>`} </section>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/blocks/RightSection.astro", void 0);

const $$Astro$2 = createAstro("https://screwfast.uk");
const $$StatsBig = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$StatsBig;
  const { title, subTitle } = Astro2.props;
  return renderTemplate`<!-- Container for the title and subtitle -->${maybeRenderHead()}<div class="lg:pe-6 xl:pe-12"> <p class="text-6xl font-bold leading-10 text-orange-400 dark:text-orange-300"> ${title} </p> <p class="mt-2 text-neutral-600 dark:text-neutral-400 sm:mt-3">${subTitle}</p> </div>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/blocks/StatsBig.astro", void 0);

const $$Astro$1 = createAstro("https://screwfast.uk");
const $$StatsSmall = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StatsSmall;
  const { title, subTitle } = Astro2.props;
  return renderTemplate`<!-- Container for title and subtitle -->${maybeRenderHead()}<div> <p class="text-3xl font-bold text-orange-400 dark:text-orange-300">${title}</p> <p class="mt-1 text-neutral-600 dark:text-neutral-400">${subTitle}</p> </div>`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/blocks/StatsSmall.astro", void 0);

const $$Astro = createAstro("https://screwfast.uk");
const $$FeaturesStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FeaturesStats;
  const { title, subTitle, stats, mainStatTitle, mainStatSubTitle } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="max-w-screen-md"> <!-- Main title --> <h2 class="mb-4 text-balance text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200"> ${title} </h2> <!-- Subtitle --> ${subTitle && renderTemplate`<p class="mb-16 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-xl"> ${subTitle} </p>`} </div> <!-- Grid container for statistics --> <div class="grid items-center gap-6 lg:grid-cols-12 lg:gap-12"> <!-- First grid item, showing a big statistics --> <div class="lg:col-span-4"> ${renderComponent($$result, "StatsBig", $$StatsBig, { "title": mainStatTitle, "subTitle": mainStatSubTitle })} </div> <!-- Second grid item, showing multiple small statistics --> ${stats && renderTemplate`<div class="relative lg:col-span-8 lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-neutral-300 lg:before:dark:bg-neutral-700"> <div class="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-3"> <!-- Iterate over the 'stats' array and create a 'StatsSmall' component for each object in the array --> ${stats.map((stat) => renderTemplate`${renderComponent($$result, "StatsSmall", $$StatsSmall, { "title": stat.stat, "subTitle": stat.description })}`)} </div> </div>`} </div> </section>`;
}, "/Users/gg/iost/demo/YST_front/src/components/sections/features/FeaturesStats.astro", void 0);

const blueprints = new Proxy({"src":"/_astro/blueprints-image.DxAt2gto.avif","width":1333,"height":2000,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/blueprints-image.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/blueprints-image.avif");
							return target[name];
						}
					});

const personWorking = new Proxy({"src":"/_astro/person-working.aUGgRiE_.avif","width":1334,"height":2000,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/person-working.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/person-working.avif");
							return target[name];
						}
					});

const beforeAfter = new Proxy({"src":"/_astro/before-after.BntBToq6.avif","width":2048,"height":1366,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/before-after.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/before-after.avif");
							return target[name];
						}
					});

const constructionWorkers = new Proxy({"src":"/_astro/construction-workers.XhU7Ouf4.avif","width":1920,"height":1280,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/construction-workers.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/construction-workers.avif");
							return target[name];
						}
					});

const aerialView = new Proxy({"src":"/_astro/aerial-view.CeV30CXX.avif","width":1920,"height":1282,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/aerial-view.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/aerial-view.avif");
							return target[name];
						}
					});

const usingTools = new Proxy({"src":"/_astro/using-tools.BrEE8t5H.avif","width":1920,"height":1280,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/using-tools.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/using-tools.avif");
							return target[name];
						}
					});

const progressBuilding = new Proxy({"src":"/_astro/progress-building.Cjca0suI.avif","width":1920,"height":2560,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/progress-building.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/progress-building.avif");
							return target[name];
						}
					});

const underConstruction = new Proxy({"src":"/_astro/under-construction.DfISh1yq.avif","width":1920,"height":2876,"format":"avif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/gg/iost/demo/YST_front/src/images/under-construction.avif";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/gg/iost/demo/YST_front/src/images/under-construction.avif");
							return target[name];
						}
					});

export { $$MainSection as $, beforeAfter as a, blueprints as b, aerialView as c, constructionWorkers as d, underConstruction as e, progressBuilding as f, $$RightSection as g, $$LeftSection as h, $$FeaturesStats as i, personWorking as p, usingTools as u };
