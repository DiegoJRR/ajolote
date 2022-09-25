import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
    return (
        <Grid
            templateAreas={`"header"
                      "main"
                      "main"`}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'1fr'}
            h="100vh"
            color="blackAlpha.700"
            fontWeight="bold"
        >
            <GridItem area={'header'}>
                <Nav></Nav>
            </GridItem>
            <GridItem area={'main'}>
                <Home></Home>
            </GridItem>
        </Grid>
    );
}

export default App;
