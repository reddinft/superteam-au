import { createReader } from '@keystatic/core/reader'
import path from 'path'
import config from '../keystatic.config'

// On Vercel, the source files are mounted under /var/task/src/
// Locally, process.cwd() points directly to the app directory
const readerRoot = process.env.VERCEL
  ? path.join(process.cwd(), 'src')
  : process.cwd()

export const reader = createReader(readerRoot, config)
