import React, {useState} from 'react'
import {useHistory} from "react-router-dom";

export default function Login() {

    const [userID, setUserId] = useState("")
    const [password, setPassword] = useState("")

    var history = useHistory();

    const style = {
        "width": "48rem",
    }

    const validateAllFieldsBeforeSubmit = (field, regexString) => {
        const newRegExp = new RegExp(regexString)
        if (!newRegExp.test(field)) {
            return true
        } else {
            return false
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //validating user ID
        if (validateAllFieldsBeforeSubmit(userID, "^[A-Z0-9]*$")){
            alert("User ID Should Contains Only Caps Alphabet & Numbers")
            
        } else{
            
            const axios = require('axios');
            const urlString = "http://localhost:8082/franchisee/api/v1/getFranchisee/".concat(userID);
            
            axios.get(urlString, {
                // "userID": userID,
                // "password": password,
            })
                .then(function (response) {
                    
                    if(response){
                        console.log(response);
                        localStorage.setItem("token", response.data);
                    }
                    
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            
        }

        
    }


    return (
        
        <div><br/><br/><center><h2>Log In</h2></center>
        <center>
            <form onSubmit={onSubmit}>
                <div className="card" style={style}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="input-group mb-3">
                                <span className="input-group-text">UserID</span>
                                <input name="userName" value={userID} onChange={(e) => { setUserId(e.target.value) }} type="text" className="form-control" aria-label="User ID" />
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="input-group">
                                <span className="input-group-text">Password</span>
                                <input aria-describedby="simple-popover" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" aria-label="Password" className="form-control" />

                            </div>
                        </li>
                        <li className="list-group-item">
                            <button type="submit" className="btn btn-success">Log In</button>
                            

                        </li>
                    </ul>
                </div>
            </form>

        </center>
    </div>
    )
}
