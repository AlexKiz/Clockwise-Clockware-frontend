import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const CitiesList = () => {

    const [cities, setCities] = useState([])


    useEffect(()=> {

        const readAllCities = async () => {

            const {data} = await axios.get(`/city`)
            
            setCities(data)
        }

        readAllCities()

    },[])


    const onDelete = (id) => {
        
        if(window.confirm('Do you want to delete this city?')) {
            axios.delete(`/city`,
            {
                data: 
                {
                    id
                }
            }).then(() => {
                alert('City has been deleted')
            })
        }
    }

    
    return (
        <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>City name</th>
                    <th><button><Link to = '/admin/city-controller'>Create new city</Link></button></th>
                </tr>
                {
                    cities.map((elem) => (
                        <tr>
                            <td>{`${elem.id}`}</td>
                            <td>{`${elem.name}`}</td>
                            <button><Link to = {`/admin/city-controller/${elem.id}/${elem.name}`}>Update</Link></button>
                            <button onClick = {() => {onDelete(elem.id)}}>Delete</button>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default CitiesList