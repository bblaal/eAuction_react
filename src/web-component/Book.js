import React, { useEffect, useState } from 'react'

export default function Book() {

    const [result, setResult] = useState("");
    useEffect(() => {
            const axios = require('axios');
            const email = "isomsuvra95@gmail.com";
            const urlString = "http://localhost:8080/users/api/v1/profile";
            const token = "Bearer " + localStorage.getItem("token");
        
            axios.put(urlString,{
              "email":email
            },
            {
              headers: {
                'Access-Control-Allow-Origin': "http://localhost:8080",
                'Authorization': token,
                'Content-Type': "application/json"
              }
            })
            .then(function (response) {
                console.log(response);
                
                 setResult(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }, [])


    return (
        <div>
            <table className="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">UserId</th>
      <th scope="col">First Name</th>
      <th scope="col">First Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
    </tr>
  </thead>
  <tbody>

        <tr key={result.id}>
            <td>{result.id}</td>
            <td>{result.firstName}</td>
            <td>{result.lastName}</td>
            <td>{result.email}</td>
            <td>{result.contact}</td>
        </tr>
        


    
  </tbody>
</table>
        </div>
    )
}
