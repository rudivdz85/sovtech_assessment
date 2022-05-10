import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import People from "../Interfaces/People";
import listType from "../Interfaces/ListType";
import Person from "../Interfaces/Person";

const GetJokeCategories = (listType: listType) => {
    const [categoryData, setCategoryData] = useState<string[]>();
    const [isBusy, setBusy] = useState<boolean>(true);
    console.log('entering GetJokeCategories Function')

    useEffect(() => {
        async function FetchData() {
            console.log('Fetching people data now');
            const response = await fetch("https://localhost:7176/Chuck/categories");
            const body: string[] = await response.json();
            setCategoryData(body);
            console.log('category data set as: ' + categoryData)
        }

        FetchData()
            .then(() => {
                setBusy(false);
            });
    }, []);

    console.log('returning: ' + categoryData)
    if (isBusy) {
        return <span>Loading Fetch for Categories</span>
    } else if (categoryData !== undefined && categoryData.length > 0) {
        console.log('Mapping category data: ', categoryData);

        return <> {categoryData.map((value: string) =>

            <ListItem
                key={value}
                secondaryAction={<IconButton edge="end" aria-label="delete">
                    <DeleteIcon/>
                </IconButton>}
            >
                <ListItemText
                    primary={value}
                />
            </ListItem>)}</>
    } else {
        return <span>Still Loading Categories</span>
    }
};

const GetPeople = (listType: listType) => {
    const [peopleData, setPeopleData] = useState<People>();
    const [isBusy, setBusy] = useState<boolean>(true);
    console.log('entering GetPeople Function')

    useEffect(() => {
        async function FetchData() {
            console.log('Fetching people data now');
            const response = await fetch("https://localhost:7176/Swapi/people");
            const body: People = await response.json();
            setPeopleData(body);
            console.log('people data set as: ' + peopleData)
        }

        FetchData()
            .then(() => {
                console.log('setting busy to false in GetPeople');
                setBusy(false);
            });
    }, []);


    if (isBusy) {
        console.log('Loading Fetch for people!');
        return <span>Loading Fetch for People</span>
    } else if (peopleData !== undefined && peopleData.results.length > 0) {

        return <> {peopleData?.results.map((value: Person) =>

            <ListItem
                key={value.name}
                secondaryAction={<IconButton edge="end" aria-label="delete">
                    <DeleteIcon/>
                </IconButton>}
            >
                <ListItemText
                    primary={value.name}
                />
            </ListItem>)}</>
    } else {
        return <span>Still Loading People</span>
    }
}

function Display(listType: listType) {
    return (listType.listType === 'Categories' ? <GetJokeCategories listType={listType.listType}></GetJokeCategories> :
        <GetPeople listType={listType.listType}></GetPeople>)
}

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList(listType: listType) {

        return (<Box sx={{flexGrow: 1, maxWidth: 752}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                        {listType.listType}
                    </Typography>
                    <Demo>
                        <List dense={true}>
                            <Display listType={listType.listType}></Display>
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>);
}