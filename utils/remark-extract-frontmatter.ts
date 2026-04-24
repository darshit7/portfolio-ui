import type { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'
import yaml from 'js-yaml'

/**
 * Extracts frontmatter from markdown file and adds it to the file's data object.
 *
 */
export function remarkExtractFrontmatter() {
  return (tree: Parent, file: VFile) => {
    visit(tree, 'yaml', (node: Node & { value: string }) => {
      file.data.frontmatter = yaml.load(node.value) as Record<string, unknown>
    })
  }
}
