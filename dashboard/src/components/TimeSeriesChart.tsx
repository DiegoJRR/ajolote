import { useMemo } from 'react';
import { Chart, AxisOptions } from 'react-charts';
import { Scatter, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeSeriesScale,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-moment';

export type TSDataPoint = {
    date: Date;
    value: number;
};

export type TimeSeries = {
    label: string;
    color?: string;
    data: TSDataPoint[];
};

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

const TimeSeriesChart = ({ timeSeries }: { timeSeries: TimeSeries[] }) => {
    return (
        <Scatter
            height={'100px'}
            options={{
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                        },
                    },
                },
            }}
            data={{
                // labels: timeSeries.data.map((dp) => dp.date.toLocaleString()),
                datasets: timeSeries.map((ts) => ({
                    data: ts.data.map((dp) => ({
                        x: dp.date,
                        y: dp.value,
                    })),
                    label: ts.label,
                    backgroundColor: ts?.color ?? 'rgba(255, 99, 132, 1)',
                })),
            }}
        />
    );
};

export default TimeSeriesChart;
