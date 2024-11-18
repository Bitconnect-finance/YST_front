/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { a as $$MainLayout } from '../chunks/MainLayout_BqcN3IPA.mjs';
import { $ as $$AnnouncementBanner, a as $$HeroSection, h as heroImage, b as $$ClientsSection, c as $$FeaturesGeneral, d as $$FeaturesNavs, t as tools, e as dashboard, f as construction, g as $$TestimonialsSection, i as $$PricingSection, j as $$FAQ, k as $$HeroSectionAlt } from '../chunks/dashboard-image_DUH9I2gr.mjs';
import { f as featureImage } from '../chunks/features-image_CphNjCvv.mjs';
export { renderers } from '../renderers.mjs';

const subTitle$1 = "Ask us anything about our brand and products, and get factual responses.";
const faqs = [
	{
		question: "What types of tools are included in the Starter Kit?",
		answer: "The Starter Kit features essential hand and power tools for diverse DIY projects, including hammers, drills, screwdrivers, and a variety of fasteners. It's a curated selection to help beginners and experienced DIYers alike tackle most home improvement tasks."
	},
	{
		question: "Can I upgrade from the Starter Kit to the Professional Toolbox?",
		answer: "Absolutely! You can upgrade to the Professional Toolbox at any time to access a wider range of high-quality tools, enjoy priority customer support, and receive exclusive content. Contact our support team for a seamless transition."
	},
	{
		question: "What discounts are available for bulk orders through the Professional Toolbox plan?",
		answer: "Professional Toolbox members are entitled to exclusive discounts on bulk orders, the percentage of which may vary depending on the order volume. Get in touch with us to discuss your needs, and we'll provide a tailored discount structure."
	},
	{
		question: "What kind of customer support can I expect?",
		answer: "All our customers receive dedicated email support. With the Starter Kit, you'll receive our standard support, while the Professional Toolbox plan upgrades you to priority support, meaning faster response times and specialized assistance."
	},
	{
		question: "How current are the online resources and tutorials?",
		answer: "We regularly update our online resources and tutorials to reflect the latest trends in DIY and construction, as well as introductions to new tools and techniques. Our material aims to be comprehensive and user-friendly for all skill levels."
	},
	{
		question: "Does ScrewFast offer services for large-scale construction projects?",
		answer: "Yes, our Enterprise Solutions are designed for larger companies requiring comprehensive services. We provide consultation, planning, and supply of high-grade tools and materials, as well as staffing solutions for substantial construction needs. Contact us for a customized quote."
	}
];
const faqs$1 = {
	subTitle: subTitle$1,
	faqs: faqs
};

const features = [
	{
		heading: "Dedicated Teams",
		content: "Benefit from our committed teams who ensure your success is personal. Count on expert guidance and exceptional results throughout your project journey.",
		svg: "groups"
	},
	{
		heading: "Simplicity and Affordability",
		content: "Find easy-to-use, affordable solutions with ScrewFast's line of tools and equipment. Our products make procurement simple and keep projects within budget.",
		svg: "verified"
	},
	{
		heading: "Comprehensive Documentation",
		content: "Integrate with ease using ScrewFast's exhaustive guides and libraries. Achieve seamless product adoption with our full suite of documentation designed for your success.",
		svg: "books"
	},
	{
		heading: "User-Centric Design",
		content: "Experience the difference with ScrewFast's user-focused design — where functionality meets practicality for an enhanced work experience.",
		svg: "frame"
	}
];

const title = "Simple, Transparent Pricing";
const subTitle = "Boost efficiency with ScrewFast's clear, value-driven plans.";
const badge = "Best value";
const thirdOption = "Enterprise Solutions?";
const btnText = "Get a Custom Quote";
const starterKit = {
	name: "Starter Kit",
	description: "Best option for DIY projects",
	price: "49",
	cents: ".00",
	billingFrequency: "USD / monthly",
	features: [
		"Key hardware tools",
		"Access to guides & tutorials",
		"Standard support"
	],
	purchaseBtnTitle: "Get the Starter Kit",
	purchaseLink: "#"
};
const professionalToolbox = {
	name: "Professional Toolbox",
	description: "Best for large scale uses",
	price: "89",
	cents: ".00",
	billingFrequency: "USD / monthly",
	features: [
		"Premium tool selection",
		"Priority support",
		"Exclusive content & deals",
		"Bulk order discounts"
	],
	purchaseBtnTitle: "Get the Professional Toolbox",
	purchaseLink: "#"
};
const pricing = {
	title: title,
	subTitle: subTitle,
	badge: badge,
	thirdOption: thirdOption,
	btnText: btnText,
	starterKit: starterKit,
	professionalToolbox: professionalToolbox
};

const $$Astro = createAstro("https://screwfast.uk");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const avatarSrcs = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AnnouncementBanner", $$AnnouncementBanner, { "btnId": "dismiss-button", "btnTitle": "Explore ScrewFast on GitHub", "url": "https://github.com/mearashadowfax/ScrewFast" })} ${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": `Equip Your Projects with <span
        class="text-yellow-500 dark:text-yellow-400">ScrewFast</span>`, "subTitle": "Top-quality hardware tools and expert construction services for every project need.", "primaryBtn": "Start Exploring", "primaryBtnURL": "/products", "secondaryBtn": "Contact Sales Team", "secondaryBtnURL": "/contact", "withReview": true, "avatars": avatarSrcs, "rating": `<span class="font-bold">4.8</span> / 5`, "starCount": 4, "reviews": `From Over <span class="font-bold">12.8k</span> Reviews`, "src": heroImage, "alt": "Stack of ScrewFast product boxes containing assorted hardware tools" })} ${renderComponent($$result2, "ClientsSection", $$ClientsSection, { "title": "Trusted by Industry Leaders", "subTitle": "Experience the reliability chosen by industry giants." })} ${renderComponent($$result2, "FeaturesGeneral", $$FeaturesGeneral, { "title": "Meeting Industry Demands", "subTitle": "At ScrewFast, we tackle the unique challenges encountered in the hardware and construction sectors. From cutting-edge tools to expert services, we're dedicated to helping you overcome obstacles and achieve your goals.", "src": featureImage, "alt": "ScrewFast products in floating boxes", "features": features })} ${renderComponent($$result2, "FeaturesNavs", $$FeaturesNavs, { "title": `Customize <span class="text-yellow-500 dark:text-yellow-400">ScrewFast</span>'s offerings to perfectly suit your hardware and construction needs.`, "tabs": [
    {
      heading: "Cutting-Edge Tools",
      content: "Empower your projects with ScrewFast's cutting-edge tools. Experience enhanced efficiency in construction management with our sophisticated automated solutions.",
      svg: "tools",
      src: tools,
      alt: "Yellow and black heavy equipment on brown grass field",
      first: true
    },
    {
      heading: "Intuitive Dashboards",
      content: "Navigate with ease using ScrewFast's intuitive dashboards. Set up and oversee your projects seamlessly, with user-friendly interfaces designed for quick and effective workflow management.",
      svg: "dashboard",
      src: dashboard,
      alt: "A screenshot or graphic representation of the intuitive dashboard",
      second: true
    },
    {
      heading: "Robust Features",
      content: "Minimize complexity, maximize productivity. ScrewFast's robust features are engineered to streamline your construction process, delivering results that stand out for their excellence.",
      svg: "house",
      src: construction,
      alt: "Gray metal building frame near tower crane during daytime"
    }
  ] })} ${renderComponent($$result2, "TestimonialsSection", $$TestimonialsSection, { "title": "Fast-Track Your Projects", "subTitle": "At ScrewFast, we ensure a swift start with instant account setup. Experience the speed of construction redefined.", ";": true, "testimonials": [
    {
      content: "ScrewFast dramatically boosted our project efficiency. Setup was instant, and their rapid response times are phenomenal. Truly a game-changer in hardware and construction support!",
      author: "Samantha Ruiz",
      role: "Chief Operating Officer | ConstructIt Inc.",
      avatarSrc: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=1453&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
    }
  ], "statistics": [
    {
      count: "70k+",
      description: "customers equipped \u2014 from DIY to major construction firms"
    },
    {
      count: "35%",
      description: "uptick in project efficiency with ScrewFast tools and services"
    },
    {
      count: "15.3%",
      description: "reduction in maintenance costs reported by long-term clients"
    },
    {
      count: "2x",
      description: "quicker assembly using innovative fastening solutions"
    }
  ] })} ${renderComponent($$result2, "PricingSection", $$PricingSection, { "pricing": pricing })} ${renderComponent($$result2, "FAQ", $$FAQ, { "title": "Frequently<br />asked questions", "faqs": faqs$1 })} ${renderComponent($$result2, "HeroSectionAlt", $$HeroSectionAlt, { "title": "Let's Build Together", "subTitle": "ScrewFast is an open-source template, meticulously crafted with Astro, Tailwind CSS, and Preline UI frameworks.", "url": "https://github.com/mearashadowfax/ScrewFast" })} ` })}`;
}, "/Users/gg/iost/demo/YST_front/src/pages/index.astro", void 0);

const $$file = "/Users/gg/iost/demo/YST_front/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
