import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    VStack,
    Heading,
} from '@chakra-ui/react';
import { useState } from 'react';

import { definitions } from '../types/supabase';
import { descriptiveSignalType } from '../utils';
import Card from './Card';
import EntityTable from './EntityTable';

export const SignalRow = ({ signal }: { signal: definitions['signal'] }) => {
    return (
        <Tr>
            <Td>{new Date(signal.created_at ?? '').toLocaleString()}</Td>
            <Td>{descriptiveSignalType(signal.type)}</Td>
            <Td>{signal.value}</Td>
        </Tr>
    );
};

const SignalsTable = ({}) => {
    // @ts-ignore
    const [signals, setSignals] = useState<definitions['signal'][]>([
        {
            id: 123,
            created_at: new Date().toUTCString(),
            value: 13212,
            type: 'string',
            user: 'string',
        } as definitions['signal'],
    ]);

    return (
        <EntityTable
            headings={['Fecha', 'Indicador', 'Valor']}
            title="Historial de señales"
        >
            {signals.map((signal) => SignalRow({ signal }))}
        </EntityTable>
    );
};

export default SignalsTable;
