import { Tr, Td } from '@chakra-ui/react';
import { useState } from 'react';

import { definitions } from '../types/supabase';
import EntityTable from './EntityTable';
import { useCurrentAlerts } from '../hooks/alerts';

export const AlertRow = ({ alert: alert }: { alert: definitions['alert'] }) => {
    const customProps = alert.acknowledge
        ? { bgColor: 'red.100 !important', color: 'red.600' }
        : {};
    return (
        <Tr {...customProps}>
            <Td>{new Date(alert.created_at ?? '').toLocaleString()}</Td>
            <Td>{alert.message}</Td>
        </Tr>
    );
};

const AlertsTable = ({}) => {
    // @ts-ignore
    const alerts: definitions['alert'][] = useCurrentAlerts();

    return (
        <EntityTable
            headings={['Fecha', 'Mensaje']}
            title="Historial de alertas"
        >
            {alerts.map((alert) => AlertRow({ alert }))}
        </EntityTable>
    );
};

export default AlertsTable;
