import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import People from "../Interfaces/People";
import listType from "../Interfaces/ListType";
import Person from "../Interfaces/Person";
import {Avatar, Button} from "@mui/material";
import '../Styles/List.css'
import {TailSpin} from "react-loader-spinner";
import Loader from "./Loader";
import DisplayGender from "./DisplayGender";

interface IList {
    listType: string,
    category: string,
    updateJokeCategory: (arg: string) => void
}

interface IFunc {
    listType: string,
    updateJokeCategory: (arg: string) => void
}

interface Gender {
    gender: string
}

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
}

const GetJokeCategories = (props: IFunc) => {
    const [categoryData, setCategoryData] = useState<string[]>();
    const [isBusy, setBusy] = useState<boolean>(true);
    console.log('entering GetJokeCategories Function')

    useEffect(() => {
        async function FetchData() {
            console.log('Fetching people data now');
            const response = await fetch("https://localhost:7176/Chuck/categories");
            const body: string[] = await response.json();
            const upper = body.map(element => {
                return toTitleCase(element);
            });
            setCategoryData(upper);
            console.log('category data set as: ' + categoryData)
        }

        FetchData()
            .then(() => {
                setBusy(false);
            });
    }, []);

    console.log('returning: ' + categoryData)
    if (isBusy) {
        return <Loader></Loader>;
    } else if (categoryData !== undefined && categoryData.length > 0) {
        console.log('Mapping category data: ', categoryData);

        return <> {categoryData.map((value: string) =>

            <ListItem
                key={value}
                secondaryAction={<Button variant={"contained"} color={"secondary"} onClick={(e) => {
                    props.updateJokeCategory(value.toLowerCase())
                }}>Get Joke</Button>}
            >
                <ListItemText
                    primary={value}
                />
            </ListItem>)}</>
    } else {
        return <Loader></Loader>;
    }
};

const GetPeople = (listType: listType) => {
    const [peopleData, setPeopleData] = useState<People[]>();
    const [allPeople, setAllPeople] = useState<Person[]>();
    const [isBusy, setBusy] = useState<boolean>(true);

    console.log('entering GetPeople Function')

    useEffect(() => {
        async function FetchData() {
            console.log('Fetching people data now');
            const response = await fetch("https://localhost:7176/Swapi/people");
            const body: People[] = await response.json();
            setPeopleData(body);
            console.log('people data set as: ' + peopleData)
            let peopleArr: Person[] = [];
            peopleData?.map((p) => {
                p.results.map((person) => {
                    peopleArr.push(person);
                })
            })
            setAllPeople(peopleArr);
            /* setTimeout(() => (2500));
             console.log('timeout done');*/
        }

        FetchData()
            .then(() => {
                console.log(allPeople);
                console.log('setting busy to false in GetPeople');
                setBusy(false);

            });
    }, [isBusy]);


    if (isBusy) {
        console.log('Loading Fetch for people!');
        return <Loader></Loader>;
    } else if (allPeople === undefined || allPeople.length === 0) {

        return <Loader></Loader>;

    } else {

        return <> {allPeople.map((value: Person) =>

            <ListItem key={value.name} className='listItem' secondaryAction={<Avatar alt={value.homeworld}
                                                                                     src={'https://ui-avatars.com/api/?name=' + value.name}/>}>
                <ListItemIcon>

                    <DisplayGender gender={value.gender}></DisplayGender>
                </ListItemIcon>

                <ListItemText
                    primary={value.name}
                    secondary={'Born: ' + value.birth_year + ' - Height: ' + value.height + ' - Mass: ' + value.mass}
                />
            </ListItem>)}</>
    } /*else {
        return <span>Still Loading People</span>
    }*/
}

function Display(props: IFunc) {
    return (props.listType === 'Categories' ? <GetJokeCategories updateJokeCategory={props.updateJokeCategory}
                                                                 listType={props.listType}></GetJokeCategories> :
        <GetPeople listType={props.listType}></GetPeople>)
}

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));
//listType: listType
export default function InteractiveList(iList: IList) {

    return (<Box sx={{flexGrow: 1, maxWidth: 752}} className='listBox'>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    {iList.listType}
                </Typography>
                <Demo>
                    <List dense={false}>
                        <Display updateJokeCategory={iList.updateJokeCategory}
                                 listType={iList.listType}></Display>
                    </List>
                </Demo>
            </Grid>
        </Grid>
    </Box>);
}