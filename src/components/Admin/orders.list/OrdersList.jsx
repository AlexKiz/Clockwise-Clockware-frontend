import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const OrdersList = () => {

    const [orders, setOrders] = useState([])


    useEffect(() => {

        const readAllOrders = async() => {
        
            const {data} = await axios.get(`/order`)
            
        setOrders(data)
        } 

        readAllOrders()
    },[])


    const onDelete = (id) => {

        if(window.confirm("Do you want to delete this order?")) {
            axios.delete(`/order`, 
            {
                data: {
                    id
                }
            }).then(() => {
                alert('Order has been deleted')
            })
        }
    }


    return(
        <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Clock size</th>
                    <th>User name</th>
                    <th>User email</th>
                    <th>City</th>
                    <th>Master name</th>
                    <th>Start at</th>
                    <th>Finish at</th>
                </tr>
                {
                orders.map((elem) => (
                    <tr>
                        <td>{`${elem.orderId}`}</td>
                        <td>{`${elem.clockSize}`}</td>
                        <td>{`${elem.userName}`}</td>
                        <td>{`${elem.userEmail}`}</td>
                        <td>{`${elem.cityName}`}</td>
                        <td>{`${elem.masterName}`}</td>
                        <td>{`${elem.startWorkAt.split(',').join(' ')}`}</td>
                        <td>{`${elem.endWorkAt}`}</td>
                        <button><Link to={`/admin/order-controller/${elem.orderId}/${elem.userId}/${elem.clocksId}/${elem.cityId}/${elem.startWorkAt.split(',')[0]}/${elem.startWorkAt.split(',')[1]}/${elem.masterId}`}>Update</Link></button>
                        <button onClick={() => onDelete(elem.orderId)}>Delete</button>
                    </tr>
                ))
                }
            </table>
        </div>
    )
}

export default OrdersList