import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flex, Heading, ListItem, List, Skeleton } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { ProductBar } from '../components/ProductBar';
import { Product } from '../types/product';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>('/products').then((products) => setProducts(products.data));
  }, []);

  return (
    <>
      <Head>
        <title>Lista de desejos | cajusinha</title>
      </Head>

      <Header />

      <Flex
        m="-8rem auto 0"
        p={{ base: 8, md: 20 }}
        maxW="960px"
        bg="white"
        borderRadius={8}
        flexDir="column"
      >
        <Heading fontWeight="semibold" fontSize="3xl" mb="8">
          Itens
        </Heading>

        <Skeleton isLoaded={products.length > 0}>
          <List>
            {products.map((product) => (
              <ListItem key={product.productName}>
                <ProductBar
                  productName={product.productName}
                  link={product.link}
                  purchased={product.purchased}
                />
              </ListItem>
            ))}
          </List>
        </Skeleton>
      </Flex>
    </>
  );
}
