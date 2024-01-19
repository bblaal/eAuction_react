import React, { useState } from 'react'
import Matched from '../icons/matched.png'
import Unmatched from '../icons/unmatched.png'


export default function Signup() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [host, setHost] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [imageURL, setimageURL] = useState("")

    var errorArray = []
    const axios = require('axios');
    const urlString = "http://localhost:8080/users/api/v1/signup";

    const style = {
        "width": "48rem",
    }

    const validateAllFieldsBeforeSubmit = (field, regexString) => {
        //const regexString = "^[a-zA-Z]*$";
        const newRegExp = new RegExp(regexString)
        //let errorFlag = true
        if (!newRegExp.test(field)) {
            return true
            //console.log("Invalid Entry")
        } else {
            return false
        }
    }

    //validate password : Password should have 1 UCA, 1 LCA, 1 ANC, 1NC 
    /*const validatePassword = (value, target) => {
        const regexString = "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$";
        const newRegExp = new RegExp(regexString)
        if(!newRegExp.test(value)){
            
            console.log("Password should have 1 UCA, 1 LCA, 1 ANC, 1NC , 6-16 Charecter")
        }
        
        
    }*/
    //matching password & confirm password
    const isMatchingPassword = (value) => {
        setConfirmPassword(value)
        if (value === password) {
            setimageURL(Matched)

        } else {
            setimageURL(Unmatched)

        }
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        //let errorArray = [];
        
        //validating first Name
        if (validateAllFieldsBeforeSubmit(firstName, "^[a-zA-Z]*$"))
            errorArray.push("First Name Should Contains Only Alphabet")

        //validating last Name
        if (validateAllFieldsBeforeSubmit(lastName, "^[a-zA-Z]*$"))
            errorArray.push("Last Name Should Contains Only Alphabet")

        //validating user Name
        if (validateAllFieldsBeforeSubmit(userName, "^[a-zA-Z0-9_.]*$"))
            errorArray.push("User Name Should Contains Only Alphabet / Numbers / '.' / '_'")
            
        //validating host
        if (validateAllFieldsBeforeSubmit(host, "^[a-zA-Z.]*$"))
            errorArray.push("Host Should Contain Alphabet & '.'")

        //validating first Name
        if (validateAllFieldsBeforeSubmit(contact, "^[0-9]{10}$"))
            errorArray.push("Contact SHould be 10 digit/should contain Numbers only")

        //validating Password
        if (validateAllFieldsBeforeSubmit(password, "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$"))
            errorArray.push("Password should have 1 UCA, 1 LCA, 1 ANC, 1NC , 6-16 Charecter")


        if (errorArray.length === 0) {
            const email = userName + "@" + host
            axios.post(urlString, {
                "email": email,
                "contact": contact,
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
            })
                .then(function (response) {
                    console.log(response);
                    alert("Registered")
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
        } else {
            errorArray.forEach((el, i) => {
                alert(el)
            })
        

        }


    }

    return (
        <div><center><h2>Sign Up</h2></center>
            <center>
                <form onSubmit={onSubmit}>
                    <div className="card" style={style}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input name="firstName" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" aria-label="First name" className="form-control" placeholder="First Name" />
                                    <input name="lastName" value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" aria-label="Last name" className="form-control" placeholder="Last Name" />
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Email</span>
                                    <input name="userName" value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" className="form-control" placeholder="Username" aria-label="Username" />
                                    <span className="input-group-text">@</span>
                                    <input name="host" value={host} onChange={(e) => { setHost(e.target.value) }} type="text" className="form-control" placeholder="Server" aria-label="Server" />
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="input-group">
                                    <span className="input-group-text">Contact</span>
                                    <input name="contact" value={contact} onChange={(e) => { setContact(e.target.value) }} type="text" aria-label="Contact" className="form-control" placeholder="Contact" />
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="input-group">
                                    <span className="input-group-text">Password</span>
                                    <input aria-describedby="simple-popover" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" aria-label="Password" className="form-control" placeholder="Password" />

                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="input-group">
                                    <span className="input-group-text">Confirm Password</span>
                                    <input name="confirmPassword" value={confirmPassword} onChange={(e) => { isMatchingPassword(e.target.value) }} type="password" aria-label="Confirm Password" className="form-control" placeholder="Confirm Password" />
                                    <img src={imageURL} alt={imageURL} />
                                </div>
                            </li>
                            <li className="list-group-item">
                                <button type="submit" className="btn btn-success">Sign Up</button>
                                

                            </li>
                        </ul>
                    </div>
                </form>

            </center>
        </div>
    )
}
