import React, { useState } from 'react'
import { Button, Card, Image, Icon, Header, Modal } from 'semantic-ui-react'
import './styles.css'
import IMG from '../daniel.jpg'
import SellPlayer from './SellPlayer'

const PlayerDetails = (props) => {
console.log('props', props)
    const {playerName, playerDOB, playerSpeciality, playerLocation} = props.playerDetails;
    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        console.log("Handle Clicked")
        setShowComponent(true);
    };

    const handleClose = () => {
        setShowComponent(false);
    };

    const getAge = (playerDOB) => {
        const dobParts = playerDOB.split('/');
        const dobDate = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);
        const currentDate = new Date();
        const ageInYears = Math.floor((currentDate - dobDate) / (365.25 * 24 * 60 * 60 * 1000));
        return ageInYears
    };

    return (
        <>
        <div className='player-card-div'>
            <Card.Group>
                <Card className='player-card'>
                    <Image src='' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header className='player-header'>{playerName}</Card.Header>
                        <Card.Meta>{playerLocation}</Card.Meta>
                        <Card.Description>{playerSpeciality} </Card.Description>
                        <Card.Description>{getAge(playerDOB)}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button color='teal' size='massive' floated='left' onClick={handleClick}>Sold</Button>
                            <Button.Or />
                            <Button color='yellow' size='massive' floated='right'>Unsold</Button>
                        </div>
                    </Card.Content>
                </Card>

            </Card.Group>

        </div>
        {showComponent && (<SellPlayer showComponent={showComponent} handleClose={handleClose} playerName={playerName}/>) }
        </>
    )
}

export default PlayerDetails