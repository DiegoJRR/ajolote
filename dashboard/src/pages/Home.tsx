import {
    Alert,
    AlertIcon,
    Box,
    Select,
    VStack,
    Text,
    Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import ViewContainer from '../components/ViewContainer';
import { definitions } from '../types/supabase';
import AlertsView from './AlertsView';
import InsightsView from './InsightsView';
import SignalsView from './SignalsView';

enum View {
    Summary = 'Resumen',
    Alerts = 'Alertas',
    Signals = 'Indicadores',
    Insights = 'Observaciones',
}
console.log(Object.keys(View));
const Home = () => {
    const [currentView, setCurrentView] = useState<View>(View.Summary);
    const currentAlert: definitions['alert'] = {
        id: 123,
        created_at: new Date().toUTCString(),
        insight: 124,
        severity: 2,
        message: 'una alerta',
        user: '123',
        acknowledge: true,
    };

    const getView = (view: View): React.ReactNode => {
        switch (view) {
            case View.Alerts:
                return <AlertsView></AlertsView>;
            case View.Signals:
                return <SignalsView></SignalsView>;
            case View.Insights:
                return <InsightsView></InsightsView>;
        }

        return <></>;
    };

    return (
        <Flex flexDir="column" w="100%" p={4} height="100%">
            <Alert status="error" mb={3}>
                <AlertIcon />
                {currentAlert.message}
            </Alert>
            <Flex flexDir="column" w="100%" flex={1} rowGap={2}>
                <Box>
                    <VStack align="left">
                        <Text>Vista actual</Text>
                        <Select
                            onChange={(event) =>
                                setCurrentView(event.target.value as View)
                            }
                        >
                            {/* @ts-ignore  */}
                            <option value={View.Summary}>{'Resumen'}</option>
                            <option value={View.Alerts}>{'Alertas'}</option>
                            <option value={View.Signals}>
                                {'Indicadores'}
                            </option>
                            <option value={View.Insights}>
                                {'Observaciones'}
                            </option>
                        </Select>
                    </VStack>
                </Box>
                <ViewContainer>{getView(currentView)}</ViewContainer>
            </Flex>
        </Flex>
    );
};

export default Home;
