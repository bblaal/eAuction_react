import React, { useState, useEffect } from 'react'
import { Button, Card, Item } from 'semantic-ui-react'
import PlayerDetails from './PlayerDetails'
import './styles.css'

const Bidcenter = () => {

    const [num, setNum] = useState(0);

    const axios = require('axios');
    const urlString = "http://localhost:8082/players/api/v1/players";
    const [allPlayers, setAllPlayers] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);

    let playersId = [];
    useEffect(() => {
        axios.get(urlString, {
        
    })
        .then(function (response) {
            console.log(response);
            setAllPlayers(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [axios]);

    
    allPlayers.forEach((item, index) => {
        playersId.push(item.playerId)
    });

    const randomNumberInRange = (min, max) => {
        const playerIndex = Math.floor(Math.random()
            * (max - min + 1)) + min;
        setPlayerDetails(allPlayers[playerIndex]);
        return playersId[playerIndex];
    };

    const handleClick = () => {
        setNum(randomNumberInRange(0, allPlayers.length - 1));
    };

    return (
        <div className='random-card-div'>
            <Card.Group>
                <Card className='random-card'>
                    <Card.Content>
                        <Card.Header><strong>Next Bid</strong></Card.Header>
                        <Card.Description className='random-digit'>{num}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button size='massive' color='green' content='Next Bid' icon='right arrow' labelPosition='right' onClick={handleClick}>

                            </Button>
                        </div>
                    </Card.Content>
                </Card>
                {num !==0 && <PlayerDetails playerDetails={playerDetails}/>}
            </Card.Group>

        </div>
    );


}

export default Bidcenter