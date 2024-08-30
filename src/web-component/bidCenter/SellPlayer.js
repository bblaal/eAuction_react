import React, {useState, useEffect} from 'react';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Modal,
  Dropdown,
  Input,
  Label
} from 'semantic-ui-react';
import './styles.css'

function SellPlayer(props) {
  console.log("player: ", props);
  const [firstOpen, setFirstOpen] = React.useState(props.showComponent);
  const [secondOpen, setSecondOpen] = React.useState(false);

  const handleClose = () => {
    setFirstOpen(false);
    setSecondOpen(false);
    props.handleClose(); // Call the handleClose function passed as a prop
  };


    const franchiseeOptions = []

  const axios = require('axios');
  const urlString = "http://localhost:8082/franchisee/api/v1/getAllFranchisees";
  const [allFranchisee, setAllFranchisee] = useState([]);
  const [selectedFranchisee, setSelectedFranchisee] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(urlString, {
      
  })
      .then(function (response) {
          console.log(response);
          setAllFranchisee(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }, [axios]);

    allFranchisee.forEach((item, index) => {
        franchiseeOptions.push(
          {
            key: item.franchiseeId,
            text: item.franchiseeName,
            value: item.franchiseeName,
            image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
          }
        )
      });
    
      const handleFranchiseeChange = (e, { value }) => {
        const selectedOption = franchiseeOptions.find(option => option.value === value);
        console.log("key", selectedOption.key)
        setSelectedFranchisee(selectedOption.key);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

      const sellPlayer = async () => {
        console.log("Player Selling");
        console.log("Selected Franchisee:", selectedFranchisee);
        console.log("Amount:", amount);

        const amountDouble = parseFloat(amount);
        if (isNaN(amountDouble)) {
            console.error("Invalid amount. Please enter a valid number.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8082/auctionedPlayers/api/v1/sell', {
                // Include the necessary payload here
                auth: {
                  username: props.username,
                  password: props.password
              },
                id: "0005",
                playerID: props.playerId, 
                franchiseeID: selectedFranchisee,
                sellingPrice: amountDouble
            });

            console.log("Player sold successfully:", response.data);

            // Perform any state updates or other actions based on the response here
            setSecondOpen(true);
        } catch (error) {
            console.error("Error selling player:", error);
            // Handle error appropriately
        }
    };

  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        style={{ height: '230px', top:'300px', left:'300px' }} // Set a custom height
      >
        <ModalHeader>Trading {props.playerName} To</ModalHeader>
        <ModalContent image>
          <Icon name='right arrow' size='huge' style={{ marginRight: '20px' }} />
          <ModalDescription>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown
                placeholder='Select Franchisee'
                selection
                options={franchiseeOptions}
                onChange={handleFranchiseeChange}
              />
              <Icon size='big' name='at' style={{ marginLeft: '20px', marginRight: '20px' }} />
              <Input labelPosition='right' type='text' placeholder='Amount' onChange={handleAmountChange}>
                <Label basic>₹</Label>
                <input />
                <Label>Lacs</Label>
              </Input>
            </div>
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button onClick={sellPlayer} primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </ModalActions>

        {/* Secondary Modal */}
        <Modal onClose={handleClose} open={secondOpen} style={{ height: '200px', top:'300px', left:'300px' }}>
          <ModalHeader>Successfully Traded</ModalHeader>
          <ModalContent>
            <p>That's everything!</p>
          </ModalContent>
          <ModalActions>
            <Button
            color='green'
              icon='check'
              content='All Done'
              onClick={handleClose}
            />
          </ModalActions>
        </Modal>
      </Modal>
    </>
  );
}

export default SellPlayer;
