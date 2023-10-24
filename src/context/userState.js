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
        let username = [userData.name.fName,userData.name.lName].join('');
        try{
            const response = await fetch(`${host}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"fName":`${userData.name.fName}`,"lName":`${userData.name.lName}`,'username':username,'email':`${userData.email}`,'pass':`${userData.password.pass}`})
            })
            const data = await response.json();
            setUserData(data);
            return data;
        }catch(e){
            console.log(e.message);
        }
    }

    // for user to login and get user data
    const login = async (userCredentials) => {
        try{
            const response = await fetch(`${host}/auth/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userid': userCredentials.email,
                    'pass': userCredentials.password
                }
            })
            const data = await response.json();
            setUserData(data);
            return data;
        }catch(e){
            console.log(e.message);
        }
    }

    const searchUser = async (userInfo) => {
        try{
            const response = await fetch(`${host}/profile/search`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': userInfo
                }
            })
            const data = await response.json();
            return data;
        }catch(e){
            console.log(e.message)
        }
    }

    return (
        <userContext.Provider value={{ signup, login, searchUser, userData, userMessages, setUserMessages }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;