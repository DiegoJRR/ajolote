import { Container, Flex, Heading } from '@chakra-ui/react';

const Nav = () => {
    return (
        <Container
            py={3}
            w="100%"
            borderBottomWidth={1}
            bgColor="teal"
            color="white"
        >
            <Flex alignItems="center" justifyContent="space-around" w="100%">
                <Heading>Alojote</Heading>
            </Flex>
        </Container>
    );
};

export default Nav;
