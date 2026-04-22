import { allNotes } from 'contentlayer/generated'
import { allCoreContent } from '~/utils/contentlayer'

export async function GET() {
  const notes = allCoreContent(allNotes)
  return Response.json(notes)
}
