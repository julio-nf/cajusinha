import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import {
  Flex,
  Text,
  ListItem,
  List,
  Skeleton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

import { Header } from '../components/Header';
import { ProductBar } from '../components/ProductBar';
import { Product } from '../types/product';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchasingName, setPurchasingName] = useState('');
  const cancelRef = useRef();

  useEffect(() => {
    api.get<Product[]>('/products').then((product) => setProducts(product.data));
  }, [purchasingName]);

  const closeDialog = () => setPurchasingName('');

  async function purchaseProduct() {
    await api.post(`/products/${purchasingName}`);

    setPurchasingName('');
  }

  async function handlePurchaseProduct(name: string) {
    setPurchasingName(name);
  }

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
        {/* <Heading fontWeight="semibold" fontSize="3xl" mb="8">
          Itens
        </Heading> */}
        <Text pb="8" textAlign="justify" borderBottom="1px" borderColor="#EBEBEB">
          Olá! Espero que estejam todos bem 💜 <br />
          <br />
          Estamos juntando os trapos e é nossa primeira vez nesta vida adulta independente, e, na
          busca de economizar ao máximo para pagar o aluguel e as contas, estamos aceitando toda
          ajuda que as pessoas ao nosso redor (amigos e familiares) puderem dar. <br />
          <br />
          Criamos este site que consta nossa listinha. São preços e produtos diversos que usaremos
          no dia a dia. Sei que estamos em um momento de crise, então entenderemos se alguém não
          puder ajudar. Caso possa, aqui no site consta a sugestão do produto e basta você clicar em
          Vou Ajudar, pois assim evitamos produtos repetidos ;)
        </Text>

        <Skeleton isLoaded={products.length > 0}>
          <List>
            {products.map((product) => (
              <ListItem key={product.productName}>
                <ProductBar
                  productName={product.productName}
                  link={product.link}
                  purchased={product.purchased}
                  onPurchaseProduct={handlePurchaseProduct}
                />
              </ListItem>
            ))}
          </List>
        </Skeleton>
      </Flex>

      <AlertDialog
        isOpen={purchasingName.length > 0}
        onClose={closeDialog}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="semibold">
              Muito obrigado 🥰
            </AlertDialogHeader>

            <AlertDialogBody>Sua ajuda será muito importante para nós!</AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup spacing={2}>
                <Button colorScheme="green" onClick={purchaseProduct}>
                  Confirmar
                </Button>
                <Button colorScheme="red" onClick={closeDialog}>
                  Fica pra depois
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
