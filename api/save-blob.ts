import { put } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { key, content } = req.body;

    if (!key || !content) {
        return res.status(400).json({ error: 'Key and value are required' });
    }
    const result = await put(key, content, {
        access: "public",
        addRandomSuffix: false,
        cacheControlMaxAge: 0,
    });
    return res.status(200).json(result);
}
