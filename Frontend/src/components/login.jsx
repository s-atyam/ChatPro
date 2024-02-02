import React, { useContext, useState } from 'react'
import logo_dp from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../context/userContext';

// this login react functional component is to login the user
const Login = () => {
    const context = useContext(userContext);
    const { login  } = context;
    
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flag,setFlag] = useState({"email":false,"pass":false})

    // function trigered when, typing the Email
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value);
        setFlag({...flag,"email":false});
    }
    // function trigered when, typing the Change Password
    const handleChangePassword = (e)=>{
        setPassword(e.target.value);
        setFlag({...flag,"pass":false});
    }

    // function trigered when, clicked on SUBMIT button
    const handleClick = async (e)=>{
        e.preventDefault();
        let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(validEmailRegex)){
            setFlag({...flag,"email":true});
            return;
        }
        if(password===''){
            setFlag({...flag,"pass":true});
            return;
        }
        
        const userData = await login({email,password});
        if(Object.keys(userData).length>0){
            navigate('/user');
        }else{
            console.log("Invalid user")
        }
    }

  return (
    <div className='main_container_1 flex_center flex-col' style={{color:'var(--dark-gray-color)'}}>
        <form className='w-96 h-fit py-4 px-2 border border-gray-300 rounded-md flex_center flex-wrap  font-medium'>
            <div className="w-2/5 flex mb-3">
                <img src={logo_dp} alt="" />
            </div>
            <h1 className='heading_3 mb-5'>Welcome back, please login with your credentials</h1>

            <div className='h-fit w-full mb-2'>
                <div className='w-full flex h-fit flex-col'>
                    <h3 className='text-sm mb-1'>Email *</h3>
                    <input onChange={handleChangeEmail} className='h-7 inputField pl-2' type='email' placeholder='Type your email...'/>
                </div>
                <div className='w-full h-4'>
                    {flag.email && <p className='text-red-600 text-xs'>*Valid email is required</p>}
                </div>
            </div>
            <div className='h-fit w-full mb-2'>
                <div className='w-full flex h-fit flex-col'>
                    <h3 className='text-sm mb-1'>Password *</h3>
                    <input onChange={handleChangePassword} className='h-7 inputField pl-2' type='password' placeholder='Type your password...'/>
                </div>
                <div className='w-full h-4'>
                    {flag.email && <p className='text-red-600 text-xs'>*Password is required</p>}
                </div>
            </div>
            <div className='w-full'>
                <button onClick={handleClick} className='button_1 primary w-full'>Login</button>
                {/* <Link to='/' className='button_1 secondary'>Back</Link> */}
            </div>
            <p className='font-medium text-sm mt-5'>New to ChatPro? <Link to='/signup' className='text-green-600 cursor-pointer'>Sign Up Here</Link></p>
        </form>
    </div>
  )
}

export default Login
