import {
    VStack,
    Heading,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
} from '@chakra-ui/react';
import Card from './Card';
import { SignalRow } from './SignalsTable';

const EntityTable = ({
    title,
    headings,
    children,
}: {
    title?: string;
    headings: string[];
    children?: React.ReactNode;
}) => {
    return (
        <Card p={2}>
            <VStack align={'left'}>
                {title && (
                    <Heading size={'sm'} alignSelf="center">
                        {title}
                    </Heading>
                )}
                <TableContainer>
                    <Table variant="simple" colorScheme={'gray'} size="sm">
                        <Thead>
                            <Tr>
                                {headings.map((heading) => (
                                    <Th>{heading}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>{children}</Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </Card>
    );
};

export default EntityTable;
