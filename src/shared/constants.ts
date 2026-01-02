import { main as remotive } from '@/modules/remotive/main.ts'
import { main as github } from '@/modules/github/main.ts'
import denoJson from '../../deno.json' with { type: 'json' }

export const VERSION = denoJson.version
export const API_URL = Deno.env.get('API_URL')
export const API_PATH = Deno.env.get('API_PATH')
export const API_PUBLIC_PATH = `${Deno.env.get('API_PATH')}/public`
export const GITHUB_USER = Deno.env.get('GITHUB_USER') ?? 'unknown'
export const JOBS_API_URL = Deno.env.get('JOBS_API_URL') ?? ''
export const MODULES_NAMES = ['Github', 'Remotive']
export const MODULES = {
  github,
  remotive,
}
