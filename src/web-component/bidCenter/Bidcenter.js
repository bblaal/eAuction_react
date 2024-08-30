import React, { useState, useEffect } from 'react';
import { Button, Card, Input } from 'semantic-ui-react';
import PlayerDetails from './PlayerDetails';
import './styles.css';
import axios from 'axios';

const Bidcenter = () => {
    const [num, setNum] = useState(0);
    const [allPlayers, setAllPlayers] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const urlString = "http://localhost:8082/auctionedPlayers/api/v1/players";

    const handleLogin = () => {
        axios.get(urlString, {
            auth: {
                username: username,
                password: password
            }
        })
        .then(function (response) {
            console.log(response);
            setAllPlayers(response.data);
            setIsAuthenticated(true);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const randomNumberInRange = (min, max) => {
        const playerIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        setPlayerDetails(allPlayers[playerIndex]);
        return allPlayers[playerIndex].playerId;
    };

    const handleClick = () => {
        setNum(randomNumberInRange(0, allPlayers.length - 1));
    };

    return (
        <div className='random-card-div'>
            {!isAuthenticated ? (
                <div>
                    <Input 
                        placeholder='Username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <Input 
                        placeholder='Password' 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button onClick={handleLogin}>Login</Button>
                </div>
            ) : (
                <Card.Group>
                    <Card className='random-card'>
                        <Card.Content>
                            <Card.Header><strong>Next Bid</strong></Card.Header>
                            <Card.Description className='random-digit'>{num}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button size='massive' color='green' content='Next Bid' icon='right arrow' labelPosition='right' onClick={handleClick} />
                            </div>
                        </Card.Content>
                    </Card>
                    {num !== 0 && <PlayerDetails username={username} password={password} playerDetails={playerDetails} />}
                </Card.Group>
            )}
        </div>
    );
};

export default Bidcenter;
