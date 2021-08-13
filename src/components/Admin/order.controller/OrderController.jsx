import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory} from "react-router-dom"
const currentDate = new Date() 
const currentDay = (currentDate.getDate() < 10) ? `0${currentDate.getDate()}` : currentDate.getDate()
const currentMonth = ((currentDate.getMonth() + 1) < 10) ? `0${(currentDate.getMonth() + 1)}` : (currentDate.getMonth() + 1)
const currentYear = currentDate.getFullYear()
const today = `${currentYear}-${currentMonth}-${currentDay}`

const OrderController = () => {

    const history = useHistory()

    const { propsOrderId, propsUserId, propsClockId, propsCityId, propsOrderDate, propsOrderTime, propsMasterId } = useParams()

    const [userId, setUserId] = useState(0)
    const [users, setUsers] = useState([])

    const [clockId, setClockId] = useState(0)
    const [clocks, setClocks] = useState([])

    const [cityId, setCityId] = useState(0)
    const [cities, setCities] = useState([])

    const [orderDate, setOrderDate] = useState(`${propsOrderDate}`)
    const [orderTime, setOrderTime] = useState(`${propsOrderTime}`)

    const [masterId, setMasterId] = useState(0)
    const [masters, setMasters] = useState([])


    useEffect(() => {
        
        const readAllUsers = async () => {

            const {data} = await axios.get(`/user`)
            if(data.length) {
                setUsers(data)
                setUserId(propsUserId)
            }
        }

        readAllUsers()
    },[])


    useEffect(() => {

        const readAllClocks = async () => {

            const {data} = await axios.get(`/clocks`)

            if(data.length) {
                setClocks(data)
                setClockId(propsClockId)
            }
        }

        readAllClocks()
    }, [])


    useEffect(() => {

        const readAllCities= async () => {

            const {data} = await axios.get(`/city`)

            if(data.length) {
                setCities(data)
                setCityId(propsCityId)
            }
        }

        readAllCities()
    },[])


    useEffect(() => { 
        
        const masterName = async () => {

            const {data} = await axios.get(`/availableMastersForUpdate`, {
                params: {
                currentOrderId: propsOrderId,
                city_id: propsCityId,
                start_work_at: `${orderDate} ${orderTime}`,
                clocks_id: propsClockId,
                }
            })

            if(data.length === 0) {
                alert('All masters has been booked at that time. Please choose another time or date')
                setOrderTime('')
            }

            if(data.length) {
                setMasterId(propsMasterId)
                setMasters(data)
            }

        }
        masterName()

    }, [cityId, clockId, orderDate, orderTime])


    const onSubmit = (event) => {
        event.preventDefault()
        axios.put(`/order`, 
        {
            id: propsOrderId,
            clocks_id: clockId,
            user_id: userId,
            city_id: cityId,
            master_id: masterId,
            start_work_at: `${orderDate} ${orderTime}`
        }).then(() => {
            alert('Order has been updated')
            history.push('/admin/orders-list')
        })

    }


    return(
        <div>
            <form onSubmit={onSubmit}>
                <div>

                    <div>
                        <div>
                            <label>
                                Choose user:
                            </label>
                        </div>

                        <select name='users' onChange={(userIdEvent) => setUserId(userIdEvent.target.value)}>
                        {
                            users.map(({name, id, email}) => (
                                <option selected = {id === +propsUserId} value={id}>
                                    {` user: ${name} email: ${email}`}
                                </option>
                            ))
                        }
                        </select>
                    </div>


                    <div>
                        <div>
                            <label>
                                Choose clock size:
                            </label>
                        </div>

                        <select name='clocks' onChange={(clockIdEvent) => setClockId(clockIdEvent.target.value)}>
                            {
                                clocks.map(({id,size}) => (
                                    <option selected = {id === +propsClockId} value={id}>
                                        {`${size}`}
                                    </option>
                                ))
                            }
                        </select>
                    </div>


                    <div>
                        <div>
                            <label>
                                Choose city:
                            </label>
                        </div>

                        <select name='cities' onChange={(cityIdEvent) => setCityId(cityIdEvent.target.value)}>
                            {
                                cities.map(({id, name}) => (
                                    <option selected = {id === +propsCityId} value={id}>
                                        {`${name}`}
                                    </option>
                                ))
                            }
                        </select>
                    </div>


                    <div>
                        <div>
                            <label>
                                Choose date:
                            </label>
                        </div>
                        <input 
                        type='date' 
                        name='orderDate'
                        min= {today}
                        value={orderDate}
                        onChange={(orderDateEvent) => setOrderDate(orderDateEvent.target.value)}
                        ></input>
                    </div>


                    <div>
                        <div>
                            <label>
                                Choose order time:
                            </label>
                        </div>

                        <input 
                        type="time" 
                        step='3600'
                        name='orderTime'
                        max="18:00"
                        min="09:00"
                        value={orderTime}
                        onChange={(orderTimeEvent) => setOrderTime(orderTimeEvent.target.value)}
                        ></input>
                    </div>


                    <div>   
                        <div>
                            <label>Available masters:</label>
                        </div>

                        <select name='masterName' onChange={(masterIdEvent) => setMasterId(+masterIdEvent.target.value)}>
                            {
                                masters.map(({name, id}) => (
                                    <option selected = {id === +propsMasterId} value={id}>
                                        {`${name}`}
                                    </option>
                                ))
                            }
                        </select>
                    </div>


                    <div>   
                        <button type="submit"> Confirm </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default OrderController