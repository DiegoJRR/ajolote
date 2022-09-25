import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
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
    Grid,
    GridItem,
} from '@chakra-ui/react';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
    return (
        <Grid
            templateAreas={`"header header"
                      "nav main"
                      "nav main"`}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'150px 1fr'}
            h="100vh"
            color="blackAlpha.700"
            fontWeight="bold"
        >
            <GridItem bg="orange.300" area={'header'}>
                <Nav></Nav>
            </GridItem>
            <GridItem bg="pink.300" area={'nav'}>
                Nav
            </GridItem>
            <GridItem bg="green.300" area={'main'}>
                <Home></Home>
            </GridItem>
        </Grid>
        // <Box w="100%">
        //
        //     <Home></Home>
        // </Box>
    );
}

export default App;
