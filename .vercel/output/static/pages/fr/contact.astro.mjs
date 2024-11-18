/* empty css                                    */
import { a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../../chunks/astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { $ as $$Icon, a as $$MainLayout } from '../../chunks/MainLayout_BqcN3IPA.mjs';
import { $ as $$TextInput, a as $$EmailContactInput, b as $$PhoneInput, c as $$TextAreaInput, d as $$AuthBtn, e as $$ContactIconBlock } from '../../chunks/TextAreaInput_4OH-dPm8.mjs';
export { renderers } from '../../renderers.mjs';

const $$ContactSectionFr = createComponent(($$result, $$props, $$slots) => {
  const title = "Contactez-nous";
  const subTitle = "Vous avez des questions ou souhaitez discuter d'un projet ? Contactez-nous et laissons-nous \xE9laborer la solution parfaite avec nos outils et services.";
  const formTitle = "Remplissez le formulaire ci-dessous";
  const formSubTitle = "Nous vous r\xE9pondrons dans un d\xE9lai de 1 \xE0 2 jours ouvrables.";
  return renderTemplate`<!-- Contact Us -->${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"> <div class="mx-auto max-w-2xl lg:max-w-5xl"> <div class="text-center"> <h1 class="text-balance text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight"> ${title} </h1> <p class="mt-1 text-pretty text-neutral-600 dark:text-neutral-400"> ${subTitle} </p> </div> <div class="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16"> <div class="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8"> <h2 class="mb-8 text-xl font-bold text-neutral-700 dark:text-neutral-300"> ${formTitle} </h2> <!-- Form for user input with various input fields.--> <!-- Each field utilizes a different input component for the specific type of input (text, email, phone, and textarea)--> <form> <div class="grid gap-4"> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"> ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-firstname-contacts", "label": "Pr\xE9nom", "name": "hs-firstname-contacts" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-lastname-contacts", "label": "Nom", "name": "hs-firstname-contacts" })} </div> ${renderComponent($$result, "EmailContactInput", $$EmailContactInput, { "id": "hs-email-contacts" })} ${renderComponent($$result, "PhoneInput", $$PhoneInput, { "id": "hs-phone-number" })} ${renderComponent($$result, "TextAreaInput", $$TextAreaInput, { "id": "hs-about-contacts", "label": "D\xE9tails", "name": "hs-about-contacts" })} </div> <div class="mt-4 grid"> ${renderComponent($$result, "AuthBtn", $$AuthBtn, { "title": "Envoyer un message" })} </div> <div class="mt-3 text-center"> <p class="text-sm text-neutral-600 dark:text-neutral-400"> ${formSubTitle} </p> </div> </form> </div> <!--ContactIconBlocks are used to display different methods of contacting, including visiting office, email, browsing knowledgebase, and FAQ.--> <div class="divide-y divide-neutral-300 dark:divide-neutral-700"> ${renderComponent($$result, "ContactIconBlock", $$ContactIconBlock, { "heading": "Base de connaissances", "content": "Parcourez tous nos articles de base de connaissances.", "isLinkVisible": true, "linkTitle": "Visiter les guides et tutoriels", "linkURL": "#", "isArrowVisible": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "question" })} ` })} ${renderComponent($$result, "ContactIconBlock", $$ContactIconBlock, { "heading": "FAQ", "content": "Explorez notre FAQ pour des r\xE9ponses rapides et claires aux questions courantes.", "isLinkVisible": true, "linkTitle": "Visiter la FAQ", "linkURL": "#", "isArrowVisible": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "chatBubble" })} ` })} ${renderComponent($$result, "ContactIconBlock", $$ContactIconBlock, { "heading": "Visitez notre bureau", "content": "ScrewFast UK", "isAddressVisible": true, "addressContent": "72 Union Terrace, E10 4PE London" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "mapPin" })} ` })} ${renderComponent($$result, "ContactIconBlock", $$ContactIconBlock, { "heading": "Contactez-nous par e-mail", "content": "Pr\xE9f\xE9rez-vous le texte \xE9crit ? Envoyez-nous un e-mail \xE0", "isLinkVisible": true, "linkTitle": "support@screwfast.uk", "linkURL": "#" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "envelopeOpen" })} ` })} </div> </div> </div> </section>`;
}, "/Users/gg/iost/demo/YST_front/src/components/sections/fr/ContactSection_fr.astro", void 0);

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Contact | ScrewFast", "lang": "fr", "structuredData": {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://screwfast.uk//fr/contact",
    url: "https://screwfast.uk//fr/contact",
    name: "Nous Contacter | ScrewFast",
    description: "Vous avez des questions ou souhaitez discuter d'un projet ? Contactez-nous et \xE9laborons ensemble la solution parfaite avec nos outils et services.",
    isPartOf: {
      "@type": "WebSite",
      url: "https://screwfast.uk/fr/",
      name: "ScrewFast",
      description: "ScrewFast propose des outils mat\xE9riels de premier ordre et des services de construction experts pour r\xE9pondre \xE0 tous vos besoins de projet."
    },
    inLanguage: "fr"
  } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContactSection", $$ContactSectionFr, {})} ` })}`;
}, "/Users/gg/iost/demo/YST_front/src/pages/fr/contact.astro", void 0);

const $$file = "/Users/gg/iost/demo/YST_front/src/pages/fr/contact.astro";
const $$url = "/fr/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
