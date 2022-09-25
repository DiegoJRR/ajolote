import { Box, Flex, Heading } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Box
      h="100%"
      w="100%"
      borderBottomWidth={1}
      bgColor="pink.300"
      color="white"
    >
      <Flex alignItems="center" justifyContent="space-around" w="100%">
        <Heading>Ajolote</Heading>
      </Flex>
    </Box>
  );
};

export default Nav;
