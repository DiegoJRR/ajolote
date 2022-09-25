import {
    Alert,
    AlertIcon,
    Box,
    Select,
    VStack,
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import ViewContainer from '../components/ViewContainer';
import useLastAlert from '../hooks/useLastAlert';
import useUser from '../hooks/useUser';
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

    const { user } = useUser();
    const { lastAlert, acknowledge } = useLastAlert(user.id);

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
            {lastAlert ? (
                <Alert status="error" mb={3}>
                    <Flex
                        flexDir={'row'}
                        align="center"
                        w="100%"
                        justify={'space-between'}
                    >
                        <Flex flexDir={'row'} align="center">
                            <AlertIcon />
                            {lastAlert.message}
                        </Flex>
                        <Button
                            justifySelf={'flex-end'}
                            variant="outline"
                            colorScheme={'red'}
                            onClick={() => acknowledge(lastAlert)}
                        >
                            {' '}
                            OK
                        </Button>
                    </Flex>
                </Alert>
            ) : null}
            <Flex
                flexDir="column"
                w="100%"
                flex={1}
                rowGap={2}
                overflowY="scroll"
            >
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
