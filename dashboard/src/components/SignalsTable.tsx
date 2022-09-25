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
        <Card p={2}>
            <VStack align={'left'}>
                <Heading size={'sm'} alignSelf='center'>Historial de señales</Heading>
                <TableContainer>
                    <Table variant="striped" colorScheme={'gray'} size="sm">
                        <Thead>
                            <Tr>
                                <Th>Fecha</Th>
                                <Th>Indicador</Th>
                                <Th isNumeric>Valor</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {signals.map((signal) => SignalRow({ signal }))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </Card>
    );
};

export default SignalsTable;
