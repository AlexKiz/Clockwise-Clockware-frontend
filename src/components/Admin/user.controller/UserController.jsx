import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import '../user.controller/user-update-form.css'

const UserController = () => {
    
    const history = useHistory()

    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState(0)
    const [userEmail, setUserEmail] = useState('')

    const {propsUserId, propsUserName, propsUserEmail} = useParams()
    

    useEffect(() => {
        
        setUserId( propsUserId )
        setUserName( propsUserName )
        setUserEmail( propsUserEmail )

    },[])


    const onSubmit = (event) => {
        event.preventDefault()
        axios.put(`/user` , 
        {
            data: {
                id: userId,
                name: userName,
                email: userEmail
            }
        }).then(() => {
            alert('User has been updated')
            history.push('/admin/users-list')
        }).catch(() => {
            alert('User with current email already exists')
            setUserEmail( propsUserEmail )
        })
        
    }
    
    return (
        <div className='container-form'>

            <form className='form' onSubmit={onSubmit}>
                
                <div>

                    <div className='form-section'>
                        <div className='form-input__label'>
                            <label>Enter User name:</label>
                        </div>
                        <input
                        type='text'
                        value={userName}
                        onChange={(userNameEvent) => setUserName(userNameEvent.target.value)}
                        >    
                        </input>
                    </div>

                    <div className='form-section'>
                        <div className='form-input__label'>
                            <label>Enter User's email:</label>
                        </div>
                        <input
                        type='email'
                        value={userEmail}
                        onChange={(userEmailEvent) => setUserEmail(userEmailEvent.target.value)}
                        >
                        </input>
                    </div>

                    <div className='form-button'>
                        <button type='submit'>
                            Submit
                        </button>
                    </div>

                </div>

            </form>
        </div>
    )
}

export default UserController