import { Box } from '@chakra-ui/react';

const ViewContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box w="100%" flex={1} overflowY="scroll">
            {children}
        </Box>
    );
};

export default ViewContainer;
