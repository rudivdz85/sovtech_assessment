import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import React, {ReactElement, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Person from "../Interfaces/Person";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import SearchedItems from "../Interfaces/SearchedItem";
import Joke from "../Interfaces/Joke";

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
        return <span>Loading Fetch for People</span>
    } else if (itemData !== undefined) {

        if (itemData.people.results.length > 0) {
            elementArray.push(<Grid item xs={6} md={6} lg={6}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    People:
                </Typography>
                <Demo>
                    <List dense={true}>
                        {itemData.people.results?.map((value: Person) => <ListItem
                            key={value.name}
                            secondaryAction={<IconButton edge="end" aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>}
                        >
                            <ListItemText
                                primary={value.name}
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
                                key={value.id}
                                secondaryAction={<IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>}
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

        return <Grid container-spacing={2} container direction={'row'}>{elementArray}</Grid>;

    } else {
        return <span>Still Loading Searched Items</span>
    }
}

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

const SearchDisplay = (searchString: SearchString) => {
    return (<GetSearchedItems searchString={searchString.searchString}></GetSearchedItems>)
}

export default SearchDisplay;