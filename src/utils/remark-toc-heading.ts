import Slugger from 'github-slugger'
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { valueToEstree } from 'estree-util-value-to-estree';

const addID = (node, sluggerInstance) => {
  let originalSlug = sluggerInstance.slug(toString(node))
  let id = originalSlug
  node.data = node.data || {}
  node.data.id = id
}


const createEntry = (node, depth) => {
  let attributes = (node.data || {});
  return {
      depth,
      value: toString(node, { includeImageAlt: false }),
      attributes,
      children: [],
      url: `#${node.data?.id}`
  };
};

export const remarkMdxToc = (options = {}) => ((ast) => {
    const mdast = ast;
    const name = options.name ?? "toc";
    if (!isIdentifierName(name)) {
        throw new Error(`Invalid name for an identifier: ${name}`);
    }
    // structured toc
    const toc = [];
    // flat toc (share objects in toc, only for iterating)
    const flatToc = [];

    let sluggerInstance = new Slugger()

    visit(mdast, ["heading",], node => {
        let depth = 0;
        if (node.type === "heading") {
            depth = node.depth;
        }
        else {
            return;
        }
        addID(node, sluggerInstance)
        const entry = createEntry(node, depth);
        flatToc.push(entry);
        // find the last node that is less deep (parant)
        // Fall back to root
        let parent = toc;
        for (let i = flatToc.length - 1; i >= 0; --i) {
            const current = flatToc[i];
            if (current.depth < entry.depth) {
                parent = current.children;
                break;
            }
        }
        parent.push(entry);
    });
    // Export in MDX
    const tocExport = {
        type: "mdxjsEsm",
        value: "",
        data: {
            estree: {
                type: "Program",
                sourceType: "module",
                body: [
                    {
                        type: "ExportNamedDeclaration",
                        specifiers: [],
                        source: null,
                        declaration: {
                            type: "VariableDeclaration",
                            kind: "const",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name
                                    },
                                    init: valueToEstree(toc)
                                }
                            ]
                        }
                    }
                ]
            }
        }
    };
    mdast.children.unshift(tocExport);
});
