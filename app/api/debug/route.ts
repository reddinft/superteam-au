import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

export async function GET() {
  const cwd = process.cwd()
  const contentPath = path.join(cwd, 'content', 'members')
  const files = fs.existsSync(contentPath) ? fs.readdirSync(contentPath) : []
  
  // Read one file directly to prove it works
  let sampleContent = null
  if (files.length > 0) {
    const samplePath = path.join(contentPath, files[0])
    sampleContent = JSON.parse(fs.readFileSync(samplePath, 'utf8'))
  }

  // Try keystatic reader with explicit path
  const { createReader } = await import('@keystatic/core/reader')
  const config = (await import('@/keystatic.config')).default
  
  const r1 = createReader(cwd, config)
  const members1 = await r1.collections.members.all()
  
  return NextResponse.json({
    cwd,
    contentPath,
    filesCount: files.length,
    firstFile: files[0],
    sampleContent,
    keystatic_cwd_count: members1.length,
    keystatic_first_member: members1[0]?.slug ?? null,
  })
}
