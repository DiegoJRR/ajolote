import { Box, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import SignalsTable from '../components/SignalsTable';
import TimeSeriesChart, {
    TimeSeries,
    TSDataPoint,
} from '../components/TimeSeriesChart';
import useSignals from '../hooks/useSignals';
import useUser from '../hooks/useUser';

const SignalsView = () => {
    const { user } = useUser();
    const signals = useSignals(user.id);
    // @ts-ignore
    const signalsTimeSeries: TimeSeries[] | undefined = useMemo(() => {
        const datasets = new Map<string, TimeSeries>();
        // @ts-ignore
        signals
            .forEach((signal) => {
                if (!datasets.get(signal.type))
                    datasets.set(signal.type, {
                        label: signal.type,
                        data: [],
                    });
                // @ts-ignore
                datasets.get(signal.type).data.push({
                    // @ts-ignore
                    date: new Date(signal?.created_at),
                    value: signal.value,
                });
            });

        if (datasets.size == 0) return undefined;

        const chartData: TimeSeries[] = [];
        datasets.forEach((value, _) => chartData.push(value));

        return chartData;
    }, [signals]);

    return (
        <Box>
            <Box width={'100%'} minH="200px" m={3}>
                {signalsTimeSeries ? (
                    <TimeSeriesChart
                        timeSeries={signalsTimeSeries}
                    ></TimeSeriesChart>
                ) : null}
            </Box>

            <SignalsTable signals={signals}></SignalsTable>
        </Box>
    );
};

export default SignalsView;
