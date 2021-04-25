import { Box, Button, Text, ButtonGroup } from '@chakra-ui/react';

interface ProductBarProps {
  productName: string;
  link: string;
  purchased?: boolean;
  onPurchaseProduct: (name: string) => void;
}

export function ProductBar({
  productName,
  link,
  purchased = false,
  onPurchaseProduct,
}: ProductBarProps): JSX.Element {
  return (
    <Box
      display={{ md: 'flex' }}
      alignItems={{ md: 'center' }}
      justifyContent={{ md: 'space-between' }}
      py="4"
      borderBottom="1px"
      borderColor="#EBEBEB"
    >
      <Text fontSize="lg" mr="4" marginBottom={{ base: '4', md: '0' }} display="block">
        {productName}
      </Text>
      {purchased ? (
        <Text>Já garantido 🥰</Text>
      ) : (
        <ButtonGroup size="md" spacing="1">
          <Button as="a" colorScheme="blue" href={link}>
            Ver sugestão
          </Button>
          <Button colorScheme="green" onClick={() => onPurchaseProduct(productName)}>
            Vou ajudar
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
}
