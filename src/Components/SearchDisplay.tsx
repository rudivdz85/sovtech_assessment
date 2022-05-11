import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import React, {ReactElement, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Person from "../Interfaces/Person";
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchedItems from "../Interfaces/SearchedItem";
import Joke from "../Interfaces/Joke";
import Loader from "./Loader";
import {Avatar, Button} from "@mui/material";
import DisplayGender from "./DisplayGender";
import '../Styles/SearchDisplay.css'

interface SearchString {
    searchString: string | null
}

const GetSearchedItems = (searchString: SearchString) => {
    const [itemData, setItemData] = useState<SearchedItems>();
    const [isBusy, setBusy] = useState<boolean>(true);
    console.log('entering GetSearchedItems Function')

    useEffect(() => {
        async function FetchData() {
            console.log('Fetching people data now');
            const response = await fetch("https://localhost:7176/Search?query=" + searchString.searchString);
            //console.log('response: ' + response.json())
            const body: SearchedItems = await response.json();
            setItemData(body);
            console.log('Searched Item data set as: ' + itemData)
        }

        FetchData()
            .then(() => {
                console.log('setting busy to false in GetPeople');
                setBusy(false);
            });
    }, []);


    let elementArray: ReactElement[] = [];

    if (isBusy) {
        console.log('Loading Fetch for people!');
        return <Loader></Loader>;
    } else if (itemData !== undefined) {

        if (itemData.people.results.length > 0) {
            elementArray.push(<Grid item xs={6} md={6} lg={6}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    People:
                </Typography>
                <Demo>
                    <List dense={true}>
                        {itemData.people.results?.map((value: Person) => <ListItem
                            className='listItem'
                            key={value.name}
                            secondaryAction={<Avatar alt={value.homeworld}
                                                     src={'https://ui-avatars.com/api/?name=' + value.name}/>}
                        >
                            <ListItemIcon>

                                <DisplayGender gender={value.gender}></DisplayGender>
                            </ListItemIcon>
                            <ListItemText
                                primary={value.name}
                                secondary={'Born: ' + value.birth_year + ' - Height: ' + value.height + ' - Mass: ' + value.mass}
                            />
                        </ListItem>)}
                    </List>
                </Demo>
            </Grid>)

        } else {
            elementArray.push(<Grid item xs={6} md={6}>
                <span>No People Results</span>
            </Grid>)
        }

        if (itemData.jokes.result.length > 0) {
            elementArray.push(<Grid item xs={6} md={6} lg={6}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    Jokes:
                </Typography>
                <Demo>
                    <List dense={true}>
                        {itemData.jokes.result?.map((value: Joke) =>

                            <ListItem
                                className='listItem'
                                key={value.id}
                            >
                                <ListItemText
                                    primary={value.value}
                                />
                            </ListItem>)}
                    </List>
                </Demo>
            </Grid>)
        } else {
            elementArray.push(<Grid item xs={6} md={6}>
                <span>No Joke Results</span>
            </Grid>)
        }

        return <Grid className='listBox' container-spacing={4} container direction={'row'}>{elementArray}</Grid>;

    } else {
        return <Loader></Loader>;
    }
}

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

const SearchDisplay = (searchString: SearchString) => {
    return (<GetSearchedItems searchString={searchString.searchString}></GetSearchedItems>)
}

export default SearchDisplay;