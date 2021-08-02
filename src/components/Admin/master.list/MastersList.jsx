import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const MastersList = () => {

    const [masters, setMasters] = useState([])

    useEffect(() => {

        const readAllMasters = async () => {
            
            const {data} = await axios.get('http://localhost:5000/api/master')
            
            setMasters(data)
        }
        
        readAllMasters()
        
    }, [])

    const onDelete = (id) => {

        if(window.confirm("Do you want to delete this master?")) {
            axios.delete('http://localhost:5000/api/master', 
            {
                data: {
                    id
                }
            }).then(() => {
                alert('Master has been deleted')
            })
        }
    }


    return (
        <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Master name</th>
                    <th>City</th>
                    <th>Rating</th>
                    <th><button><Link to="/admin/master-controller">Create master</Link></button></th>
                </tr>
                {
                    masters.map ((elem) => (
                        <tr>
                            <td>{`${elem.masterId}`}</td>
                            <td>{`${elem.masterName}`}</td>
                            <td>{`${elem.cityName}`}</td>
                            <td>{`${elem.rating}`}</td>
                            <button><Link to={`/admin/master-controller/${elem.masterId}/${elem.masterName}/${elem.cityId}`}>Update</Link></button>
                            <button onClick = {() => onDelete(elem.masterId)}>Delete</button>
                        </tr>
                        
                    ))
                }
            </table>
        </div>
        )
}

export default MastersList