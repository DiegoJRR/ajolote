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
import EntityTable from './EntityTable';

export const AlertRow = ({
    signal: alert,
}: {
    signal: definitions['alert'];
}) => {
    const customProps = alert.acknowledge ? { bgColor: 'red.100 !important', color: 'red.600' } : {};
    return (
        <Tr {...customProps}>
            <Td>{new Date(alert.created_at ?? '').toLocaleString()}</Td>
            <Td>{alert.message}</Td>
        </Tr>
    );
};

const AlertsTable = ({}) => {
    // @ts-ignore
    const [alerts, setAlerts] = useState<definitions['alert'][]>([
        {
            id: 123,
            created_at: new Date().toUTCString(),
            insight: 124,
            severity: 2,
            message: 'una alerta',
            user: '123',
            acknowledge: true,
        },
        {
            id: 123,
            created_at: new Date().toUTCString(),
            insight: 124,
            severity: 2,
            message: 'una alerta',
            user: '123',
            acknowledge: true,
        },
    ]);

    return (
        <EntityTable
            headings={['Fecha', 'Mensaje']}
            title="Historial de alertas"
        >
            {alerts.map((signal) => AlertRow({ signal }))}
        </EntityTable>
    );
};

export default AlertsTable;
