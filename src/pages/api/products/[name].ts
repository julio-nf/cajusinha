import { NextApiRequest, NextApiResponse } from 'next';

import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { Product } from '../../../types/product';

interface ProductResponse {
  ref: {
    id: string;
  };
  data: Product;
}

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const { name } = req.query;
    console.log(name);

    const product = await fauna.query<ProductResponse>(
      q.Get(q.Match(q.Index('product_by_name'), name))
    );

    console.log(product);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    await fauna.query(
      q.Update(q.Ref(q.Collection('wishlist'), product.ref.id), {
        data: {
          purchased: true,
        },
      })
    );

    return res.status(200).json(product);
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }
}
