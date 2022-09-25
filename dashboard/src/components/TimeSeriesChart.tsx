import { useMemo } from 'react';
import { Chart, AxisOptions } from 'react-charts';

export type TSDataPoint = {
    date: Date;
    value: number;
};

export type TimeSeries = {
    label: string;
    data: TSDataPoint[];
};

const TimeSeriesChart = ({ timeSeries }: { timeSeries: TimeSeries[] }) => {
    const primaryAxis = useMemo(
        (): AxisOptions<TSDataPoint> => ({
            getValue: (datum) => datum.date,
        }),
        []
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<TSDataPoint>[] => [
            {
                getValue: (datum) => datum.value,
            },
        ],
        []
    );

    return (
        <Chart
            options={{
                timeSeries,
                // @ts-ignore
                primaryAxis,
                // @ts-ignore
                secondaryAxes,
            }}
        />
    );
};

export default TimeSeriesChart;
