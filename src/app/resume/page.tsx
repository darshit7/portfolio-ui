import path from 'path';
import Link from "next/link";
import { readMDXFile } from '@/utils/mdx'
import CustomLink from "@/components/MDXExternalLink";

export default async function Resume() {
  let { MDXContent, frontmatter } = await readMDXFile(path.join(process.cwd(), 'src', 'data', 'resume', 'resume.mdx'));
  return (
    <MDXContent components={{
      a: CustomLink
    }}/>
  );
}
