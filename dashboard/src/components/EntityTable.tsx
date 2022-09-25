import {
    VStack,
    Heading,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Text,
} from '@chakra-ui/react';
import Card from './Card';

const EntityTable = ({
    title,
    headings,
    children,
    empty,
    emptyMessage,
}: {
    title?: string;
    headings: string[];
    children?: React.ReactNode;
    emptyMessage?: string;
    empty?: boolean;
}) => {
    return (
        <Card p={2} minH="100px">
            <VStack align={'left'}>
                {title && (
                    <Heading size={'sm'} alignSelf="center">
                        {title}
                    </Heading>
                )}
                {empty == undefined || !empty ? (
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
                ) : (
                    <Text>{emptyMessage}</Text>
                )}
            </VStack>
        </Card>
    );
};

export default EntityTable;
