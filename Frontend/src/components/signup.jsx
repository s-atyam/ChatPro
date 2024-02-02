import React, { useContext, useState } from 'react'
import logo_dp from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../context/userContext';

// the signup react funtional component
const Signup = () => {
    const context = useContext(userContext);
    const { signup } = context;

    const navigate = useNavigate();

    const [name, setName] = useState({fName:'',lName:''});
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState({pass:'',confirm:''});
    const [flag,setFlag] = useState({fName:false,email:false,gender:false,pass:false,confirm:false})

    // function trigered when, typing the Fname
    const handleChangeFname = (e)=>{
        setName({...name,fName:e.target.value});
        setFlag({...flag,fName:false})
    }
    // function trigered when, typing the Lname
    const handleChangeLname = (e)=>{
        setName({...name,lName:e.target.value});
    }
    // function trigered when, typing the Email
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value);
        setFlag({...flag,email:false})
    }
    const handleGender = (e) => {
        setGender(e.target.value);
        setFlag({...flag,gender:false})
    }
    // function trigered when, typing the Email
    const handleChangePassword = (e)=>{
        setPassword({...password,pass:e.target.value});
        setFlag({...flag,pass:false})
    }
    // function trigered when, typing the Confirm Password
    const handleChangeConfirmPass = (e)=>{
        setPassword({...password,confirm:e.target.value});
        setFlag({...flag,confirm:false})
    }
    
    // function trigered when, clicked on the SUBMIT button
    const handleClick = async (e)=>{
        e.preventDefault();
        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(name.fName===''){
            setFlag({...flag,fName:true});
            return;
        }
        if(!email.match(validEmailRegex)){
            setFlag({...flag,email:true});
            return;
        }
        if(password.pass===''){
            setFlag({...flag,pass:true});
            return;
        }
        if(password.pass!==password.confirm){
            setFlag({...flag,confirm:true});
            return;
        }
        
        const userData = await signup({name,email,gender,password});
        if(Object.keys(userData).length>0){
            navigate('/user');
        }else{
            console.log("New User not Created")
        }
    }    

  return (
    <div className='main_container_1 flex_center flex-col' style={{color:'var(--dark-gray-color)'}}>
        <form className='w-96 h-fit py-4 px-2 border border-gray-300 rounded-md flex_center flex-wrap  font-medium'>
            <div className="w-2/5 flex mb-3">
                <img src={logo_dp} alt="" />
            </div>
            <h1 className='heading_3 mb-5'>Create your account and start your journey Today</h1>

            <div className='w-full h-fit flex flex-wrap mb-2 justify-between'>
                <div className='w-full md:w-[49%]'>
                    <h3 className='text-sm mb-1'>First Name *</h3>
                    <input onChange={handleChangeFname} className='h-7 inputField pl-2 w-full' type='text' placeholder='Your first name...'/>
                    <div className='w-full h-4'>
                        {flag.fName && <p className='text-red-600 text-xs'>*First name is required</p>}
                    </div>
                </div>
                <div className='w-full md:w-[49%]'>
                    <h3 className='text-sm mb-1 w-full'>Last Name</h3>
                    <input onChange={handleChangeLname} className='h-7 inputField pl-2 w-full' type='text' placeholder='Your last name...' />
                </div>
            </div>

            <div className='h-fit w-full mb-2'>
                <div className='w-full flex h-fit flex-col'>
                    <h3 className='text-sm mb-1'>Email *</h3>
                    <input onChange={handleChangeEmail} className='h-7 inputField pl-2' type='email' placeholder='Your email...'/>
                </div>
                <div className='w-full h-4'>
                    {flag.email && <p className='text-red-600 text-xs'>*Valid email is required</p>}
                </div>
            </div>
            <div className='h-fit w-full mb-2 '>
                <div className='w-full flex h-fit flex-col'>
                    <h3 className='text-sm mb-1'>Gender *</h3>
                    <div className='w-full h-6 flex_between'>
                        <label className='mr-3 text-sm flex_center'>
                            <input className='mx-1' type="radio" checked={gender==='male'} onChange={handleGender} value='male'/>
                            Male
                        </label>
                        <label className='mr-3 text-sm flex_center'>
                            <input className='mx-1' type="radio" checked={gender==='female'} onChange={handleGender}  value='female' />
                            Female
                        </label>
                        <label className='mr-3 text-sm flex_center'>
                            <input className='mx-1' type="radio" checked={gender==='other'} onChange={handleGender} value='other' />
                            Other
                        </label>
                    </div>
                </div>
                <div className='w-full h-4'>
                    {flag.email && <p className='text-red-600 text-xs'>*Gender is required</p>}
                </div>
            </div>
            <div className='w-full h-fit flex flex-wrap mb-2 justify-between font-medium'>
                <div className='w-full md:w-[49%]'>
                    <h3 className='text-sm mb-1'>Password *</h3>
                    <input onChange={handleChangePassword} className='h-7 inputField pl-2 w-full' type='password' placeholder=''/>
                    <div className='w-full h-4'>
                        {flag.fName && <p className='text-red-600 text-xs'>*Password is required</p>}
                    </div>
                </div>
                <div className='w-full md:w-[49%]'>
                    <h3 className='text-sm mb-1 w-full'>Confirm Password</h3>
                    <input onChange={handleChangeConfirmPass} className='h-7 inputField pl-2 w-full' type='password' placeholder='' />
                    <div className='w-full h-4'>
                        {flag.confirm && <p className='text-red-600 font-medium text-xs'>*Password does not match</p>}
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <button onClick={handleClick} className='button_1 primary w-full'>Sign In</button>
                {/* <Link to='/' className='button_1 secondary'>Back</Link> */}
            </div>
            <p className='font-medium text-sm mt-5'>Already a user? <Link to='/login' className='text-green-600 cursor-pointer'>Login Here</Link></p>
        </form>
    </div>
  )
}

export default Signup
