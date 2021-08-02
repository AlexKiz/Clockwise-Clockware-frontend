import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"

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
        axios.put('http://localhost:5000/api/user' , 
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
        })
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Enter User name:</label>
                </div>
                <input
                type='text'
                value={userName}
                onChange={(userNameEvent) => setUserName(userNameEvent.target.value)}
                >    
                </input>
                <div>
                    <label>Enter User's email:</label>
                </div>
                <input
                type='email'
                value={userEmail}
                onChange={(userEmailEvent) => setUserEmail(userEmailEvent.target.value)}
                >
                </input>
                <div>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserController