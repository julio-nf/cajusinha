import { NextApiRequest, NextApiResponse } from 'next';

import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { ProductResponse } from '../../../types/product';

interface FaunaResponse {
  data: ProductResponse[];
}

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const productsResponse = await fauna.query<FaunaResponse>(
    q.Map(
      q.Paginate(q.Match(q.Index('products_sorted_by_purchased_desc'))),
      q.Lambda(['purchased', 'name', 'productRef'], q.Get(q.Var('productRef')))
    )
  );

  return res.json(productsResponse.data.map((product) => product.data));
}
