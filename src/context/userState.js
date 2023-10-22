import React,{ useState } from "react";
import userContext from "./userContext";

const UserState = (props)=>{
    const host = 'http://192.168.100.3:5000';
    const userDataInitial = {};
    const userMessagesInitial = [];

    const [userData, setUserData] = useState(userDataInitial);
    const [userMessages, setUserMessages] = useState(userMessagesInitial);

    // to create new user (signup)
    const signup = async (userData) => {
        console.log(userData);
        const response = await fetch(`${host}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"fName":`${userData.name.fName}`,"lName":`${userData.name.lName}`,'email':`${userData.email}`,'pass':`${userData.password.pass}`})
        })
        const data = await response.json();
        setUserData(data);
        // console.log(data);
        return data;
    }

    // for user to login and get user data
    const login = async (userCredentials) => {
        const response = await fetch(`${host}/auth/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userid': userCredentials.email,
                'pass': userCredentials.password
            }
        })
        const data = await response.json();
        // console.log("from context : ",data);
        setUserData(data);
        return data;
    }

    return (
        <userContext.Provider value={{ signup, login, userData, userMessages }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;