import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function PlayerListView() {
  const columns = [
    { field: 'id', headerName: ' Player ID', width: 130 },
    { field: 'playerName', headerName: 'Players Name', width: 400 },
    { field: 'playerDOB', headerName: 'Player DOB', width: 250 },
    { field: 'playerSpeciality', headerName: 'Player Speciality', width: 500 },
    { field: 'playerLocation', headerName: 'Player Location', width: 250 },
  ];
  
  
  const axios = require('axios');
  const urlString = "http://localhost:8082/players/api/v1/players";
  const [allPlayers, setAllPlayers] = useState([]);

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
  let rows = [];
  allPlayers.forEach((item, index) => {
    rows.push(
      {
        id: item.playerId,
        playerName: item.playerName,
        playerDOB: item.playerDOB,
        playerSpeciality: item.playerSpeciality,
        playerLocation: item.playerLocation
      }
    )
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}
