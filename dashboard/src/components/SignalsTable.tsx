import { Tr, Td } from '@chakra-ui/react';
import { useState } from 'react';
import useSignals from '../hooks/useSignals';
import useUser from '../hooks/useUser';

import { definitions } from '../types/supabase';
import { descriptiveSignalType } from '../utils';
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

const SignalsTable = ({signals}: {signals: definitions['signal'][]}) => {
    // @ts-ignore
    const { user } = useUser();
    // const signals = useSignals(user.id);

    console.log('TABLE SIGNALS', signals);

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
