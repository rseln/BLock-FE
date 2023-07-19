import React, {useState} from 'react'
import PropTypes from 'prop-types'

async function LoginUser(credentials) {
    return fetch('http://localhost:8080/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

const Login = ({setToken}) => {
    const [userName, setUserName] = React.useState<string | undefined>()
    const [password, setPassword] = React.useState<string | undefined>()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await LoginUser({
            userName,
            password
        })
        setToken(token)
    }
  return (
    <>
        <h1>Log In Here</h1>
        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                <p className='text-white font-bold'>UserName</p>
                <input type="text" required onChange={(e)=>setPassword(e.target.value)} className='p-3 my-2 rounded text-black' placeholder='JohnDoe'/>
                <p className='text-white font-bold'>PassWord</p>
                <input type="password" required onChange={(e)=>setUserName(e.target.value)}  className='p-3 my-2 rounded text-black' placeholder='Please enter a strong password'/>
            <button type="submit" className='bg-red-700 py-3 my-6 rounded font-bold px-4'>Submit</button>
            <div>
                <p><input type="checkbox" />Remember Me</p>
            </div>
        </form>
    </>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login