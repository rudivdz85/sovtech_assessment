import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import Joke from "../Interfaces/Joke";

interface Category {
    category: string
}

const GetRandomJoke = (category: Category) => {
    const [jokeData, setJokeData] = useState<Joke>();
    const [isBusy, setBusy] = useState<boolean>(true);
    console.log('Entering GetRandomJoke Function')

    useEffect(() => {
        async function FetchData() {
            console.log('Fetching people data now');
            const response = await fetch("https://api.chucknorris.io/jokes/random?category=" + category.category);
            const body: Joke = await response.json();
            setJokeData(body);
            console.log('Joke data set as: ' + jokeData)
        }

        FetchData()
            .then(() => {
                console.log('setting busy to false in GetRandomJoke');
                setBusy(false);
            });
    }, []);

    if (isBusy) {
        console.log('Loading Fetch for random joke!');
        return <span>Loading Fetch for Joke</span>
    } else if (jokeData !== undefined) {

        return (<Typography variant="body2" color="text.secondary">
                {jokeData?.value}
            </Typography>)
    } else {
        return <span>Still Loading People</span>
    }
}


export default function JokeCard(category: Category) {
    return (<Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Categories: (Placeholder)
                </Typography>
                <GetRandomJoke category={category.category}></GetRandomJoke>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>);
}