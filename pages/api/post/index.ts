import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const getAllQuery = await client.fetch(allPostsQuery());
    res.status(200).json(getAllQuery);
  } else if (req.method === 'POST') {
    const document = req.body;
    const createPost = await client.create(document);
    res.status(200).json(createPost);
  }
}
