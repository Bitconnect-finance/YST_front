/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { a as $$MainLayout } from '../chunks/MainLayout_BqcN3IPA.mjs';
import { $ as $$AnnouncementBanner, a as $$HeroSection, h as heroImage, b as $$ClientsSection, c as $$FeaturesGeneral, d as $$FeaturesNavs, t as tools, e as dashboard, f as construction, g as $$TestimonialsSection, i as $$PricingSection, j as $$FAQ, k as $$HeroSectionAlt } from '../chunks/dashboard-image_DUH9I2gr.mjs';
import { f as featureImage } from '../chunks/features-image_CphNjCvv.mjs';
import { g as getRelativeLocaleUrl } from '../chunks/i18n_VRWJBQs2.mjs';
export { renderers } from '../renderers.mjs';

const subTitle$1 = "Posez-nous toutes vos questions sur notre marque et nos produits, et obtenez des réponses factuelles.";
const faqs = [
	{
		question: "Quels types d'outils sont inclus dans le Kit de Démarrage?",
		answer: "Le Kit de Démarrage comprend des outils à main et électriques essentiels pour différents projets de bricolage, notamment des marteaux, des perceuses, des tournevis et une variété de fixations. C'est une sélection soigneusement élaborée pour aider les débutants et les bricoleurs expérimentés à aborder la plupart des tâches d'amélioration de l'habitat."
	},
	{
		question: "Puis-je passer du Kit de Démarrage à la Boîte à Outils Professionnelle?",
		answer: "Absolument ! Vous pouvez passer à la Boîte à Outils Professionnelle à tout moment pour accéder à une gamme plus large d'outils de haute qualité, bénéficier d'un support client prioritaire et recevoir un contenu exclusif. Contactez notre équipe de support pour une transition sans problème."
	},
	{
		question: "Quels sont les rabais disponibles pour les commandes en gros via le plan Boîte à Outils Professionnelle?",
		answer: "Les membres de la Boîte à Outils Professionnelle ont droit à des rabais exclusifs sur les commandes en gros, dont le pourcentage peut varier en fonction du volume de la commande. Contactez-nous pour discuter de vos besoins, et nous vous fournirons une structure de rabais personnalisée."
	},
	{
		question: "À quoi puis-je m'attendre en termes de support client?",
		answer: "Tous nos clients bénéficient d'un support par e-mail dédié. Avec le Kit de Démarrage, vous recevrez notre support standard, tandis que le plan Boîte à Outils Professionnelle vous mettra à niveau vers un support prioritaire, ce qui signifie des temps de réponse plus rapides et une assistance spécialisée."
	},
	{
		question: "À quelle fréquence sont mises à jour les ressources en ligne et les tutoriels?",
		answer: "Nous mettons régulièrement à jour nos ressources en ligne et nos tutoriels pour refléter les dernières tendances en matière de bricolage et de construction, ainsi que les introductions de nouveaux outils et techniques. Notre matériel vise à être complet et convivial pour tous les niveaux de compétence."
	},
	{
		question: "ScrewFast propose-t-il des services pour les grands projets de construction?",
		answer: "Oui, nos Solutions Entreprise sont conçues pour les grandes entreprises ayant besoin de services complets. Nous fournissons des consultations, de la planification et de l'approvisionnement en outils et matériaux de haute qualité, ainsi que des solutions de personnel pour des besoins de construction importants. Contactez-nous pour un devis personnalisé."
	}
];
const faqs$1 = {
	subTitle: subTitle$1,
	faqs: faqs
};

const features = [
	{
		heading: "Équipes dédiées",
		content: "Bénéficiez de nos équipes engagées qui veillent à ce que votre réussite soit personnelle. Comptez sur un accompagnement expert et des résultats exceptionnels tout au long de votre parcours de projet.",
		svg: "groups"
	},
	{
		heading: "Simplicité et accessibilité",
		content: "Trouvez des solutions faciles à utiliser et abordables avec la gamme d'outils et d'équipements de ScrewFast. Nos produits simplifient l'approvisionnement et permettent de respecter les budgets de projet.",
		svg: "verified"
	},
	{
		heading: "Documentation complète",
		content: "Intégrez facilement grâce aux guides exhaustifs et aux bibliothèques de ScrewFast. Réalisez une adoption de produit sans faille avec notre ensemble complet de documentation conçu pour votre succès.",
		svg: "books"
	},
	{
		heading: "Conception centrée sur l'utilisateur",
		content: "Faites l'expérience de la différence avec la conception axée sur l'utilisateur de ScrewFast, où la fonctionnalité rencontre la praticité pour une expérience de travail améliorée.",
		svg: "frame"
	}
];

const title = "Tarification Simple et Transparente";
const subTitle = "Augmentez l'efficacité avec les plans clairs et axés sur la valeur de ScrewFast.";
const badge = "Meilleure valeur";
const thirdOption = "Solutions Entreprise?";
const btnText = "Obtenez un Devis Personnalisé";
const starterKit = {
	name: "Kit de Démarrage",
	description: "Meilleure option pour les projets de bricolage",
	price: "$49",
	cents: ".00",
	billingFrequency: "USD / mensuel",
	features: [
		"Outils matériels essentiels",
		"Accès aux guides et tutoriels",
		"Support standard"
	],
	purchaseBtnTitle: "Obtenez le Kit de Démarrage",
	purchaseLink: "#"
};
const professionalToolbox = {
	name: "Boîte à Outils Professionnelle",
	description: "Idéale pour les utilisations à grande échelle",
	price: "$89",
	cents: ".00",
	billingFrequency: "USD / mensuel",
	features: [
		"Sélection d'outils premium",
		"Support prioritaire",
		"Contenu et offres exclusifs",
		"Remises sur les commandes en gros"
	],
	purchaseBtnTitle: "Obtenez la Boîte à Outils Professionnelle",
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
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "lang": "fr" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AnnouncementBanner", $$AnnouncementBanner, { "btnId": "dismiss-button", "btnTitle": "D\xE9couvrez ScrewFast sur GitHub", "url": "https://github.com/mearashadowfax/ScrewFast" })} ${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": `\xC9quipez vos projets avec <span class="text-yellow-500 dark:text-yellow-400">ScrewFast</span>`, "subTitle": "Outils mat\xE9riels de haute qualit\xE9 et services de construction experts pour tous les besoins en projet.", "primaryBtn": "Commencez \xE0 explorer", "primaryBtnURL": getRelativeLocaleUrl("fr", "products"), "secondaryBtn": "Contacter l'\xE9quipe commerciale", "secondaryBtnURL": getRelativeLocaleUrl("fr", "contact"), "withReview": true, "avatars": avatarSrcs, "rating": `<span class="font-bold">4.8</span> / 5`, "starCount": 4, "reviews": `\xC0 partir de plus de <span class="font-bold">12,8k</span> avis`, "src": heroImage, "alt": "Pile de bo\xEEtes de produits ScrewFast contenant des outils mat\xE9riels assortis" })} ${renderComponent($$result2, "ClientsSection", $$ClientsSection, { "title": "Faites confiance aux leaders de l'industrie", "subTitle": "D\xE9couvrez la fiabilit\xE9 choisie par les g\xE9ants de l'industrie." })} ${renderComponent($$result2, "FeaturesGeneral", $$FeaturesGeneral, { "title": "R\xE9pondre aux exigences de l'industrie", "subTitle": "Chez ScrewFast, nous relevons les d\xE9fis uniques rencontr\xE9s dans les secteurs du mat\xE9riel et de la construction. Des outils de pointe aux services experts, nous sommes d\xE9termin\xE9s \xE0 vous aider \xE0 surmonter les obstacles et \xE0 atteindre vos objectifs.", "src": featureImage, "alt": "Produits ScrewFast dans des bo\xEEtes flottantes", "features": features })} ${renderComponent($$result2, "FeaturesNavs", $$FeaturesNavs, { "title": `Personnalisez les offres de <span class="text-yellow-500 dark:text-yellow-400">ScrewFast</span> pour r\xE9pondre parfaitement \xE0 vos besoins en mat\xE9riel et en construction.`, "tabs": [
    {
      heading: "Outils de pointe",
      content: "Optimisez vos projets avec les outils de pointe de ScrewFast. Faites l'exp\xE9rience d'une efficacit\xE9 accrue dans la gestion de la construction avec nos solutions automatis\xE9es sophistiqu\xE9es.",
      svg: "tools",
      src: tools,
      alt: "\xC9quipement lourd jaune et noir sur un champ d'herbe brune",
      first: true
    },
    {
      heading: "Tableaux de bord intuitifs",
      content: "Naviguez facilement avec les tableaux de bord intuitifs de ScrewFast. Configurez et supervisez vos projets de mani\xE8re transparente, avec des interfaces conviviales con\xE7ues pour une gestion efficace des flux de travail rapide et efficace.",
      svg: "dashboard",
      src: dashboard,
      alt: "Capture d'\xE9cran ou repr\xE9sentation graphique du tableau de bord intuitif",
      second: true
    },
    {
      heading: "Fonctionnalit\xE9s robustes",
      content: "Minimisez la complexit\xE9, maximisez la productivit\xE9. Les fonctionnalit\xE9s robustes de ScrewFast sont con\xE7ues pour rationaliser votre processus de construction, offrant des r\xE9sultats qui se distinguent par leur excellence.",
      svg: "house",
      src: construction,
      alt: "Structure m\xE9tallique grise d'un b\xE2timent pr\xE8s d'une grue \xE0 tour pendant la journ\xE9e"
    }
  ] })} ${renderComponent($$result2, "TestimonialsSection", $$TestimonialsSection, { "title": "Acc\xE9l\xE9rez vos projets", "subTitle": "Chez ScrewFast, nous assurons un d\xE9marrage rapide avec une configuration de compte instantan\xE9e. D\xE9couvrez la vitesse de la construction red\xE9finie.", "testimonials": [
    {
      content: "ScrewFast a consid\xE9rablement augment\xE9 l'efficacit\xE9 de notre projet. La configuration a \xE9t\xE9 instantan\xE9e et leurs temps de r\xE9ponse rapides sont ph\xE9nom\xE9naux. Vraiment un changement de jeu dans le support mat\xE9riel et de construction !",
      author: "Samantha Ruiz",
      role: "Directrice des op\xE9rations | ConstructIt Inc.",
      avatarSrc: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=1453&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
    }
  ], "statistics": [
    {
      count: "70k+",
      description: "clients \xE9quip\xE9s \u2014 des bricoleurs aux grandes entreprises de construction"
    },
    {
      count: "35%",
      description: "hausse de l'efficacit\xE9 des projets avec les outils et services de ScrewFast"
    },
    {
      count: "15,3%",
      description: "r\xE9duction des co\xFBts de maintenance rapport\xE9e par des clients \xE0 long terme"
    },
    {
      count: "2x",
      description: "assemblage plus rapide gr\xE2ce \xE0 des solutions de fixation innovantes"
    }
  ] })} ${renderComponent($$result2, "PricingSection", $$PricingSection, { "pricing": pricing })} ${renderComponent($$result2, "FAQ", $$FAQ, { "title": "Questions<br />fr\xE9quemment pos\xE9es", "faqs": faqs$1 })} ${renderComponent($$result2, "HeroSectionAlt", $$HeroSectionAlt, { "title": "Construisons ensemble", "subTitle": "ScrewFast est un mod\xE8le open source, m\xE9ticuleusement con\xE7u avec les frameworks Astro, Tailwind CSS et Preline UI.", "url": "https://github.com/mearashadowfax/ScrewFast" })} ` })}`;
}, "/Users/gg/iost/demo/YST_front/src/pages/fr/index.astro", void 0);

const $$file = "/Users/gg/iost/demo/YST_front/src/pages/fr/index.astro";
const $$url = "/fr";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
