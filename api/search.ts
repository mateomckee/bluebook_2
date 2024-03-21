import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { query = 'data' } = req.query
  return res.json({
    message: `Search ${query}!`,
  })
}
