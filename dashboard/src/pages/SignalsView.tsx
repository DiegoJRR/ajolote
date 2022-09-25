import { HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import SignalsTable from '../components/SignalsTable';
import TimeSeriesChart from '../components/TimeSeriesChart';

const SignalsView = () => {

    
    // const fakeData = useMemo}(() => {
    //     const startDate = new Date().getTime() - 1000 * 60 * 60 * 24 * 30 
    //     for (let i = 0; i < )
    // }, []);

    return (
        <HStack>
            {/* <TimeSeriesChart></TimeSeriesChart> */}
            <SignalsTable></SignalsTable>
        </HStack>
    );
};

export default SignalsView;
