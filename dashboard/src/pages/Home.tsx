import {
    Alert,
    AlertIcon,
    Box,
    Container,
    HStack,
    VStack,
} from '@chakra-ui/react';
import AlertsTable from '../components/AlertsTable';
import SignalsTable from '../components/SignalsTable';
import { definitions } from '../types/supabase';

const Home = () => {
    const currentAlert: definitions['alert'] = {
        id: 123,
        created_at: new Date().toUTCString(),
        insight: 124,
        severity: 2,
        message: 'una alerta',
        user: '123',
        acknowledge: true,
    };

    return (
        <Box w="100%" p={4} height="100%">
            <Alert status="error" mb={3}>
                <AlertIcon />
                {currentAlert.message}
            </Alert>
            <HStack align={'stretch'}>
                <SignalsTable></SignalsTable>
                <AlertsTable></AlertsTable>
            </HStack>
        </Box>
    );
};

export default Home;
