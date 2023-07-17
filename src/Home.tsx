import React, {useState} from 'react'
import Login from "./Login";
import SignIn from "./SignIn";

const Home = () => {
    const [token, setToken] = useState()
    if(!token){
        {return <SignIn setToken={setToken}/>}
    }
  return (
    <div className='text-white font-bold text-2xl'>Dashboard</div>
  )
}

export default Home