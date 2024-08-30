import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function FranchiseeListView() {
  const columns = [
    { field: 'id', headerName: ' Franchisee ID', width: 130 },
    { field: 'franchiseeName', headerName: 'Franchisee Name', width: 600 },
    { field: 'balance', headerName: 'Balance', width: 250 },
    { field: 'playerOwned', headerName: 'Player Owned', width: 200 },
  ];
  
  
  const axios = require('axios');
  const urlString = "http://localhost:8082/franchisee/api/v1/getAllFranchisees";
  const [allFranchisee, setAllFranchisee] = useState([]);

  
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
  let rows = [];
  allFranchisee.forEach((item, index) => {
    rows.push(
      {
        id: item.franchiseeId,
        franchiseeName: item.franchiseeName,
        balance: item.balance,
        playerOwned: item.playerOwned,
      }
    )
  });

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
