import { Box, Heading } from '@chakra-ui/react';

export function Header(): JSX.Element {
  return (
    <Box as="header" w="100vw" bg="#273FAD" textAlign="center" pt="12" pb="48">
      <Heading color="white" fontWeight="semibold">
        Lista de desejos
      </Heading>
    </Box>
  );
}
