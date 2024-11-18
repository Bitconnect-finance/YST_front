import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { r as removeBase, i as isRemotePath, V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError, p as prependForwardSlash } from './astro/assets-service_DX_s4nQ-.mjs';
import { a as createComponent, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, r as renderTemplate, d as renderComponent, u as unescapeHTML } from './astro/server_CKj95Dky.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_BcEe_9wP.mjs');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://screwfast.uk", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./_astro_asset-imports_D9aVaOQr.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/en/post-1.md": () => import('./post-1_CUxEzvqx.mjs'),"/src/content/blog/en/post-2.md": () => import('./post-2_DoV7rA6y.mjs'),"/src/content/blog/en/post-3.md": () => import('./post-3_B5Uacg5V.mjs'),"/src/content/blog/fr/post-1.md": () => import('./post-1_B2KF6oJc.mjs'),"/src/content/blog/fr/post-2.md": () => import('./post-2_Bmb4p_FS.mjs'),"/src/content/blog/fr/post-3.md": () => import('./post-3_DU8QV15D.mjs'),"/src/content/docs/advanced/technical-specifications.mdx": () => import('./technical-specifications_CqFcd8Gf.mjs'),"/src/content/docs/construction/custom-solutions.mdx": () => import('./custom-solutions_D3iu1qn8.mjs'),"/src/content/docs/construction/project-planning.mdx": () => import('./project-planning_BSydkRVk.mjs'),"/src/content/docs/construction/safety.mdx": () => import('./safety_BUgfHKXJ.mjs'),"/src/content/docs/construction/service-overview.mdx": () => import('./service-overview_tAaEBU5a.mjs'),"/src/content/docs/de/guides/first-project-checklist.mdx": () => import('./first-project-checklist_DvJ-ILBg.mjs'),"/src/content/docs/de/guides/getting-started.mdx": () => import('./getting-started_D5r3dIwz.mjs'),"/src/content/docs/de/guides/intro.mdx": () => import('./intro_BY-H0cew.mjs'),"/src/content/docs/de/welcome-to-docs.mdx": () => import('./welcome-to-docs_CFRl6224.mjs'),"/src/content/docs/es/guides/first-project-checklist.mdx": () => import('./first-project-checklist_D14LIFJe.mjs'),"/src/content/docs/es/guides/getting-started.mdx": () => import('./getting-started_DVHIATHO.mjs'),"/src/content/docs/es/guides/intro.mdx": () => import('./intro_DjIYJyI5.mjs'),"/src/content/docs/es/welcome-to-docs.mdx": () => import('./welcome-to-docs_CtJa0UtC.mjs'),"/src/content/docs/fa/guides/first-project-checklist.mdx": () => import('./first-project-checklist_D6aDdr5T.mjs'),"/src/content/docs/fa/guides/getting-started.mdx": () => import('./getting-started_B670n8km.mjs'),"/src/content/docs/fa/guides/intro.mdx": () => import('./intro__ECEmPkJ.mjs'),"/src/content/docs/fa/welcome-to-docs.mdx": () => import('./welcome-to-docs_XvCzLf0c.mjs'),"/src/content/docs/fr/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CuQK9VZy.mjs'),"/src/content/docs/fr/guides/getting-started.mdx": () => import('./getting-started_DJFiXB5A.mjs'),"/src/content/docs/fr/guides/intro.mdx": () => import('./intro_4mJzjDz2.mjs'),"/src/content/docs/fr/welcome-to-docs.mdx": () => import('./welcome-to-docs_HLUwJq0x.mjs'),"/src/content/docs/guides/first-project-checklist.mdx": () => import('./first-project-checklist_DyYCDOO_.mjs'),"/src/content/docs/guides/getting-started.mdx": () => import('./getting-started_ULjcuj1l.mjs'),"/src/content/docs/guides/intro.mdx": () => import('./intro_DRQjHNvK.mjs'),"/src/content/docs/ja/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CtF6ClWB.mjs'),"/src/content/docs/ja/guides/getting-started.mdx": () => import('./getting-started_Di30HS8P.mjs'),"/src/content/docs/ja/guides/intro.mdx": () => import('./intro_hm4ehuFd.mjs'),"/src/content/docs/ja/welcome-to-docs.mdx": () => import('./welcome-to-docs_BwAgsRjn.mjs'),"/src/content/docs/tools/equipment-care.mdx": () => import('./equipment-care_Dku0myZp.mjs'),"/src/content/docs/tools/tool-guides.mdx": () => import('./tool-guides_D-zzeiE3.mjs'),"/src/content/docs/welcome-to-docs.mdx": () => import('./welcome-to-docs_CG7wNiLG.mjs'),"/src/content/docs/zh-cn/guides/first-project-checklist.mdx": () => import('./first-project-checklist_DIk39XbO.mjs'),"/src/content/docs/zh-cn/guides/getting-started.mdx": () => import('./getting-started_D3eTv3Ac.mjs'),"/src/content/docs/zh-cn/guides/intro.mdx": () => import('./intro_CITePZ2q.mjs'),"/src/content/docs/zh-cn/welcome-to-docs.mdx": () => import('./welcome-to-docs_C0ocCXDO.mjs'),"/src/content/insights/en/insight-1.md": () => import('./insight-1_Oa9zFQ7k.mjs'),"/src/content/insights/en/insight-2.md": () => import('./insight-2_BBwpl_Uw.mjs'),"/src/content/insights/en/insight-3.md": () => import('./insight-3_BHTnslNS.mjs'),"/src/content/insights/fr/insight-1.md": () => import('./insight-1_zqz6VU9v.mjs'),"/src/content/insights/fr/insight-2.md": () => import('./insight-2_BpO0ofJm.mjs'),"/src/content/insights/fr/insight-3.md": () => import('./insight-3_nNvzyiVw.mjs'),"/src/content/products/a765.md": () => import('./a765_BFwl-sCI.mjs'),"/src/content/products/b203.md": () => import('./b203_C4cEG06F.mjs'),"/src/content/products/f303.md": () => import('./f303_DRrEQg-8.mjs'),"/src/content/products/t845.md": () => import('./t845_DJNiXmih.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"docs":{"type":"content","entries":{"welcome-to-docs":"/src/content/docs/welcome-to-docs.mdx","advanced/technical-specifications":"/src/content/docs/advanced/technical-specifications.mdx","fa/welcome-to-docs":"/src/content/docs/fa/welcome-to-docs.mdx","es/welcome-to-docs":"/src/content/docs/es/welcome-to-docs.mdx","construction/custom-solutions":"/src/content/docs/construction/custom-solutions.mdx","construction/project-planning":"/src/content/docs/construction/project-planning.mdx","construction/safety":"/src/content/docs/construction/safety.mdx","construction/service-overview":"/src/content/docs/construction/service-overview.mdx","de/welcome-to-docs":"/src/content/docs/de/welcome-to-docs.mdx","fr/welcome-to-docs":"/src/content/docs/fr/welcome-to-docs.mdx","guides/first-project-checklist":"/src/content/docs/guides/first-project-checklist.mdx","guides/getting-started":"/src/content/docs/guides/getting-started.mdx","guides/intro":"/src/content/docs/guides/intro.mdx","ja/welcome-to-docs":"/src/content/docs/ja/welcome-to-docs.mdx","tools/equipment-care":"/src/content/docs/tools/equipment-care.mdx","tools/tool-guides":"/src/content/docs/tools/tool-guides.mdx","zh-cn/welcome-to-docs":"/src/content/docs/zh-cn/welcome-to-docs.mdx","fa/guides/getting-started":"/src/content/docs/fa/guides/getting-started.mdx","fa/guides/first-project-checklist":"/src/content/docs/fa/guides/first-project-checklist.mdx","fa/guides/intro":"/src/content/docs/fa/guides/intro.mdx","es/guides/first-project-checklist":"/src/content/docs/es/guides/first-project-checklist.mdx","es/guides/getting-started":"/src/content/docs/es/guides/getting-started.mdx","es/guides/intro":"/src/content/docs/es/guides/intro.mdx","de/guides/first-project-checklist":"/src/content/docs/de/guides/first-project-checklist.mdx","de/guides/getting-started":"/src/content/docs/de/guides/getting-started.mdx","de/guides/intro":"/src/content/docs/de/guides/intro.mdx","fr/guides/first-project-checklist":"/src/content/docs/fr/guides/first-project-checklist.mdx","fr/guides/getting-started":"/src/content/docs/fr/guides/getting-started.mdx","fr/guides/intro":"/src/content/docs/fr/guides/intro.mdx","ja/guides/first-project-checklist":"/src/content/docs/ja/guides/first-project-checklist.mdx","ja/guides/getting-started":"/src/content/docs/ja/guides/getting-started.mdx","ja/guides/intro":"/src/content/docs/ja/guides/intro.mdx","zh-cn/guides/first-project-checklist":"/src/content/docs/zh-cn/guides/first-project-checklist.mdx","zh-cn/guides/getting-started":"/src/content/docs/zh-cn/guides/getting-started.mdx","zh-cn/guides/intro":"/src/content/docs/zh-cn/guides/intro.mdx"}},"products":{"type":"content","entries":{"b203":"/src/content/products/b203.md","a765":"/src/content/products/a765.md","f303":"/src/content/products/f303.md","t845":"/src/content/products/t845.md"}},"blog":{"type":"content","entries":{"en/post-1":"/src/content/blog/en/post-1.md","en/post-2":"/src/content/blog/en/post-2.md","en/post-3":"/src/content/blog/en/post-3.md","fr/post-1":"/src/content/blog/fr/post-1.md","fr/post-2":"/src/content/blog/fr/post-2.md","fr/post-3":"/src/content/blog/fr/post-3.md"}},"insights":{"type":"content","entries":{"en/insight-1":"/src/content/insights/en/insight-1.md","en/insight-2":"/src/content/insights/en/insight-2.md","en/insight-3":"/src/content/insights/en/insight-3.md","fr/insight-1":"/src/content/insights/fr/insight-1.md","fr/insight-2":"/src/content/insights/fr/insight-2.md","fr/insight-3":"/src/content/insights/fr/insight-3.md"}}};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/en/post-1.md": () => import('./post-1_DQ66ZzIi.mjs'),"/src/content/blog/en/post-2.md": () => import('./post-2_B08D_dwz.mjs'),"/src/content/blog/en/post-3.md": () => import('./post-3_CbotqWyq.mjs'),"/src/content/blog/fr/post-1.md": () => import('./post-1_Dv3cpOLY.mjs'),"/src/content/blog/fr/post-2.md": () => import('./post-2_DxzStaR8.mjs'),"/src/content/blog/fr/post-3.md": () => import('./post-3_DVR2f0TD.mjs'),"/src/content/docs/advanced/technical-specifications.mdx": () => import('./technical-specifications_BdVyCZ_d.mjs'),"/src/content/docs/construction/custom-solutions.mdx": () => import('./custom-solutions_C233sj0a.mjs'),"/src/content/docs/construction/project-planning.mdx": () => import('./project-planning_C16EkijN.mjs'),"/src/content/docs/construction/safety.mdx": () => import('./safety_DhOZEyqU.mjs'),"/src/content/docs/construction/service-overview.mdx": () => import('./service-overview_-sR8iA1O.mjs'),"/src/content/docs/de/guides/first-project-checklist.mdx": () => import('./first-project-checklist_DbDip-MH.mjs'),"/src/content/docs/de/guides/getting-started.mdx": () => import('./getting-started_-_VUdJon.mjs'),"/src/content/docs/de/guides/intro.mdx": () => import('./intro_BtiTZ6T3.mjs'),"/src/content/docs/de/welcome-to-docs.mdx": () => import('./welcome-to-docs_K3mfsd1p.mjs'),"/src/content/docs/es/guides/first-project-checklist.mdx": () => import('./first-project-checklist_DOJx07Kj.mjs'),"/src/content/docs/es/guides/getting-started.mdx": () => import('./getting-started_CCJscqjy.mjs'),"/src/content/docs/es/guides/intro.mdx": () => import('./intro_Cxb1WcCs.mjs'),"/src/content/docs/es/welcome-to-docs.mdx": () => import('./welcome-to-docs_CKjiQvqd.mjs'),"/src/content/docs/fa/guides/first-project-checklist.mdx": () => import('./first-project-checklist_Dh2v7cQz.mjs'),"/src/content/docs/fa/guides/getting-started.mdx": () => import('./getting-started_BFPBgS4P.mjs'),"/src/content/docs/fa/guides/intro.mdx": () => import('./intro_CEofu4W2.mjs'),"/src/content/docs/fa/welcome-to-docs.mdx": () => import('./welcome-to-docs_BaE9_qUg.mjs'),"/src/content/docs/fr/guides/first-project-checklist.mdx": () => import('./first-project-checklist_8tDR-evU.mjs'),"/src/content/docs/fr/guides/getting-started.mdx": () => import('./getting-started_CeWPupcp.mjs'),"/src/content/docs/fr/guides/intro.mdx": () => import('./intro_-2KeQbYw.mjs'),"/src/content/docs/fr/welcome-to-docs.mdx": () => import('./welcome-to-docs_C4NKbRrJ.mjs'),"/src/content/docs/guides/first-project-checklist.mdx": () => import('./first-project-checklist_ta90OmyO.mjs'),"/src/content/docs/guides/getting-started.mdx": () => import('./getting-started_CoQYAIKl.mjs'),"/src/content/docs/guides/intro.mdx": () => import('./intro_DuIDab2k.mjs'),"/src/content/docs/ja/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CPwa5GLt.mjs'),"/src/content/docs/ja/guides/getting-started.mdx": () => import('./getting-started_BDD7kmBx.mjs'),"/src/content/docs/ja/guides/intro.mdx": () => import('./intro_BLflm9UB.mjs'),"/src/content/docs/ja/welcome-to-docs.mdx": () => import('./welcome-to-docs_DkY68X7h.mjs'),"/src/content/docs/tools/equipment-care.mdx": () => import('./equipment-care_DMfxYYgz.mjs'),"/src/content/docs/tools/tool-guides.mdx": () => import('./tool-guides_CroyB9Al.mjs'),"/src/content/docs/welcome-to-docs.mdx": () => import('./welcome-to-docs_DWigcx_r.mjs'),"/src/content/docs/zh-cn/guides/first-project-checklist.mdx": () => import('./first-project-checklist_Djbd14VZ.mjs'),"/src/content/docs/zh-cn/guides/getting-started.mdx": () => import('./getting-started_W6GGI_vZ.mjs'),"/src/content/docs/zh-cn/guides/intro.mdx": () => import('./intro_60aNEGMn.mjs'),"/src/content/docs/zh-cn/welcome-to-docs.mdx": () => import('./welcome-to-docs_CyWy58wv.mjs'),"/src/content/insights/en/insight-1.md": () => import('./insight-1_DFAjnI7Q.mjs'),"/src/content/insights/en/insight-2.md": () => import('./insight-2_D7hQfDin.mjs'),"/src/content/insights/en/insight-3.md": () => import('./insight-3_Drnqh4-m.mjs'),"/src/content/insights/fr/insight-1.md": () => import('./insight-1_CQfgn3fD.mjs'),"/src/content/insights/fr/insight-2.md": () => import('./insight-2_C8-fZWwv.mjs'),"/src/content/insights/fr/insight-3.md": () => import('./insight-3_CLxufdjK.mjs'),"/src/content/products/a765.md": () => import('./a765_3oaoyGO2.mjs'),"/src/content/products/b203.md": () => import('./b203_D5OGCjzd.mjs'),"/src/content/products/f303.md": () => import('./f303_wQwx6iE4.mjs'),"/src/content/products/t845.md": () => import('./t845_CyFuFlxZ.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

export { getCollection as g };
