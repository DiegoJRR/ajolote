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
} from '@chakra-ui/react';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
    return (
        <div>
            <Nav></Nav>
            <Home />
        </div>
    );
}

export default App;
