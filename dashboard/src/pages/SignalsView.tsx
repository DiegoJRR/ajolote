import { Box, HStack, Select } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import SignalsTable from '../components/SignalsTable';
import TimeSeriesChart, {
    TimeSeries,
    TSDataPoint,
} from '../components/TimeSeriesChart';
import useSignals from '../hooks/useSignals';
import useUser from '../hooks/useUser';
import { descriptiveSignalType } from '../utils';



const signalMatching = (signalType: string) => {
    switch (signalType) {
        case 'systolic':
        case 'diastolic':
            return 'presión arterial';
        default:
            return signalType;
    }
};

const SignalsView = () => {
    const { user } = useUser();
    const signals = useSignals(user.id);
    const [selectedSignal, setSelectedSignal] = useState<string>('bpm');
    const signalsTimeSeries: Map<string, TimeSeries[]> | undefined =
        useMemo(() => {
            const datasets = new Map<string, TimeSeries[]>();
            signals.forEach((signal) => {
                const signalType = signalMatching(signal.type);
                if (!datasets.get(signalType)) {
                    datasets.set(signalType, [
                        {
                            label: signal.type,
                            data: [],
                        },
                    ]);
                } else {
                    const hasSignal =
                        datasets
                            .get(signalType)
                            ?.findIndex(
                                (dataset) => dataset.label == signal.type
                            ) != -1;
                    if (!hasSignal) {
                        datasets.get(signalType)?.push({
                            label: signal.type,
                            data: [],
                            color: 'rgb(30,129,176)'
                        });
                    }
                }

                const targetDataset = datasets
                    .get(signalType)
                    ?.find((dataset) => dataset.label == signal.type);

                // @ts-ignore
                targetDataset?.data.push({
                    // @ts-ignore
                    date: new Date(signal?.created_at),
                    value: signal.value,
                });
            });

            if (datasets.size == 0) return undefined;

            return datasets;
        }, [signals]);

    return (
        <Box>
            {signalsTimeSeries && (
                <Select onChange={(e) => setSelectedSignal(e.target.value)}>
                    {Array.from(signalsTimeSeries?.entries()).map((entry) => (
                        <option value={entry[0]}>
                            {descriptiveSignalType(entry[0])}
                        </option>
                    ))}
                </Select>
            )}
            <Box width={'100%'} minH="200px" m={3}>
                {signalsTimeSeries &&
                signalsTimeSeries.get(selectedSignal) != undefined ? (
                    <TimeSeriesChart
                        // @ts-ignore
                        timeSeries={signalsTimeSeries.get(selectedSignal)}
                    ></TimeSeriesChart>
                ) : null}
            </Box>

            <SignalsTable signals={signals}></SignalsTable>
        </Box>
    );
};

export default SignalsView;
