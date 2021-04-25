import Head from 'next/head';
import { Flex, Heading, ListItem, List } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { ProductBar } from '../components/ProductBar';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Lista de desejos | cajusinha</title>
      </Head>

      <Header />

      <Flex
        m="-8rem auto 0"
        // p={[8, 8, 8, 20]}
        p={{ base: 8, md: 20 }}
        maxW="960px"
        bg="white"
        borderRadius={8}
        flexDir="column"
      >
        <Heading fontWeight="semibold" fontSize="3xl" mb="8">
          Itens
        </Heading>

        <List>
          <ListItem>
            <ProductBar
              productName="Liquidificador"
              link="https://www.americanas.com.br/produto/131830784?pfm_carac=Liquidificador&pfm_page=category&pfm_pos=grid&pfm_type=vit_product_grid&voltagem=110V"
            />
          </ListItem>
          <ListItem>
            <ProductBar
              productName="Máquina de lavar"
              link="https://www.americanas.com.br/produto/131830784?pfm_carac=Liquidificador&pfm_page=category&pfm_pos=grid&pfm_type=vit_product_grid&voltagem=110V"
            />
          </ListItem>
          <ListItem>
            <ProductBar
              productName="Jogo de panelas"
              link="https://www.americanas.com.br/produto/131830784?pfm_carac=Liquidificador&pfm_page=category&pfm_pos=grid&pfm_type=vit_product_grid&voltagem=110V"
              purchased
            />
          </ListItem>
        </List>
      </Flex>
    </>
  );
}
