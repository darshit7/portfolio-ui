import path from 'path';
import Link from "next/link";
import { getMDXData } from '@/utils/mdx'
import { SnippetCard } from "../SnippetCard";
import { MdxFileData } from '@/types/mdx'

let snippets: MdxFileData[] = []
getMDXData(path.join(process.cwd(), 'src', 'data', 'snippets')).then(results => {
    snippets = results;
})


export default function SnippetList() {
    return(
        <>
            {snippets.map((snippet) => (
                <SnippetCard key={snippet.frontmatter.title} snippet={snippet.frontmatter} />
            ))}
        </>
    )
}