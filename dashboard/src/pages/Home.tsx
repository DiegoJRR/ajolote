import { Box, Container, VStack } from '@chakra-ui/react';
import SignalsTable from '../components/SignalsTable';

const Home = () => {
    return (
        <Box w="100%" p={4} height="100%">
            <VStack>
                <SignalsTable></SignalsTable>
            </VStack>
        </Box>
    );
};

export default Home;
