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

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const options:string[] = ['one','two','three']

/*let menuOption:string = 'Categories';


function ChangeMenuOption(menuChoice:string){
    menuOption = menuChoice;
    console.log('menu option is: ',menuOption)
}*/

const theme = createTheme();

function Layout() {

    console.log('render layout');

    const [menuOption, setMenuOption] = useState<string>('Categories');
    /*function MenuChange(menuOption:string){

    }*/


    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
                <Breadcrumbs aria-label="breadcrumb" className='links'>
                    <Button color="inherit" onClick={(e) => setMenuOption('Categories')}>Jokes</Button>
                    <Button color="inherit" onClick={(e) => setMenuOption('People')}>People</Button>
                </Breadcrumbs>
                <Autocomplete
                    className='autocomplete'
                    disablePortal={false}
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search for jokes or people..." />}
                />
            </Toolbar>

        </AppBar>
        <main>
            <Container sx={{ py: 3 }} maxWidth="md">
               <InteractiveList listType={menuOption}></InteractiveList>
            </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Something here to give the footer a purpose!
            </Typography>
            <Copyright />
        </Box>
        {/* End footer */}
    </ThemeProvider>
    )
}

export default Layout