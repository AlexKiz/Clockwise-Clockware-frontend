import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import '../master.list/masters-list.css'

const MastersList = () => {

    const [masters, setMasters] = useState([])


    useEffect(() => {

        const readAllMasters = async () => {
            
            const {data} = await axios.get(`/master`)
            
            setMasters(data)
        }
        
        readAllMasters()
        
    }, [])


    const onDelete = (id) => {

        if(window.confirm("Do you want to delete this master?")) {
            axios.delete(`/master`, 
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
        <div className='conteiner'>

            <div className='wrapper-table'>

                <table  className='content-table-masters'>
                    <tr>
                        <th className='th-master-id'>Id</th>
                        <th className='th-master-name'>Master name</th>
                        <th className='th-master-city'>City</th>
                        <th className='th-rating'>Rating</th>
                        <button className='button-add'><Link to="/admin/master-controller">Create new master</Link></button>
                    </tr>
                    {
                        masters.map ((elem) => (
                            <tr>
                                <td>{`${elem.masterId}`}</td>
                                <td>{`${elem.masterName}`}</td>
                                <td>{`${elem.cityName}`}</td>
                                <td>{`${elem.rating}`}</td>
                                <button className='button-update'><Link to={`/admin/master-controller/${elem.masterId}/${elem.masterName}/${elem.cityId}`}>Update</Link></button>
                                <button className='button-delete' onClick = {() => onDelete(elem.masterId)}>Delete</button>
                            </tr>

                        ))
                    }
                </table>

            </div>

        </div>
        )
}

export default MastersList