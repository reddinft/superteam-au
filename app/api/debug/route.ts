import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { reader } from '@/lib/keystatic.reader'

export const dynamic = 'force-dynamic'

export async function GET() {
  const cwd = process.cwd()
  const isVercel = !!process.env.VERCEL
  const srcPath = path.join(cwd, 'src', 'content', 'members')
  const directPath = path.join(cwd, 'content', 'members')
  
  const srcExists = fs.existsSync(srcPath)
  const directExists = fs.existsSync(directPath)
  
  let memberFiles: string[] = []
  if (srcExists) memberFiles = fs.readdirSync(srcPath)
  else if (directExists) memberFiles = fs.readdirSync(directPath)

  let readerMembers: string[] = []
  let readerError = null
  try {
    const members = await reader.collections.members.all()
    readerMembers = members.map(m => m.slug)
  } catch(e: any) {
    readerError = e.message
  }

  return NextResponse.json({
    cwd, isVercel, srcExists, directExists,
    memberFiles: memberFiles.slice(0, 10),
    readerMemberCount: readerMembers.length,
    readerMembers: readerMembers.slice(0, 8),
    readerError,
  })
}
