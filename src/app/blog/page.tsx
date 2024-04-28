import Link from "next/link";
import Blogs from '@/data/blog/blog.mdx'
import CustomLink from "@/components/MDXExternalLink";

export default function Blog() {
  return (
    <>
      <Blogs components={{
        a: CustomLink
      }}/>
    </>
  )
}