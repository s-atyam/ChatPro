import React,{ useState } from "react";
import userContext from "./userContext";

// the userstate context
const UserState = (props)=>{
    // the server endpoint
    const host = process.env.REACT_APP_SERVER_LINK;
   
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
                body: JSON.stringify({"fName":`${userData.name.fName}`,"lName":`${userData.name.lName}`,'username':username,'email':`${userData.email}`,'gender':`${userData.gender}`,'pass':`${userData.password.pass}`})
            })

            const data = await response.json();

            if(response.status===201){
                localStorage.setItem('ChatPRO_AT',data.auth_token);
                return await getUserData(data.authToken);
            }else{
                console.log(data.error)
            }
        }catch(e){
            console.log(e.message);
        }
    }

    // for user to login and get user data
    const login = async ({email, password}) => {
        try{
            console.log(email)
            console.log(password)
            const response = await fetch(`${host}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password})
            })
            const data = await response.json();
            if(response.status===200){
                localStorage.setItem('ChatPRO_AT',data.auth_token);
                return await getUserData(data.authToken);
            }else{
                console.log(data.error)
            }
        }catch(e){
            console.log(e.message);
        }
    }

    // for getting user data using auth token
    const getUserData = async (tok)=>{
        try{
            const response = await fetch(`${host}/profile/getUserData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': tok
                }
            })
            const data = await response.json();
            setUserData(data);
            return data;
        }catch(e) {
            console.log(e.message);
        }
    }

    // for searching the user
    const searchUser = async (userInfo,userID) => {
        try{
            const response = await fetch(`${host}/profile/search`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': userInfo,
                    'userid':userID
                }
            })
            const data = await response.json();
            return data;
        }catch(e){
            console.log(e.message)
        }
    }

    // for searching for friends, given the user id
    const searchFriends = async (userId) => {
        try{
            const response = await fetch(`${host}/profile/searchFr`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userid':userId
                }
            })
            const dat = await response.json();
            return JSON.parse(dat.data);
        }catch(e){
            console.log(e.message)
        }
    }

    return (
        <userContext.Provider value={{ signup, login, getUserData, searchUser, searchFriends, userData, userMessages, setUserMessages }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;