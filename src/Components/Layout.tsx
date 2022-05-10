import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Link from "@mui/material/Link";
import React, {useState} from "react";
import {Breadcrumbs, Button} from "@mui/material";
import '../Styles/Layout.css'
import InteractiveList from "./List";
import People from "../Interfaces/People";
import SearchDisplay from "./SearchDisplay";
import JokeCard from "./JokeCard";

const theme = createTheme();

function Layout() {

    console.log('render layout');

    const [menuOption, setMenuOption] = useState<string>('Categories');
    const [searchValue, setSearchValue] = useState<string>('Search for jokes or people...');
    const [jokeCardCategory, setJokeCarCategory] = useState<string>('');
    const [displayLists, setDisplayLists] = useState<boolean>(true);
    const [displayJokeCard, setDisplayJokeCard] = useState<boolean>(false);
    const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(false);


    function ExecSearch() {
        setDisplaySearchResults(true);
        setDisplayLists(false);
        setDisplayJokeCard(false)
    }

    function ExecLists() {
        setDisplaySearchResults(false);
        setDisplayLists(true);
        setDisplayJokeCard(false)
    }

    function ExecCardDisplay() {
        setDisplayJokeCard(true);
        setDisplayLists(false);
        setDisplaySearchResults(false)
    }

    function DisplayComponent() {
        if (displaySearchResults) {
            return <SearchDisplay searchString={searchValue}></SearchDisplay>
        } else if (displayJokeCard) {
            return <JokeCard category={jokeCardCategory}></JokeCard>
        } else {
            return <InteractiveList listType={menuOption} category={jokeCardCategory}
                                    updateJokeCategory={UpdateJokeCategory}></InteractiveList>
        }
    }

    const UpdateJokeCategory = (category: string): void => {
        setJokeCarCategory(category);
        ExecCardDisplay();
        //alert('category from child: ' + category);
    }


    return (<ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position="relative">
            <Toolbar>
                <Breadcrumbs aria-label="breadcrumb" className='links'>
                    <Button color="inherit" onClick={(e) => {
                        setMenuOption('Categories');
                        ExecLists();
                    }}>Jokes</Button>
                    <Button color="inherit" onClick={(e) => {
                        setMenuOption('People');
                        ExecLists();
                    }}>People</Button>
                </Breadcrumbs>
                <TextField id="outlined-basic" label={searchValue} variant="outlined" onBlur={(e) => setSearchValue('')}
                           onChange={(e) => setSearchValue(e.target.value)} onKeyUp={(e) => {
                    if (e.code === "Enter") {
                        ExecSearch();
                    }
                }} InputProps={{
                    endAdornment: <Button color="inherit" onClick={(e) => {
                        ExecSearch()
                    }}>Search</Button>
                }}/>
            </Toolbar>

        </AppBar>
        <main>
            <Container sx={{py: 3}} maxWidth="md">
                <DisplayComponent></DisplayComponent>
            </Container>
        </main>
        {/* Footer */}
        <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Rudi van der Zee
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Sovtech Technical Assessment
            </Typography>
        </Box>
        {/* End footer */}
    </ThemeProvider>)
}

export default Layout