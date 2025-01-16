import path from 'path';
import { getMDXData } from '@/utils/mdx'
import { SnippetCard } from "../SnippetCard";
import { MdxFileData } from '@/types/mdx'

let notes: MdxFileData[] = []
getMDXData(path.join(process.cwd(), 'src', 'data', 'notes')).then(results => {
    notes = results;
})


export default function NotesList() {
    return(
        <>
            {notes.map((note) => (
                <SnippetCard key={note.frontmatter.title} snippet={note.frontmatter} />
            ))}
        </>
    )
}