import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';

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
