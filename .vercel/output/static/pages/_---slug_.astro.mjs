/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, f as renderSlot, d as renderComponent, b as addAttribute, e as renderScript, F as Fragment, s as spreadAttributes, h as defineStyleVars, g as renderHead } from '../chunks/astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import { fileURLToPath } from 'node:url';
import { s as stripTrailingSlash, a as stripLeadingSlash, b as stripHtmlExtension, e as ensureHtmlExtension, c as ensureTrailingSlash, d as starlightConfig, f as slugToLocaleData, l as localizedSlug, g as localizedId, B as BuiltInDefaultLocale, h as slugToParam, i as ensureLeadingSlash, p as pickLang, j as localeToLang, k as stripLeadingAndTrailingSlashes, m as slugToPathname, u as useTranslations, $ as $$Icon, n as $$Badge } from '../chunks/Code_B4CevDhR.mjs';
import { basename, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { h as AstroUserError } from '../chunks/astro/assets-service_DX_s4nQ-.mjs';
import { g as getCollection } from '../chunks/_astro_content_Dpbg9Idg.mjs';
/* empty css                                 */
import 'clsx';
import * as z from 'zod';
import { $ as $$Image } from '../chunks/_astro_assets_Cru6olkC.mjs';
export { renderers } from '../renderers.mjs';

const project = {"build":{"format":"directory"},"root":"file:///Users/gg/iost/demo/YST_front/","srcDir":"file:///Users/gg/iost/demo/YST_front/src/","trailingSlash":"ignore"};

const PAGE_TITLE_ID = "_top";

function generateToC(headings, { minHeadingLevel, maxHeadingLevel, title }) {
  headings = headings.filter(({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel);
  const toc = [{ depth: 2, slug: PAGE_TITLE_ID, text: title, children: [] }];
  for (const heading of headings) injectChild(toc, { ...heading, children: [] });
  return toc;
}
function injectChild(items, item) {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    return injectChild(lastItem.children, item);
  }
}

function getNewestCommitDate(file) {
  const result = spawnSync("git", ["log", "--format=%ct", "--max-count=1", basename(file)], {
    cwd: dirname(file),
    encoding: "utf-8"
  });
  if (result.error) {
    throw new Error(`Failed to retrieve the git history for file "${file}"`);
  }
  const output = result.stdout.trim();
  const regex = /^(?<timestamp>\d+)$/;
  const match = output.match(regex);
  if (!match?.groups?.timestamp) {
    throw new Error(`Failed to validate the timestamp for file "${file}"`);
  }
  const timestamp = Number(match.groups.timestamp);
  const date = new Date(timestamp * 1e3);
  return date;
}

const base = stripTrailingSlash("/");
function pathWithBase(path) {
  path = stripLeadingSlash(path);
  return path ? base + "/" + path : base + "/";
}
function fileWithBase(path) {
  path = stripLeadingSlash(path);
  return path ? base + "/" + path : base;
}

const defaultFormatStrategy = {
  addBase: pathWithBase,
  handleExtension: (href) => stripHtmlExtension(href)
};
const formatStrategies = {
  file: {
    addBase: fileWithBase,
    handleExtension: (href) => ensureHtmlExtension(href)
  },
  directory: defaultFormatStrategy,
  preserve: defaultFormatStrategy
};
const trailingSlashStrategies = {
  always: ensureTrailingSlash,
  never: stripTrailingSlash,
  ignore: (href) => href
};
function formatPath$1(href, { format = "directory", trailingSlash = "ignore" }) {
  const formatStrategy = formatStrategies[format];
  const trailingSlashStrategy = trailingSlashStrategies[trailingSlash];
  href = formatStrategy.addBase(href);
  href = formatStrategy.handleExtension(href);
  if (format === "file") return href;
  href = href === "/" ? href : trailingSlashStrategy(href);
  return href;
}
function createPathFormatter(opts) {
  return (href) => formatPath$1(href, opts);
}

const formatPath = createPathFormatter({
  format: project.build.format,
  trailingSlash: project.trailingSlash
});

const logos = {};

function validateLogoImports() {
  if (starlightConfig.logo) {
    let err;
    if ("src" in starlightConfig.logo) {
      if (!logos.dark || !logos.light) {
        err = `Could not resolve logo import for "${starlightConfig.logo.src}" (logo.src)`;
      }
    } else {
      if (!logos.dark) {
        err = `Could not resolve logo import for "${starlightConfig.logo.dark}" (logo.dark)`;
      } else if (!logos.light) {
        err = `Could not resolve logo import for "${starlightConfig.logo.light}" (logo.light)`;
      }
    }
    if (err) throw new Error(err);
  }
}

validateLogoImports();
const normalizeIndexSlug = (slug) => slug === "index" ? "" : slug;
const docs = (await getCollection("docs", ({ data }) => {
  return data.draft === false;
}) ?? []).map(({ slug, ...entry }) => ({
  ...entry,
  slug: normalizeIndexSlug(slug)
}));
function getRoutes() {
  const routes2 = docs.map((entry) => ({
    entry,
    slug: entry.slug,
    id: entry.id,
    entryMeta: slugToLocaleData(entry.slug),
    ...slugToLocaleData(entry.slug)
  }));
  {
    const defaultLocaleDocs = getLocaleDocs(
      starlightConfig.defaultLocale?.locale === "root" ? void 0 : starlightConfig.defaultLocale?.locale
    );
    for (const key in starlightConfig.locales) {
      if (key === starlightConfig.defaultLocale.locale) continue;
      const localeConfig = starlightConfig.locales[key];
      if (!localeConfig) continue;
      const locale = key === "root" ? void 0 : key;
      const localeDocs = getLocaleDocs(locale);
      for (const fallback of defaultLocaleDocs) {
        const slug = localizedSlug(fallback.slug, locale);
        const id = localizedId(fallback.id, locale);
        const doesNotNeedFallback = localeDocs.some((doc) => doc.slug === slug);
        if (doesNotNeedFallback) continue;
        routes2.push({
          entry: fallback,
          slug,
          id,
          isFallback: true,
          lang: localeConfig.lang || BuiltInDefaultLocale.lang,
          locale,
          dir: localeConfig.dir,
          entryMeta: slugToLocaleData(fallback.slug)
        });
      }
    }
  }
  return routes2;
}
const routes = getRoutes();
function getPaths() {
  return routes.map((route) => ({
    params: { slug: slugToParam(route.slug) },
    props: route
  }));
}
const paths = getPaths();
function getLocaleRoutes(locale) {
  return filterByLocale(routes, locale);
}
function getLocaleDocs(locale) {
  return filterByLocale(docs, locale);
}
function filterByLocale(items, locale) {
  if (starlightConfig.locales) {
    if (locale && locale in starlightConfig.locales) {
      return items.filter((i) => i.slug === locale || i.slug.startsWith(locale + "/"));
    } else if (starlightConfig.locales.root) {
      const langKeys = Object.keys(starlightConfig.locales).filter((k) => k !== "root");
      const isLangIndex = new RegExp(`^(${langKeys.join("|")})$`);
      const isLangDir = new RegExp(`^(${langKeys.join("|")})/`);
      return items.filter((i) => !isLangIndex.test(i.slug) && !isLangDir.test(i.slug));
    }
  }
  return items;
}

const DirKey = Symbol("DirKey");
const SlugKey = Symbol("SlugKey");
function makeDir(slug) {
  const dir = {};
  Object.defineProperty(dir, DirKey, { enumerable: false });
  Object.defineProperty(dir, SlugKey, { value: slug, enumerable: false });
  return dir;
}
function isDir(data) {
  return DirKey in data;
}
function configItemToEntry(item, currentPathname, locale, routes2) {
  if ("link" in item) {
    return linkFromSidebarLinkItem(item, locale, currentPathname);
  } else if ("autogenerate" in item) {
    return groupFromAutogenerateConfig(item, locale, routes2, currentPathname);
  } else if ("slug" in item) {
    return linkFromInternalSidebarLinkItem(item, locale, currentPathname);
  } else {
    return {
      type: "group",
      label: pickLang(item.translations, localeToLang(locale)) || item.label,
      entries: item.items.map((i) => configItemToEntry(i, currentPathname, locale, routes2)),
      collapsed: item.collapsed,
      badge: item.badge
    };
  }
}
function groupFromAutogenerateConfig(item, locale, routes2, currentPathname) {
  const { collapsed: subgroupCollapsed, directory } = item.autogenerate;
  const localeDir = locale ? locale + "/" + directory : directory;
  const dirDocs = routes2.filter(
    (doc) => (
      // Match against `foo.md` or `foo/index.md`.
      stripExtension(doc.id) === localeDir || // Match against `foo/anything/else.md`.
      doc.id.startsWith(localeDir + "/")
    )
  );
  const tree = treeify(dirDocs, localeDir);
  return {
    type: "group",
    label: pickLang(item.translations, localeToLang(locale)) || item.label,
    entries: sidebarFromDir(tree, currentPathname, locale, subgroupCollapsed ?? item.collapsed),
    collapsed: item.collapsed,
    badge: item.badge
  };
}
const isAbsolute = (link) => /^https?:\/\//.test(link);
function linkFromSidebarLinkItem(item, locale, currentPathname) {
  let href = item.link;
  if (!isAbsolute(href)) {
    href = ensureLeadingSlash(href);
    if (locale) href = "/" + locale + href;
  }
  const label = pickLang(item.translations, localeToLang(locale)) || item.label;
  return makeSidebarLink(href, label, currentPathname, item.badge, item.attrs);
}
function linkFromInternalSidebarLinkItem(item, locale, currentPathname) {
  const slug = item.slug === "index" ? "" : item.slug;
  const localizedSlug = locale ? slug ? locale + "/" + slug : locale : slug;
  const entry = routes.find((entry2) => localizedSlug === entry2.slug);
  if (!entry) {
    const hasExternalSlashes = item.slug.at(0) === "/" || item.slug.at(-1) === "/";
    if (hasExternalSlashes) {
      throw new AstroUserError(
        `The slug \`"${item.slug}"\` specified in the Starlight sidebar config must not start or end with a slash.`,
        `Please try updating \`"${item.slug}"\` to \`"${stripLeadingAndTrailingSlashes(item.slug)}"\`.`
      );
    } else {
      throw new AstroUserError(
        `The slug \`"${item.slug}"\` specified in the Starlight sidebar config does not exist.`,
        "Update the Starlight config to reference a valid entry slug in the docs content collection.\nLearn more about Astro content collection slugs at https://docs.astro.build/en/reference/api-reference/#getentry"
      );
    }
  }
  const label = pickLang(item.translations, localeToLang(locale)) || item.label || entry.entry.data.title;
  return makeSidebarLink(entry.slug, label, currentPathname, item.badge, item.attrs);
}
function makeSidebarLink(href, label, currentPathname, badge, attrs) {
  if (!isAbsolute(href)) {
    href = formatPath(href);
  }
  const isCurrent = pathsMatch(encodeURI(href), currentPathname);
  return makeLink({ label, href, isCurrent, badge, attrs });
}
function makeLink({
  isCurrent = false,
  attrs = {},
  badge = void 0,
  ...opts
}) {
  return { type: "link", ...opts, badge, isCurrent, attrs };
}
function pathsMatch(pathA, pathB) {
  const format = createPathFormatter({ trailingSlash: "never" });
  return format(pathA) === format(pathB);
}
function getBreadcrumbs(path, baseDir) {
  const pathWithoutExt = stripExtension(path);
  if (pathWithoutExt === baseDir) return [];
  baseDir = ensureTrailingSlash(baseDir);
  const relativePath = pathWithoutExt.startsWith(baseDir) ? pathWithoutExt.replace(baseDir, "") : pathWithoutExt;
  return relativePath.split("/");
}
function treeify(routes2, baseDir) {
  const treeRoot = makeDir(baseDir);
  routes2.filter((doc) => !doc.entry.data.sidebar.hidden).sort((a, b) => b.id.split("/").length - a.id.split("/").length).forEach((doc) => {
    const parts = getBreadcrumbs(doc.id, baseDir);
    let currentNode = treeRoot;
    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1;
      if (isLeaf && currentNode.hasOwnProperty(part)) {
        currentNode = currentNode[part];
        part = "index";
      }
      if (!isLeaf) {
        const path = currentNode[SlugKey];
        currentNode[part] ||= makeDir(stripLeadingAndTrailingSlashes(path + "/" + part));
        currentNode = currentNode[part];
      } else {
        currentNode[part] = doc;
      }
    });
  });
  return treeRoot;
}
function linkFromRoute(route, currentPathname) {
  return makeSidebarLink(
    slugToPathname(route.slug),
    route.entry.data.sidebar.label || route.entry.data.title,
    currentPathname,
    route.entry.data.sidebar.badge,
    route.entry.data.sidebar.attrs
  );
}
function getOrder(routeOrDir) {
  return isDir(routeOrDir) ? Math.min(...Object.values(routeOrDir).flatMap(getOrder)) : (
    // If no order value is found, set it to the largest number possible.
    routeOrDir.entry.data.sidebar.order ?? Number.MAX_VALUE
  );
}
function sortDirEntries(dir) {
  const collator = new Intl.Collator(localeToLang(void 0));
  return dir.sort(([_keyA, a], [_keyB, b]) => {
    const [aOrder, bOrder] = [getOrder(a), getOrder(b)];
    if (aOrder !== bOrder) return aOrder < bOrder ? -1 : 1;
    return collator.compare(isDir(a) ? a[SlugKey] : a.slug, isDir(b) ? b[SlugKey] : b.slug);
  });
}
function groupFromDir(dir, fullPath, dirName, currentPathname, locale, collapsed) {
  const entries = sortDirEntries(Object.entries(dir)).map(
    ([key, dirOrRoute]) => dirToItem(dirOrRoute, `${fullPath}/${key}`, key, currentPathname, locale, collapsed)
  );
  return {
    type: "group",
    label: dirName,
    entries,
    collapsed,
    badge: void 0
  };
}
function dirToItem(dirOrRoute, fullPath, dirName, currentPathname, locale, collapsed) {
  return isDir(dirOrRoute) ? groupFromDir(dirOrRoute, fullPath, dirName, currentPathname, locale, collapsed) : linkFromRoute(dirOrRoute, currentPathname);
}
function sidebarFromDir(tree, currentPathname, locale, collapsed) {
  return sortDirEntries(Object.entries(tree)).map(
    ([key, dirOrRoute]) => dirToItem(dirOrRoute, key, key, currentPathname, locale, collapsed)
  );
}
function getSidebar(pathname, locale) {
  const routes2 = getLocaleRoutes(locale);
  if (starlightConfig.sidebar) {
    return starlightConfig.sidebar.map((group) => configItemToEntry(group, pathname, locale, routes2));
  } else {
    const tree = treeify(routes2, locale || "");
    return sidebarFromDir(tree, pathname, locale, false);
  }
}
function flattenSidebar(sidebar) {
  return sidebar.flatMap(
    (entry) => entry.type === "group" ? flattenSidebar(entry.entries) : entry
  );
}
function getPrevNextLinks(sidebar, paginationEnabled, config2) {
  const entries = flattenSidebar(sidebar);
  const currentIndex = entries.findIndex((entry) => entry.isCurrent);
  const prev = applyPrevNextLinkConfig(entries[currentIndex - 1], paginationEnabled, config2.prev);
  const next = applyPrevNextLinkConfig(
    currentIndex > -1 ? entries[currentIndex + 1] : void 0,
    paginationEnabled,
    config2.next
  );
  return { prev, next };
}
function applyPrevNextLinkConfig(link, paginationEnabled, config2) {
  if (config2 === false) return void 0;
  else if (config2 === true) return link;
  else if (typeof config2 === "string" && link) {
    return { ...link, label: config2 };
  } else if (typeof config2 === "object") {
    if (link) {
      return {
        ...link,
        label: config2.label ?? link.label,
        href: config2.link ?? link.href,
        // Explicitly remove sidebar link attributes for prev/next links.
        attrs: {}
      };
    } else if (config2.link && config2.label) {
      return makeLink({ href: config2.link, label: config2.label });
    }
  }
  return link ;
}
function stripExtension(path) {
  const periodIndex = path.lastIndexOf(".");
  return path.slice(0, periodIndex > -1 ? periodIndex : void 0);
}

function generateRouteData({
  props,
  url
}) {
  const { entry, locale, lang } = props;
  const sidebar = getSidebar(url.pathname, locale);
  const siteTitle = getSiteTitle(lang);
  return {
    ...props,
    siteTitle,
    siteTitleHref: getSiteTitleHref(locale),
    sidebar,
    hasSidebar: entry.data.template !== "splash",
    pagination: getPrevNextLinks(sidebar, starlightConfig.pagination, entry.data),
    toc: getToC(props),
    lastUpdated: getLastUpdated(props),
    editUrl: getEditUrl(props),
    labels: useTranslations(locale).all()
  };
}
function getToC({ entry, locale, headings }) {
  const tocConfig = entry.data.template === "splash" ? false : entry.data.tableOfContents !== void 0 ? entry.data.tableOfContents : starlightConfig.tableOfContents;
  if (!tocConfig) return;
  const t = useTranslations(locale);
  return {
    ...tocConfig,
    items: generateToC(headings, { ...tocConfig, title: t("tableOfContents.overview") })
  };
}
function getLastUpdated({ entry }) {
  const { lastUpdated: frontmatterLastUpdated } = entry.data;
  const { lastUpdated: configLastUpdated } = starlightConfig;
  if (frontmatterLastUpdated ?? configLastUpdated) {
    const currentFilePath = fileURLToPath(new URL("src/content/docs/" + entry.id, project.root));
    try {
      return frontmatterLastUpdated instanceof Date ? frontmatterLastUpdated : getNewestCommitDate(currentFilePath);
    } catch {
      return void 0;
    }
  }
  return void 0;
}
function getEditUrl({ entry, id, isFallback }) {
  const { editUrl } = entry.data;
  if (editUrl === false) return;
  let url;
  if (typeof editUrl === "string") {
    url = editUrl;
  } else if (starlightConfig.editLink.baseUrl) {
    const srcPath = project.srcDir.replace(project.root, "");
    const filePath = isFallback ? localizedId(id, starlightConfig.defaultLocale.locale) : id;
    url = ensureTrailingSlash(starlightConfig.editLink.baseUrl) + srcPath + "content/docs/" + filePath;
  }
  return url ? new URL(url) : void 0;
}
function getSiteTitle(lang) {
  const defaultLang = starlightConfig.defaultLocale.lang;
  if (lang && starlightConfig.title[lang]) {
    return starlightConfig.title[lang];
  }
  return starlightConfig.title[defaultLang];
}
function getSiteTitleHref(locale) {
  return formatPath(locale || "/");
}

const $$Astro$x = createAstro("https://screwfast.uk");
const $$Banner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Banner;
  const { banner } = Astro2.props.entry.data;
  return renderTemplate`${banner && renderTemplate`${maybeRenderHead()}<div class="sl-banner astro-laz2plt2">${unescapeHTML(banner.content)}</div>`}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Banner.astro", void 0);

const $$ContentPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="content-panel astro-7nkwcw3z"> <div class="sl-container astro-7nkwcw3z">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/ContentPanel.astro", void 0);

const $$Astro$w = createAstro("https://screwfast.uk");
const $$ContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$ContentNotice;
  const { icon, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p class="sl-flex astro-opzsrvew"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "size": "1.5em", "color": "var(--sl-color-orange-high)", "class": "astro-opzsrvew" })} <span class="astro-opzsrvew">${label}</span> </p> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/ContentNotice.astro", void 0);

const $$Astro$v = createAstro("https://screwfast.uk");
const $$FallbackContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$FallbackContentNotice;
  const { labels } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ContentNotice", $$ContentNotice, { "icon": "warning", "label": labels["i18n.untranslatedContent"] })}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/FallbackContentNotice.astro", void 0);

const $$Astro$u = createAstro("https://screwfast.uk");
const $$DraftContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$DraftContentNotice;
  const { labels } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ContentNotice", $$ContentNotice, { "icon": "warning", "label": labels["page.draft"] })}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/DraftContentNotice.astro", void 0);

const $$Astro$t = createAstro("https://screwfast.uk");
const $$EditLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$EditLink;
  const { editUrl, labels } = Astro2.props;
  return renderTemplate`${editUrl && renderTemplate`${maybeRenderHead()}<a${addAttribute(editUrl, "href")} class="sl-flex astro-eez2twj6">${renderComponent($$result, "Icon", $$Icon, { "name": "pencil", "size": "1.2em", "class": "astro-eez2twj6" })}${labels["page.editLink"]}</a>`}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/EditLink.astro", void 0);

const $$Astro$s = createAstro("https://screwfast.uk");
const $$LastUpdated = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$LastUpdated;
  const { labels, lang, lastUpdated } = Astro2.props;
  return renderTemplate`${lastUpdated && renderTemplate`${maybeRenderHead()}<p>${labels["page.lastUpdated"]}${" "}<time${addAttribute(lastUpdated.toISOString(), "datetime")}>${lastUpdated.toLocaleDateString(lang, { dateStyle: "medium", timeZone: "UTC" })}</time></p>`}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/LastUpdated.astro", void 0);

const $$Astro$r = createAstro("https://screwfast.uk");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { dir, labels, pagination } = Astro2.props;
  const { prev, next } = pagination;
  const isRtl = dir === "rtl";
  return renderTemplate`${maybeRenderHead()}<div class="pagination-links astro-u2l5gyhi"${addAttribute(dir, "dir")}> ${prev && renderTemplate`<a${addAttribute(prev.href, "href")} rel="prev" class="astro-u2l5gyhi"> ${renderComponent($$result, "Icon", $$Icon, { "name": isRtl ? "right-arrow" : "left-arrow", "size": "1.5rem", "class": "astro-u2l5gyhi" })} <span class="astro-u2l5gyhi"> ${labels["page.previousLink"]} <br class="astro-u2l5gyhi"> <span class="link-title astro-u2l5gyhi">${prev.label}</span> </span> </a>`} ${next && renderTemplate`<a${addAttribute(next.href, "href")} rel="next" class="astro-u2l5gyhi"> ${renderComponent($$result, "Icon", $$Icon, { "name": isRtl ? "left-arrow" : "right-arrow", "size": "1.5rem", "class": "astro-u2l5gyhi" })} <span class="astro-u2l5gyhi"> ${labels["page.nextLink"]} <br class="astro-u2l5gyhi"> <span class="link-title astro-u2l5gyhi">${next.label}</span> </span> </a>`} </div> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Pagination.astro", void 0);

const $$Astro$q = createAstro("https://screwfast.uk");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="sl-flex astro-3yyafb3n"> <div class="meta sl-flex astro-3yyafb3n"> ${renderComponent($$result, "EditLink", $$EditLink, { ...Astro2.props, "class": "astro-3yyafb3n" })} ${renderComponent($$result, "LastUpdated", $$LastUpdated, { ...Astro2.props, "class": "astro-3yyafb3n" })} </div> ${renderComponent($$result, "Pagination", $$Pagination, { ...Astro2.props, "class": "astro-3yyafb3n" })} ${starlightConfig.credits} </footer> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Footer.astro", void 0);

const version = "0.25.5";

const HeadConfigSchema = () => z.array(
  z.object({
    /** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
    tag: z.enum(["title", "base", "link", "style", "meta", "script", "noscript", "template"]),
    /** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
    attrs: z.record(z.union([z.string(), z.boolean(), z.undefined()])).default({}),
    /** Content to place inside the tag (optional). */
    content: z.string().default("")
  })
).default([]);

const HeadSchema = HeadConfigSchema();
function createHead(defaults, ...heads) {
  let head = HeadSchema.parse(defaults);
  for (const next of heads) {
    head = mergeHead(head, next);
  }
  return sortHead(head);
}
function hasTag(head, entry) {
  switch (entry.tag) {
    case "title":
      return head.some(({ tag }) => tag === "title");
    case "meta":
      return hasOneOf(head, entry, ["name", "property", "http-equiv"]);
    case "link":
      return head.some(({ attrs }) => attrs.rel === "canonical");
    default:
      return false;
  }
}
function hasOneOf(head, entry, keys) {
  const attr = getAttr(keys, entry);
  if (!attr) return false;
  const [key, val] = attr;
  return head.some(({ tag, attrs }) => tag === entry.tag && attrs[key] === val);
}
function getAttr(keys, entry) {
  let attr;
  for (const key of keys) {
    const val = entry.attrs[key];
    if (val) {
      attr = [key, val];
      break;
    }
  }
  return attr;
}
function mergeHead(oldHead, newHead) {
  return [...oldHead.filter((tag) => !hasTag(newHead, tag)), ...newHead];
}
function sortHead(head) {
  return head.sort((a, b) => {
    const aImportance = getImportance(a);
    const bImportance = getImportance(b);
    return aImportance > bImportance ? -1 : bImportance > aImportance ? 1 : 0;
  });
}
function getImportance(entry) {
  if (entry.tag === "meta" && ("charset" in entry.attrs || "http-equiv" in entry.attrs || entry.attrs.name === "viewport")) {
    return 100;
  }
  if (entry.tag === "title") return 90;
  if (entry.tag !== "meta") {
    if (entry.tag === "link" && "rel" in entry.attrs && entry.attrs.rel === "shortcut icon") {
      return 70;
    }
    return 80;
  }
  return 0;
}

function localizedUrl(url, locale) {
  url = new URL(url);
  if (!starlightConfig.locales) {
    return url;
  }
  if (locale === "root") locale = "";
  const base = stripTrailingSlash("/");
  const hasBase = url.pathname.startsWith(base);
  if (hasBase) url.pathname = url.pathname.replace(base, "");
  const [_leadingSlash, baseSegment] = url.pathname.split("/");
  const htmlExt = ".html";
  const isRootHtml = baseSegment?.endsWith(htmlExt);
  const baseSlug = isRootHtml ? baseSegment?.slice(0, -1 * htmlExt.length) : baseSegment;
  if (baseSlug && baseSlug in starlightConfig.locales) {
    if (locale) {
      url.pathname = url.pathname.replace(baseSlug, locale);
    } else if (isRootHtml) {
      url.pathname = "/index.html";
    } else {
      url.pathname = url.pathname.replace("/" + baseSlug, "");
    }
  } else if (locale) {
    if (baseSegment === "index.html") {
      url.pathname = "/" + locale + ".html";
    } else {
      url.pathname = "/" + locale + url.pathname;
    }
  }
  if (hasBase) url.pathname = base + url.pathname;
  return url;
}

const $$Astro$p = createAstro("https://screwfast.uk");
const $$Head$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Head$1;
  const { entry, lang, siteTitle } = Astro2.props;
  const { data } = entry;
  const canonical = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site) : void 0;
  const description = data.description || starlightConfig.description;
  const headDefaults = [
    { tag: "meta", attrs: { charset: "utf-8" } },
    {
      tag: "meta",
      attrs: { name: "viewport", content: "width=device-width, initial-scale=1" }
    },
    { tag: "title", content: `${data.title} ${starlightConfig.titleDelimiter} ${siteTitle}` },
    { tag: "link", attrs: { rel: "canonical", href: canonical?.href } },
    { tag: "meta", attrs: { name: "generator", content: Astro2.generator } },
    {
      tag: "meta",
      attrs: { name: "generator", content: `Starlight v${version}` }
    },
    // Favicon
    {
      tag: "link",
      attrs: {
        rel: "shortcut icon",
        href: fileWithBase(starlightConfig.favicon.href),
        type: starlightConfig.favicon.type
      }
    },
    // OpenGraph Tags
    { tag: "meta", attrs: { property: "og:title", content: data.title } },
    { tag: "meta", attrs: { property: "og:type", content: "article" } },
    { tag: "meta", attrs: { property: "og:url", content: canonical?.href } },
    { tag: "meta", attrs: { property: "og:locale", content: lang } },
    { tag: "meta", attrs: { property: "og:description", content: description } },
    { tag: "meta", attrs: { property: "og:site_name", content: siteTitle } },
    // Twitter Tags
    {
      tag: "meta",
      attrs: { name: "twitter:card", content: "summary_large_image" }
    }
  ];
  if (description)
    headDefaults.push({
      tag: "meta",
      attrs: { name: "description", content: description }
    });
  if (canonical && starlightConfig.isMultilingual) {
    for (const locale in starlightConfig.locales) {
      const localeOpts = starlightConfig.locales[locale];
      if (!localeOpts) continue;
      headDefaults.push({
        tag: "link",
        attrs: {
          rel: "alternate",
          hreflang: localeOpts.lang,
          href: localizedUrl(canonical, locale).href
        }
      });
    }
  }
  if (Astro2.site) {
    headDefaults.push({
      tag: "link",
      attrs: {
        rel: "sitemap",
        href: fileWithBase("/sitemap-index.xml")
      }
    });
  }
  if (starlightConfig.social?.twitter) {
    headDefaults.push({
      tag: "meta",
      attrs: {
        name: "twitter:site",
        content: new URL(starlightConfig.social.twitter.url).pathname
      }
    });
  }
  const head = createHead(headDefaults, starlightConfig.head, data.head);
  return renderTemplate`${head.map(({ tag: Tag, attrs, content }) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs }, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`)}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Head.astro", void 0);

const $$Astro$o = createAstro("https://screwfast.uk");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/astro/components/ViewTransitions.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$n = createAstro("https://screwfast.uk");
const $$ReplacementSwap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$ReplacementSwap;
  const { rootAttributesToPreserve = "" } = Astro2.props;
  return renderTemplate`<meta name="vtbot-replace-swap"${addAttribute(rootAttributesToPreserve, "content")}>${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/astro-vtbot/components/ReplacementSwap.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/astro-vtbot/components/ReplacementSwap.astro", void 0);

const $$StarlightConnector = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/astro-vtbot/components/starlight/StarlightConnector.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/astro-vtbot/components/starlight/StarlightConnector.astro", void 0);

const $$Astro$m = createAstro("https://screwfast.uk");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    viewTransitionsFallback,
    replaceSidebarContent,
    retainCurrentPageMarker,
    "data-astro-transition-scope": mainTransitionScope
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "fallback": viewTransitionsFallback })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "ReplacementSwap", $$ReplacementSwap, { "rootAttributesToPreserve": "data-theme" })} ${mainTransitionScope && renderTemplate`<meta name="vtbot-main-transition-scope"${addAttribute(mainTransitionScope, "content")}>`} ${replaceSidebarContent && renderTemplate`<meta name="vtbot-starlight-replace-sidebar-content" content="true">`} ${retainCurrentPageMarker && renderTemplate`<meta name="vtbot-starlight-retain-current-page-marker" content="true">`} ${renderComponent($$result, "StarlightConnector", $$StarlightConnector, {})}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/astro-vtbot/components/starlight/Base.astro", void 0);

const $$Astro$l = createAstro("https://screwfast.uk");
const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Head;
  Astro2.props.viewTransitionsFallback = "animate";
  return renderTemplate`${renderComponent($$result, "VtbotStarlight", $$Base, { ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "StarlightHead", $$Head$1, { ...Astro2.props })} ` })} `;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/Head.astro", void 0);

const $$Astro$k = createAstro("https://screwfast.uk");
const $$Select = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Select;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(`--sl-select-width: ${Astro2.props.width}`, "style")} class="astro-4yphtoen"> <span class="sr-only astro-4yphtoen">${Astro2.props.label}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": Astro2.props.icon, "class": "icon label-icon astro-4yphtoen" })} <select${addAttribute(Astro2.props.value, "value")} class="astro-4yphtoen"> ${Astro2.props.options.map(({ value, selected, label }) => renderTemplate`<option${addAttribute(value, "value")}${addAttribute(selected, "selected")} class="astro-4yphtoen">${unescapeHTML(label)}</option>`)} </select> ${renderComponent($$result, "Icon", $$Icon, { "name": "down-caret", "class": "icon caret astro-4yphtoen" })} </label> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Select.astro", void 0);

const $$Astro$j = createAstro("https://screwfast.uk");
const $$LanguageSelect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$LanguageSelect;
  function localizedPathname(locale) {
    return localizedUrl(Astro2.url, locale).pathname;
  }
  const { labels } = Astro2.props;
  return renderTemplate`${renderTemplate`${renderComponent($$result, "starlight-lang-select", "starlight-lang-select", {}, { "default": () => renderTemplate`${renderComponent($$result, "Select", $$Select, { "icon": "translate", "label": labels["languageSelect.accessibleLabel"], "value": localizedPathname(Astro2.props.locale), "options": Object.entries(starlightConfig.locales).map(([code, locale]) => ({
    value: localizedPathname(code),
    selected: code === Astro2.props.locale,
    label: locale.label
  })), "width": "7em" })}` })}`}${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/LanguageSelect.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/LanguageSelect.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$i = createAstro("https://screwfast.uk");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Search;
  const { labels } = Astro2.props;
  const pagefindTranslations = {
    placeholder: labels["search.label"],
    ...Object.fromEntries(
      Object.entries(labels).filter(([key]) => key.startsWith("pagefind.")).map(([key, value]) => [key.replace("pagefind.", ""), value])
    )
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "  <script>\n	(() => {\n		const openBtn = document.querySelector('button[data-open-modal]');\n		const shortcut = openBtn?.querySelector('kbd');\n		if (!openBtn || !(shortcut instanceof HTMLElement)) return;\n		const platformKey = shortcut.querySelector('kbd');\n		if (platformKey && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {\n			platformKey.textContent = '⌘';\n			openBtn.setAttribute('aria-keyshortcuts', 'Meta+K');\n		}\n		shortcut.style.display = '';\n	})();\n</script> ", "  "])), renderComponent($$result, "site-search", "site-search", { "data-translations": JSON.stringify(pagefindTranslations), "data-strip-trailing-slash": project.trailingSlash === "never", "class": "astro-v37mnknz" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-open-modal disabled${addAttribute(labels["search.label"], "aria-label")} aria-keyshortcuts="Control+K" class="astro-v37mnknz"> ${renderComponent($$result, "Icon", $$Icon, { "name": "magnifier", "class": "astro-v37mnknz" })} <span class="sl-hidden md:sl-block astro-v37mnknz" aria-hidden="true">${labels["search.label"]}</span> <kbd class="sl-hidden md:sl-flex astro-v37mnknz" style="display: none;"> <kbd class="astro-v37mnknz">${labels["search.ctrlKey"]}</kbd><kbd class="astro-v37mnknz">K</kbd> </kbd> </button> <dialog style="padding:0"${addAttribute(labels["search.label"], "aria-label")} class="astro-v37mnknz"> <div class="dialog-frame sl-flex astro-v37mnknz">  <button data-close-modal class="sl-flex md:sl-hidden astro-v37mnknz"> ${labels["search.cancelLabel"]} </button> ${renderTemplate`<div class="search-container astro-v37mnknz"> <div id="starlight__search" class="astro-v37mnknz"></div> </div>`} </div> </dialog> ` }), renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Search.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Search.astro", void 0);

const mainLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 521 226\" width=\"521\" height=\"226\" style=\"height: 2.5rem;\" fill=\"none\">\n  <rect width=\"78.937\" height=\"18.485\" x=\"269\" y=\"154.911\" fill=\"#eab308\" rx=\"9.242\" transform=\"rotate(-43.075 269 154.911)\" class=\"main-logo-screw-svg\"/>\n  <rect width=\"78.937\" height=\"18.485\" x=\"319\" y=\"154.911\" fill=\"#eab308\" rx=\"9.242\" transform=\"rotate(-43.075 319 154.911)\" class=\"main-logo-screw-svg\"/>\n  <rect width=\"78.937\" height=\"18.485\" x=\"369.285\" y=\"154.911\" fill=\"#eab308\" rx=\"9.242\" transform=\"rotate(-43.075 369.285 154.911)\" class=\"main-logo-screw-svg\"/>\n  <rect width=\"28.464\" height=\"18.485\" x=\"419.57\" y=\"154.911\" fill=\"#eab308\" rx=\"9.242\" transform=\"rotate(-43.075 419.57 154.911)\" class=\"main-logo-screw-svg\"/>\n  <path fill=\"#eab308\" class=\"main-logo-screw-svg\" d=\"M499.804 128.068c7.03 2.636 6.885 12.63-.219 15.061l-18.951 6.483c-5.238 1.792-10.669-2.15-10.589-7.686l.196-13.514c.081-5.535 5.624-9.318 10.808-7.374l18.755 7.03Z\"/>\n  <path fill=\"#404040\" class=\"main-logo-svg\" d=\"M141.808 83.584c.171 5.803-1.024 10.837-3.584 15.104-5.717 9.387-15.701 14.336-29.952 14.848-6.485.256-13.61-1.323-21.376-4.736l.256-19.328c1.28 1.024 2.944 2.219 4.992 3.584 3.67 2.475 7.808 3.712 12.416 3.712 12.203 0 18.304-4.352 18.304-13.056v-.256c0-4.01-2.219-7.296-6.656-9.856-2.389-1.365-6.827-2.987-13.312-4.864a137.675 137.675 0 0 1-8.32-2.816c-10.496-5.888-15.744-14.421-15.744-25.6v-.768c0-5.12 1.408-9.899 4.224-14.336 2.816-4.523 6.528-8.021 11.136-10.496 4.693-2.56 9.728-3.925 15.104-4.096 7.253-.17 14.08 1.195 20.48 4.096v18.304c-4.693-4.096-10.88-6.144-18.56-6.144-2.816 0-5.419.725-7.808 2.176-3.67 2.219-5.504 5.461-5.504 9.728 0 5.803 4.267 9.984 12.8 12.544 1.536.512 4.565 1.45 9.088 2.816 7.68 2.304 13.184 5.76 16.512 10.368 3.413 4.608 5.248 10.965 5.504 19.072Zm66.758 20.736c-6.656 6.4-14.549 9.6-23.68 9.6-9.643 0-17.792-3.285-24.448-9.856-6.571-6.656-9.856-14.805-9.856-24.448 0-9.557 3.328-17.621 9.984-24.192 6.656-6.656 14.763-9.984 24.32-9.984 8.704 0 16.299 2.944 22.784 8.832l-10.368 13.952c-3.328-3.67-7.467-5.504-12.416-5.504-4.693 0-8.704 1.664-12.032 4.992-3.328 3.243-4.992 7.21-4.992 11.904 0 4.693 1.664 8.704 4.992 12.032 3.328 3.328 7.339 4.992 12.032 4.992 5.12 0 9.344-1.963 12.672-5.888l11.008 13.568Zm42.82-41.6c-4.693 0-8.704 1.664-12.032 4.992-3.328 3.243-4.992 7.21-4.992 11.904V112h-17.28V79.616c0-9.557 3.328-17.621 9.984-24.192 6.656-6.656 14.763-9.984 24.32-9.984v17.28Zm77.051 16.896a34.47 34.47 0 0 1-.384 5.12h-50.048c1.109 3.584 3.157 6.485 6.144 8.704 2.987 2.133 6.357 3.2 10.112 3.2 5.205 0 9.515-2.005 12.928-6.016l10.496 13.952c-6.571 6.229-14.379 9.344-23.424 9.344-9.643 0-17.792-3.285-24.448-9.856-6.571-6.656-9.856-14.805-9.856-24.448 0-9.557 3.328-17.621 9.984-24.192 6.656-6.656 14.763-9.984 24.32-9.984s17.621 3.328 24.192 9.984c6.656 6.57 9.984 14.635 9.984 24.192Zm-19.328-7.808c-3.157-6.059-8.107-9.088-14.848-9.088-6.827 0-11.819 3.03-14.976 9.088h29.824Zm145.596 7.936c0 9.643-3.328 17.792-9.984 24.448-6.571 6.571-14.677 9.856-24.32 9.856-9.472 0-17.579-3.413-24.32-10.24-6.741 6.827-14.848 10.24-24.32 10.24-9.643 0-17.792-3.285-24.448-9.856-6.571-6.656-9.856-14.805-9.856-24.448V45.568h17.28v34.176c0 4.693 1.664 8.704 4.992 12.032 3.328 3.328 7.339 4.992 12.032 4.992s8.661-1.664 11.904-4.992c3.328-3.328 4.992-7.339 4.992-12.032l.128-34.176h17.28v43.008h-.128c3.328 5.461 8.149 8.192 14.464 8.192 4.693 0 8.661-1.664 11.904-4.992 3.328-3.328 4.992-7.339 4.992-12.032l.128-34.176h17.28v34.176Z\"/>\n  <path fill=\"#404040\" class=\"main-logo-svg\" d=\"M56.064 163.616H26.24V212H8.832V110.624h47.232v14.848H26.24v20.096h29.824v18.048ZM147.389 212h-18.304l-3.712-9.984c-6.827 8.021-15.531 12.032-26.112 12.032-9.557 0-17.664-3.328-24.32-9.984-6.57-6.656-9.856-14.72-9.856-24.192 0-7.253 2.048-13.781 6.144-19.584 4.096-5.888 9.557-10.069 16.384-12.544 4.01-1.451 7.936-2.176 11.776-2.176 7.253 0 13.781 2.091 19.584 6.272 5.888 4.096 10.069 9.557 12.544 16.384L147.389 212Zm-31.104-32.128c0-5.973-2.432-10.624-7.296-13.952-2.816-1.963-6.059-2.944-9.728-2.944-5.973 0-10.581 2.389-13.824 7.168-2.048 2.987-3.072 6.229-3.072 9.728 0 5.888 2.432 10.496 7.296 13.824 2.987 2.048 6.187 3.072 9.6 3.072 4.693 0 8.704-1.621 12.032-4.864 3.328-3.328 4.992-7.339 4.992-12.032Zm92.015 12.544c0 4.096-1.365 7.808-4.096 11.136-5.461 6.656-13.227 9.856-23.296 9.6-4.011-.085-8.405-.981-13.184-2.688-4.693-1.707-8.533-3.84-11.52-6.4l9.6-12.416c4.608 4.352 9.515 6.528 14.72 6.528h.384c2.133 0 4.053-.384 5.76-1.152 2.219-1.024 3.328-2.475 3.328-4.352v-.512c-.256-1.963-1.579-3.371-3.968-4.224-.939-.171-2.944-.555-6.016-1.152-3.84-.768-7.083-1.707-9.728-2.816-7.765-3.328-11.648-9.173-11.648-17.536 0-8.021 3.968-14.037 11.904-18.048 3.499-1.792 7.296-2.731 11.392-2.816 4.267-.085 8.704.64 13.312 2.176 5.291 1.792 9.045 4.139 11.264 7.04l-11.52 10.368c-2.987-2.987-6.229-4.48-9.728-4.48-5.461 0-8.192 1.792-8.192 5.376v.256c0 1.707 2.219 3.157 6.656 4.352.341.085 3.157.64 8.448 1.664 10.752 2.048 16.128 8.619 16.128 19.712v.384ZM251.511 212c-9.557 0-17.664-3.285-24.32-9.856-6.656-6.656-9.984-14.763-9.984-24.32v-67.2h17.28v34.944h17.024v14.72h-17.024v17.536c0 4.693 1.664 8.704 4.992 12.032 3.328 3.243 7.339 4.864 12.032 4.864V212Z\"/>\n  <style>\n    [data-theme=\"dark\"] .main-logo-svg {\n      fill: #d4d4d4;\n    }\n    [data-theme=\"dark\"] .main-logo-screw-svg {\n      fill: #facc15;\n    }\n</style>\n</svg>\n";

const docsLogo = "<svg viewBox=\"0 0 275 104\" width=\"275\" height=\"104\" fill=\"none\" style=\"height: 1.5rem; margin-bottom: 0.2rem;\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M69.312 69.616C69.312 79.1733 65.984 87.28 59.328 93.936C52.7573 100.592 44.6933 103.92 35.136 103.92C25.4933 103.92 17.344 100.635 10.688 94.064C4.11733 87.408 0.832001 79.2587 0.832001 69.616C0.832001 60.0587 4.16 51.9947 10.816 45.424C17.472 38.768 25.5787 35.44 35.136 35.44C41.1947 35.44 46.8267 36.9333 52.032 39.92V0.623993H69.312V69.616ZM52.032 69.616C52.032 65.008 50.368 61.04 47.04 57.712C43.712 54.384 39.744 52.72 35.136 52.72C30.4427 52.72 26.432 54.384 23.104 57.712C19.776 60.9547 18.112 64.9227 18.112 69.616C18.112 74.3093 19.776 78.32 23.104 81.648C26.432 84.976 30.4427 86.64 35.136 86.64C39.8293 86.64 43.7973 84.976 47.04 81.648C50.368 78.32 52.032 74.3093 52.032 69.616ZM146.562 69.616C146.562 79.1733 143.234 87.28 136.578 93.936C130.007 100.592 121.943 103.92 112.386 103.92C102.743 103.92 94.594 100.635 87.938 94.064C81.3673 87.408 78.082 79.2587 78.082 69.616C78.082 60.0587 81.41 51.9947 88.066 45.424C94.722 38.768 102.829 35.44 112.386 35.44C121.943 35.44 130.007 38.768 136.578 45.424C143.234 51.9947 146.562 60.0587 146.562 69.616ZM129.282 69.616C129.282 65.008 127.618 61.04 124.29 57.712C120.962 54.384 116.994 52.72 112.386 52.72C107.693 52.72 103.682 54.384 100.354 57.712C97.026 60.9547 95.362 64.9227 95.362 69.616C95.362 74.3093 97.026 78.32 100.354 81.648C103.682 84.976 107.693 86.64 112.386 86.64C117.079 86.64 121.047 84.976 124.29 81.648C127.618 78.32 129.282 74.3093 129.282 69.616ZM213.566 94.32C206.91 100.72 199.017 103.92 189.886 103.92C180.243 103.92 172.094 100.635 165.438 94.064C158.867 87.408 155.582 79.2587 155.582 69.616C155.582 60.0587 158.91 51.9947 165.566 45.424C172.222 38.768 180.329 35.44 189.886 35.44C198.59 35.44 206.185 38.384 212.67 44.272L202.302 58.224C198.974 54.5547 194.835 52.72 189.886 52.72C185.193 52.72 181.182 54.384 177.854 57.712C174.526 60.9547 172.862 64.9227 172.862 69.616C172.862 74.3093 174.526 78.32 177.854 81.648C181.182 84.976 185.193 86.64 189.886 86.64C195.006 86.64 199.23 84.6773 202.558 80.752L213.566 94.32ZM274.05 82.416C274.05 86.512 272.685 90.224 269.954 93.552C264.493 100.208 256.727 103.408 246.658 103.152C242.647 103.067 238.253 102.171 233.474 100.464C228.781 98.7573 224.941 96.624 221.954 94.064L231.554 81.648C236.162 86 241.069 88.176 246.274 88.176H246.658C248.791 88.176 250.711 87.792 252.418 87.024C254.637 86 255.746 84.5493 255.746 82.672V82.16C255.49 80.1973 254.167 78.7893 251.778 77.936C250.839 77.7653 248.834 77.3813 245.762 76.784C241.922 76.016 238.679 75.0773 236.034 73.968C228.269 70.64 224.386 64.7947 224.386 56.432C224.386 48.4107 228.354 42.3947 236.29 38.384C239.789 36.592 243.586 35.6533 247.682 35.568C251.949 35.4827 256.386 36.208 260.994 37.744C266.285 39.536 270.039 41.8827 272.258 44.784L260.738 55.152C257.751 52.1653 254.509 50.672 251.01 50.672C245.549 50.672 242.818 52.464 242.818 56.048V56.304C242.818 58.0107 245.037 59.4613 249.474 60.656C249.815 60.7413 252.631 61.296 257.922 62.32C268.674 64.368 274.05 70.9387 274.05 82.032V82.416Z\" class=\"docs-logo-svg\" fill=\"#404040\"/>\n<style>\n    [data-theme=\"dark\"] .docs-logo-svg {\n      fill: #d4d4d4;\n    }\n</style>\n</svg>\n";

const $$Astro$h = createAstro("https://screwfast.uk");
const $$SiteTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$SiteTitle;
  const main = "/";
  const locale = Astro2.props.locale ? Astro2.props.locale + "/" : "";
  const docs = "/" + locale + "welcome-to-docs/";
  return renderTemplate`${maybeRenderHead()}<span class="site-title flex astro-cdy74xqe"> <a class="main-logo astro-cdy74xqe"${addAttribute(main, "href")} aria-label="ScrewFast">${unescapeHTML(mainLogo)}</a> <a class="docs-logo astro-cdy74xqe"${addAttribute(docs, "href")} aria-label="ScrewFast Docs">${unescapeHTML(docsLogo)}</a> </span> `;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/SiteTitle.astro", void 0);

const $$SocialIcons = createComponent(($$result, $$props, $$slots) => {
  const links = Object.entries(starlightConfig.social || {});
  return renderTemplate`${links.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-wy4te6ga" }, { "default": ($$result2) => renderTemplate`${links.map(([platform, { label, url }]) => renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} rel="me" class="sl-flex astro-wy4te6ga"><span class="sr-only astro-wy4te6ga">${label}</span>${renderComponent($$result2, "Icon", $$Icon, { "name": platform, "class": "astro-wy4te6ga" })}</a>`)}` })}`}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/SocialIcons.astro", void 0);

const $$ThemeSelect = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Dark Theme Toggle Button -->${maybeRenderHead()}<button type="button" aria-label="Dark Theme Toggle" id="dark-theme-toggle" class="group flex h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-200 hover:text-orange-400" data-hs-theme-click-value="dark"> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path> </svg> </button> <!-- Light Theme Toggle Button --> <button type="button" aria-label="Light Theme Toggle" id="light-theme-toggle" class="group flex hidden h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-400 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-700 hover:text-orange-400" data-hs-theme-click-value="light"> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="4"></circle> <path d="M12 8a2 2 0 1 0 4 4"></path> <path d="M12 2v2"></path> <path d="M12 20v2"></path> <path d="m4.93 4.93 1.41 1.41"></path> <path d="m17.66 17.66 1.41 1.41"></path> <path d="M2 12h2"></path> <path d="M20 12h2"></path> <path d="m6.34 17.66-1.41 1.41"></path> <path d="m19.07 4.93-1.41 1.41"></path> </svg> </button> ${renderScript($$result, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/ThemeSelect.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/ThemeSelect.astro", void 0);

const $$Astro$g = createAstro("https://screwfast.uk");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<div class="header sl-flex astro-kmkmnagf"> <div class="title-wrapper sl-flex astro-kmkmnagf"> ${renderComponent($$result, "SiteTitle", $$SiteTitle, { ...Astro2.props, "class": "astro-kmkmnagf" })} </div> <div class="sl-flex astro-kmkmnagf"> ${renderTemplate`${renderComponent($$result, "Search", $$Search, { ...Astro2.props, "class": "astro-kmkmnagf" })}`} </div> <div class="sl-hidden md:sl-flex right-group astro-kmkmnagf"> <div class="sl-flex social-icons astro-kmkmnagf"> ${renderComponent($$result, "SocialIcons", $$SocialIcons, { ...Astro2.props, "class": "astro-kmkmnagf" })} </div> ${renderComponent($$result, "ThemeSelect", $$ThemeSelect, { ...Astro2.props, "class": "astro-kmkmnagf" })} ${renderComponent($$result, "LanguageSelect", $$LanguageSelect, { ...Astro2.props, "class": "astro-kmkmnagf" })} </div> </div> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Header.astro", void 0);

const $$Astro$f = createAstro("https://screwfast.uk");
const $$CallToAction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$CallToAction;
  const { link, variant, icon } = Astro2.props;
  const { class: customClass, ...attrs } = Astro2.props.attrs || {};
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([["sl-flex action", variant, customClass], "astro-yjy4zhro"], "class:list")}${addAttribute(link, "href")}${spreadAttributes(attrs)}> ${renderSlot($$result, $$slots["default"])} ${icon?.type === "icon" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon.name, "size": "1.5rem", "class": "astro-yjy4zhro" })}`} ${icon?.type === "raw" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(icon.html)}` })}`} </a> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/CallToAction.astro", void 0);

const $$Astro$e = createAstro("https://screwfast.uk");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Hero;
  const { data } = Astro2.props.entry;
  const { title = data.title, tagline, image, actions = [] } = data.hero || {};
  const imageAttrs = {
    loading: "eager",
    decoding: "async",
    width: 400,
    height: 400,
    alt: image?.alt || ""
  };
  let darkImage;
  let lightImage;
  let rawHtml;
  if (image) {
    if ("file" in image) {
      darkImage = image.file;
    } else if ("dark" in image) {
      darkImage = image.dark;
      lightImage = image.light;
    } else {
      rawHtml = image.html;
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="hero astro-jbfsktt5"> ${darkImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": darkImage, ...imageAttrs, "class:list": [{ "light:sl-hidden": Boolean(lightImage) }, "astro-jbfsktt5"] })}`} ${lightImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": lightImage, ...imageAttrs, "class": "dark:sl-hidden astro-jbfsktt5" })}`} ${rawHtml && renderTemplate`<div class="hero-html sl-flex astro-jbfsktt5">${unescapeHTML(rawHtml)}</div>`} <div class="sl-flex stack astro-jbfsktt5"> <div class="sl-flex copy astro-jbfsktt5"> <h1${addAttribute(PAGE_TITLE_ID, "id")} data-page-title class="astro-jbfsktt5">${unescapeHTML(title)}</h1> ${tagline && renderTemplate`<div class="tagline astro-jbfsktt5">${unescapeHTML(tagline)}</div>`} </div> ${actions.length > 0 && renderTemplate`<div class="sl-flex actions astro-jbfsktt5"> ${actions.map(({ text, ...attrs }) => renderTemplate`${renderComponent($$result, "CallToAction", $$CallToAction, { ...attrs, "class": "astro-jbfsktt5" }, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}`)} </div>`} </div> </div> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Hero.astro", void 0);

const $$MarkdownContent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="sl-markdown-content">${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/MarkdownContent.astro", void 0);

const $$Astro$d = createAstro("https://screwfast.uk");
const $$MobileMenuToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$MobileMenuToggle;
  const { labels } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "starlight-menu-button", "starlight-menu-button", { "class": "astro-jif73yzw" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button aria-expanded="false"${addAttribute(labels["menuButton.accessibleLabel"], "aria-label")} aria-controls="starlight__sidebar" class="sl-flex md:sl-hidden astro-jif73yzw"> ${renderComponent($$result, "Icon", $$Icon, { "name": "bars", "class": "astro-jif73yzw" })} </button> ` })} ${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/MobileMenuToggle.astro?astro&type=script&index=0&lang.ts")}  `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/MobileMenuToggle.astro", void 0);

const $$Astro$c = createAstro("https://screwfast.uk");
const $$PageFrame = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$PageFrame;
  const { hasSidebar, labels } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="page sl-flex astro-vrdttmbt"> <header class="header astro-vrdttmbt">${renderSlot($$result, $$slots["header"])}</header> ${hasSidebar && renderTemplate`<nav class="sidebar astro-vrdttmbt"${addAttribute(labels["sidebarNav.accessibleLabel"], "aria-label")}> ${renderComponent($$result, "MobileMenuToggle", $$MobileMenuToggle, { ...Astro2.props, "class": "astro-vrdttmbt" })} <div id="starlight__sidebar" class="sidebar-pane astro-vrdttmbt"> <div class="sidebar-content sl-flex astro-vrdttmbt"> ${renderSlot($$result, $$slots["sidebar"])} </div> </div> </nav>`} <div class="main-frame astro-vrdttmbt">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/PageFrame.astro", void 0);

const $$Astro$b = createAstro("https://screwfast.uk");
const $$TableOfContentsList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$TableOfContentsList;
  const { toc, isMobile = false, depth = 0 } = Astro2.props;
  const $$definedVars = defineStyleVars([{ depth }]);
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([{ isMobile }, "astro-g2bywc46"], "class:list")}${addAttribute($$definedVars, "style")}> ${toc.map((heading) => renderTemplate`<li class="astro-g2bywc46"${addAttribute($$definedVars, "style")}> <a${addAttribute("#" + heading.slug, "href")} class="astro-g2bywc46"${addAttribute($$definedVars, "style")}> <span class="astro-g2bywc46"${addAttribute($$definedVars, "style")}>${heading.text}</span> </a> ${heading.children.length > 0 && renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, { "toc": heading.children, "depth": depth + 1, "isMobile": isMobile, "class": "astro-g2bywc46" })}`} </li>`)} </ul> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/TableOfContents/TableOfContentsList.astro", void 0);

const $$Astro$a = createAstro("https://screwfast.uk");
const $$MobileTableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$MobileTableOfContents;
  const { labels, toc } = Astro2.props;
  return renderTemplate`${toc && renderTemplate`${renderComponent($$result, "mobile-starlight-toc", "mobile-starlight-toc", { "data-min-h": toc.minHeadingLevel, "data-max-h": toc.maxHeadingLevel, "class": "astro-doynk5tl" }, { "default": () => renderTemplate`${maybeRenderHead()}<nav aria-labelledby="starlight__on-this-page--mobile" class="astro-doynk5tl"><details id="starlight__mobile-toc" class="astro-doynk5tl"><summary id="starlight__on-this-page--mobile" class="sl-flex astro-doynk5tl"><div class="toggle sl-flex astro-doynk5tl">${labels["tableOfContents.onThisPage"]}${renderComponent($$result, "Icon", $$Icon, { "name": "right-caret", "class": "caret astro-doynk5tl", "size": "1rem" })}</div><span class="display-current astro-doynk5tl"></span></summary><div class="dropdown astro-doynk5tl">${renderComponent($$result, "TableOfContentsList", $$TableOfContentsList, { "toc": toc.items, "isMobile": true, "class": "astro-doynk5tl" })}</div></details></nav>` })}`}${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/MobileTableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/MobileTableOfContents.astro", void 0);

const $$Astro$9 = createAstro("https://screwfast.uk");
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { labels, toc } = Astro2.props;
  return renderTemplate`${toc && renderTemplate`${renderComponent($$result, "starlight-toc", "starlight-toc", { "data-min-h": toc.minHeadingLevel, "data-max-h": toc.maxHeadingLevel }, { "default": () => renderTemplate`${maybeRenderHead()}<nav aria-labelledby="starlight__on-this-page"><h2 id="starlight__on-this-page">${labels["tableOfContents.onThisPage"]}</h2>${renderComponent($$result, "TableOfContentsList", $$TableOfContentsList, { "toc": toc.items })}</nav>` })}`}${renderScript($$result, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/TableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/TableOfContents.astro", void 0);

const $$Astro$8 = createAstro("https://screwfast.uk");
const $$PageSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$PageSidebar;
  return renderTemplate`${Astro2.props.toc && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-pb3aqygn" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="lg:sl-hidden astro-pb3aqygn">${renderComponent($$result2, "MobileTableOfContents", $$MobileTableOfContents, { ...Astro2.props, "class": "astro-pb3aqygn" })}</div><div class="right-sidebar-panel sl-hidden lg:sl-block astro-pb3aqygn"><div class="sl-container astro-pb3aqygn">${renderComponent($$result2, "TableOfContents", $$TableOfContents, { ...Astro2.props, "class": "astro-pb3aqygn" })}</div></div>` })}`}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/PageSidebar.astro", void 0);

const $$Astro$7 = createAstro("https://screwfast.uk");
const $$PageTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$PageTitle;
  return renderTemplate`${maybeRenderHead()}<h1${addAttribute(PAGE_TITLE_ID, "id")} class="astro-j6tvhyss">${Astro2.props.entry.data.title}</h1> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/PageTitle.astro", void 0);

const $$ThemeSelectMobile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Dark Theme Toggle Button -->${maybeRenderHead()}<button type="button" aria-label="Dark Theme Toggle" id="dark-theme-toggle-mobile" class="group flex h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-200 hover:text-orange-400" data-hs-theme-click-value="dark"> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path> </svg> </button> <!-- Light Theme Toggle Button --> <button type="button" aria-label="Light Theme Toggle" id="light-theme-toggle-mobile" class="group flex hidden h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-400 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-700 hover:text-orange-400" data-hs-theme-click-value="light"> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="4"></circle> <path d="M12 8a2 2 0 1 0 4 4"></path> <path d="M12 2v2"></path> <path d="M12 20v2"></path> <path d="m4.93 4.93 1.41 1.41"></path> <path d="m17.66 17.66 1.41 1.41"></path> <path d="M2 12h2"></path> <path d="M20 12h2"></path> <path d="m6.34 17.66-1.41 1.41"></path> <path d="m19.07 4.93-1.41 1.41"></path> </svg> </button> ${renderScript($$result, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/ThemeSelectMobile.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/ThemeSelectMobile.astro", void 0);

const $$Astro$6 = createAstro("https://screwfast.uk");
const $$MobileMenuFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MobileMenuFooter;
  return renderTemplate`${maybeRenderHead()}<div class="mobile-preferences sl-flex astro-5znlxet7"> <div class="sl-flex social-icons astro-5znlxet7"> ${renderComponent($$result, "SocialIcons", $$SocialIcons, { ...Astro2.props, "class": "astro-5znlxet7" }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })} </div> ${renderComponent($$result, "ThemeSelect", $$ThemeSelectMobile, { "class": "astro-5znlxet7" })} ${renderComponent($$result, "LanguageSelect", $$LanguageSelect, { ...Astro2.props, "class": "astro-5znlxet7" }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })} </div> `;
}, "/Users/gg/iost/demo/YST_front/src/components/ui/starlight/MobileMenuFooter.astro", void 0);

const $$Astro$5 = createAstro("https://screwfast.uk");
const $$SidebarSublist = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SidebarSublist;
  const { sublist, nested } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([{ "top-level": !nested }, "astro-3ii7xxms"], "class:list")}> ${sublist.map((entry) => renderTemplate`<li class="astro-3ii7xxms"> ${entry.type === "link" ? renderTemplate`<a${addAttribute(entry.href, "href")}${addAttribute(entry.isCurrent && "page", "aria-current")}${addAttribute([[{ large: !nested }, entry.attrs.class], "astro-3ii7xxms"], "class:list")}${spreadAttributes(entry.attrs)}> <span class="astro-3ii7xxms">${entry.label}</span> ${entry.badge && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": entry.badge.variant, "class": (entry.badge.class ?? "") + " astro-3ii7xxms", "text": entry.badge.text })}`} </a>` : renderTemplate`<details${addAttribute(flattenSidebar(entry.entries).some((i) => i.isCurrent) || !entry.collapsed, "open")} class="astro-3ii7xxms"> <summary class="astro-3ii7xxms"> <div class="group-label astro-3ii7xxms"> <span class="large astro-3ii7xxms">${entry.label}</span> ${entry.badge && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": entry.badge.variant, "class": (entry.badge.class ?? "") + " astro-3ii7xxms", "text": entry.badge.text })}`} </div> ${renderComponent($$result, "Icon", $$Icon, { "name": "right-caret", "class": "caret astro-3ii7xxms", "size": "1.25rem" })} </summary> ${renderComponent($$result, "Astro.self", Astro2.self, { "sublist": entry.entries, "nested": true, "class": "astro-3ii7xxms" })} </details>`} </li>`)} </ul> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/SidebarSublist.astro", void 0);

const $$Astro$4 = createAstro("https://screwfast.uk");
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { sidebar } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "SidebarSublist", $$SidebarSublist, { "sublist": sidebar })} ${maybeRenderHead()}<div class="md:sl-hidden"> ${renderComponent($$result, "MobileMenuFooter", $$MobileMenuFooter, { ...Astro2.props })} </div>`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Sidebar.astro", void 0);

const $$Astro$3 = createAstro("https://screwfast.uk");
const $$SkipLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SkipLink;
  const { labels } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`#${PAGE_TITLE_ID}`, "href")} class="astro-7q3lir66">${labels["skipLink.label"]}</a> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/SkipLink.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$ThemeProvider = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<script>\n	window.StarlightThemeProvider = (() => {\n		const storedTheme =\n			typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');\n		const theme =\n			storedTheme ||\n			(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n		document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';\n		return {\n			updatePickers(theme = storedTheme || 'auto') {\n				document.querySelectorAll('starlight-theme-select').forEach((picker) => {\n					const select = picker.querySelector('select');\n					if (select) select.value = theme;\n					/** @type {HTMLTemplateElement | null} */\n					const tmpl = document.querySelector(`#theme-icons`);\n					const newIcon = tmpl && tmpl.content.querySelector('.' + theme);\n					if (newIcon) {\n						const oldIcon = picker.querySelector('svg.label-icon');\n						if (oldIcon) {\n							oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);\n						}\n					}\n				});\n			},\n		};\n	})();\n<\/script><template id=\"theme-icons\">", "", "", "</template>"], ["<script>\n	window.StarlightThemeProvider = (() => {\n		const storedTheme =\n			typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');\n		const theme =\n			storedTheme ||\n			(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n		document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';\n		return {\n			updatePickers(theme = storedTheme || 'auto') {\n				document.querySelectorAll('starlight-theme-select').forEach((picker) => {\n					const select = picker.querySelector('select');\n					if (select) select.value = theme;\n					/** @type {HTMLTemplateElement | null} */\n					const tmpl = document.querySelector(\\`#theme-icons\\`);\n					const newIcon = tmpl && tmpl.content.querySelector('.' + theme);\n					if (newIcon) {\n						const oldIcon = picker.querySelector('svg.label-icon');\n						if (oldIcon) {\n							oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);\n						}\n					}\n				});\n			},\n		};\n	})();\n<\/script><template id=\"theme-icons\">", "", "", "</template>"])), renderComponent($$result, "Icon", $$Icon, { "name": "sun", "class": "light" }), renderComponent($$result, "Icon", $$Icon, { "name": "moon", "class": "dark" }), renderComponent($$result, "Icon", $$Icon, { "name": "laptop", "class": "auto" }));
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/ThemeProvider.astro", void 0);

const $$Astro$2 = createAstro("https://screwfast.uk");
const $$TwoColumnContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TwoColumnContent;
  return renderTemplate`${maybeRenderHead()}<div class="lg:sl-flex astro-67yu43on"> ${Astro2.props.toc && renderTemplate`<aside class="right-sidebar-container astro-67yu43on"> <div class="right-sidebar astro-67yu43on"> ${renderSlot($$result, $$slots["right-sidebar"])} </div> </aside>`} <div class="main-pane astro-67yu43on">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/TwoColumnContent.astro", void 0);

const $$Astro$1 = createAstro("https://screwfast.uk");
const $$Page = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Page;
  const pagefindEnabled = Astro2.props.entry.slug !== "404" && !Astro2.props.entry.slug.endsWith("/404") && Astro2.props.entry.data.pagefind !== false;
  return renderTemplate`<html${addAttribute(Astro2.props.lang, "lang")}${addAttribute(Astro2.props.dir, "dir")}${addAttribute(Boolean(Astro2.props.toc), "data-has-toc")}${addAttribute(Astro2.props.hasSidebar, "data-has-sidebar")}${addAttribute(Boolean(Astro2.props.entry.data.hero), "data-has-hero")} data-theme="dark" class="astro-bguv2lll"> <head>${renderComponent($$result, "Head", $$Head, { ...Astro2.props, "class": "astro-bguv2lll" })}${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { ...Astro2.props, "class": "astro-bguv2lll" })}${renderHead()}</head> <body class="astro-bguv2lll"> ${renderComponent($$result, "SkipLink", $$SkipLink, { ...Astro2.props, "class": "astro-bguv2lll" })} ${renderComponent($$result, "PageFrame", $$PageFrame, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "TwoColumnContent", $$TwoColumnContent, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result3) => renderTemplate`  <main${addAttribute(pagefindEnabled, "data-pagefind-body")}${addAttribute(Astro2.props.entryMeta.lang, "lang")}${addAttribute(Astro2.props.entryMeta.dir, "dir")} class="astro-bguv2lll">  ${renderComponent($$result3, "Banner", $$Banner, { ...Astro2.props, "class": "astro-bguv2lll" })} ${Astro2.props.entry.data.hero ? renderTemplate`${renderComponent($$result3, "ContentPanel", $$ContentPanel, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Hero", $$Hero, { ...Astro2.props, "class": "astro-bguv2lll" })} ${renderComponent($$result4, "MarkdownContent", $$MarkdownContent, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result5) => renderTemplate` ${renderSlot($$result5, $$slots["default"])} ` })} ${renderComponent($$result4, "Footer", $$Footer, { ...Astro2.props, "class": "astro-bguv2lll" })} ` })}` : renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "class": "astro-bguv2lll" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ContentPanel", $$ContentPanel, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "PageTitle", $$PageTitle, { ...Astro2.props, "class": "astro-bguv2lll" })} ${Astro2.props.entry.data.draft && renderTemplate`${renderComponent($$result5, "DraftContentNotice", $$DraftContentNotice, { ...Astro2.props, "class": "astro-bguv2lll" })}`}${Astro2.props.isFallback && renderTemplate`${renderComponent($$result5, "FallbackContentNotice", $$FallbackContentNotice, { ...Astro2.props, "class": "astro-bguv2lll" })}`}` })} ${renderComponent($$result4, "ContentPanel", $$ContentPanel, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "MarkdownContent", $$MarkdownContent, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result6) => renderTemplate` ${renderSlot($$result6, $$slots["default"])} ` })} ${renderComponent($$result5, "Footer", $$Footer, { ...Astro2.props, "class": "astro-bguv2lll" })} ` })} ` })}`} </main> `, "right-sidebar": ($$result3) => renderTemplate`${renderComponent($$result3, "PageSidebar", $$PageSidebar, { "slot": "right-sidebar", ...Astro2.props, "class": "astro-bguv2lll" })}` })} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", ...Astro2.props, "class": "astro-bguv2lll" })}`, "sidebar": ($$result2) => renderTemplate`${Astro2.props.hasSidebar && renderTemplate`${renderComponent($$result2, "Sidebar", $$Sidebar, { "slot": "sidebar", ...Astro2.props, "class": "astro-bguv2lll" })}`}` })} </body></html>`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/components/Page.astro", void 0);

const $$Astro = createAstro("https://screwfast.uk");
const prerender = true;
async function getStaticPaths() {
  return paths;
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { Content, headings } = await Astro2.props.entry.render();
  const route = generateRouteData({ props: { ...Astro2.props, headings }, url: Astro2.url });
  return renderTemplate`${renderComponent($$result, "Page", $$Page, { ...route }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Content", Content, { "frontmatter": Astro2.props.entry.data })}` })}`;
}, "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/index.astro", void 0);

const $$file = "/Users/gg/iost/demo/YST_front/node_modules/@astrojs/starlight/index.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	getStaticPaths,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
