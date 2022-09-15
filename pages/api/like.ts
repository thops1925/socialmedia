import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    const data = like
      ? await client
          .patch(postId) // The ID of the document to patch.
          .setIfMissing({ likes: [] }) // If the document doesn't exist, create it with an empty array for the likes field.
          .insert('after', 'likes[-1]', [
            // Insert a new like at the end of the likes array.
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit() // commit the transaction
      : await client
          .patch(postId) // postId is the id of the post
          .unset([`likes[_ref=="${userId}"]`]) // unset is a method that removes a field from a document
          .commit(); // commit is a method that commits the changes to the database

    res.status(200).json(data);
  }
}
