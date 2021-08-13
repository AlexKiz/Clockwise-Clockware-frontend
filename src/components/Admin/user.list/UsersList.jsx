import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const UserList = () => {

    const [users, setUsers] = useState([])


    useEffect(() => {

        const readAllUsers = async () => {

            const { data } = await axios.get(`/user`)
            
            setUsers(data)
        }
        
        readAllUsers()

    },[])


    const onDelete = (id) => {

        if(window.confirm("Do you want to delete this user?")) {
            axios.delete(`/user`,
            {
                data: {
                    id
                }
            })
        alert('User has been deleted')
        }
    }


    return (
        <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>User name</th>
                    <th>Email</th>
                </tr>
                {
                    users.map((elem) => (
                        <tr>
                            <td>{`${elem.id}`}</td>
                            <td>{`${elem.name}`}</td>
                            <td>{`${elem.email}`}</td>
                            <button><Link to={`/admin/user-controller/${elem.id}/${elem.name}/${elem.email}`}>Update</Link></button>
                            <button onClick ={() => onDelete(elem.id)}>Delete</button>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default UserList