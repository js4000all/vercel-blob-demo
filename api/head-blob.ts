import { head } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { key } = req.query as { key: string };
  if (!key) {
    return res.status(400).json({ error: 'Key is required' });
  }
  const blob = await head(key);
  return res.status(200).json(blob);
}
