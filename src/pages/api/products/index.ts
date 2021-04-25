import { NextApiRequest, NextApiResponse } from 'next';

import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { Product } from '../../../types/product';

interface ProductResponse {
  data: Product[];
}

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const productsResponse = await fauna.query<ProductResponse>(
    q.Map(
      q.Paginate(q.Documents(q.Collection('wishlist'))),
      q.Lambda((x) => q.Select('data', q.Get(x)))
    )
  );

  return res.json(productsResponse.data);
}
