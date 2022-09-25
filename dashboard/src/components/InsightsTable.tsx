import { Tr, Td } from '@chakra-ui/react';
import { useState } from 'react';
import useInsight from '../hooks/useInsight';

import { definitions } from '../types/supabase';
import { descriptiveSignalType } from '../utils';
import EntityTable from './EntityTable';

const InsightRow = ({
    signal: insight,
}: {
    signal: definitions['insight'];
}) => {
    return (
        <Tr>
            <Td>{new Date(insight.created_at ?? '').toLocaleString()}</Td>
            <Td>{insight?.value?.type ?? 'NA'}</Td>
        </Tr>
    );
};

const InsightsTable = ({}) => {
    // @ts-ignore
    // const [insights, setInsights] = useState<definitions['insight'][]>([
    //     {
    //         id: 123,
    //         created_at: new Date().toUTCString(),
    //         user: 'string',
    //         value: {
    //             value: 123,
    //             type: 'high bpm',
    //             signals: ['bpm'],
    //         },
    //     } as definitions['insight'],
    // ]);

    const insights = useInsight();

    return (
        <EntityTable
            headings={['Fecha', 'Observación']}
            title="Historial de observaciones"
        >
            {insights.map((insight) => InsightRow({ signal: insight }))}
        </EntityTable>
    );
};

export default InsightsTable;
