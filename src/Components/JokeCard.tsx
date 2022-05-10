import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ReactElement, useEffect, useState} from "react";
import Joke from "../Interfaces/Joke";
import Grid from "@mui/material/Grid";

interface Category {
    category: string
}

interface Categories {
    categories: string[]
}


const PopCategories = (categories: Categories) => {
    let elementArr: ReactElement[] = [];
    if (categories != null || categories !== undefined) {
        categories?.categories.forEach((category) => {
            elementArr.push(<span key={category}>{category}</span>)
        })
    } else elementArr.push(<span>None</span>);

    return <span>{elementArr}</span>;
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

        //alert(jokeData.icon_url);

        return (<div style={{display: 'flex', justifyContent: 'center'}}>
            <Card sx={{maxWidth: 345}}>
                <CardMedia
                    component="img"
                    height="100"
                    src={'https://picsum.photos/100'}
                    alt="Icon"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Categories: <PopCategories categories={jokeData.categories}></PopCategories>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {jokeData?.value}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Exit</Button>
                    <Button size="small">New Joke</Button>
                </CardActions>
            </Card>
        </div>)
    } else {
        return <span>Still Loading People</span>
    }
}


const JokeCard = (category: Category) => {

    return (<GetRandomJoke category={category.category}></GetRandomJoke>)
}

export default JokeCard;