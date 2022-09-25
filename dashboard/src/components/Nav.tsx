import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { CurrentAlerts } from '../hooks/test';

const Nav = () => {
    let alerts = CurrentAlerts();
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
