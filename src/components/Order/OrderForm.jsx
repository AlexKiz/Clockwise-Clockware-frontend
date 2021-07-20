import React, {useState, useEffect} from 'react'
import axios from 'axios'

const OrderForm = () => {

    const [userName, setUserName] = useState('')

    const [userEmail, setUserEmail] = useState('')

    const [orderDate, setOrderDate] = useState('')

    const [orderTime, setOrderTime] = useState('')

    const [masterId, setMasterId] = useState(0)
    const [masters, setMasters] = useState([])

    const [cityId, setCityId] = useState(0)
    const [cities, setCities] = useState([])

    const [clocksId, setClocksId] = useState(0)
    const [clockSizes, setClockSizes] = useState([])


    useEffect(() => {
        const cityName = async () => {

            const {data} = await axios.get(`http://localhost:5000/api/city`)

            setCityId(data[0].id)
            setCities(data)
        }

        cityName()
    },[])


    useEffect(() => {
        const masterName = async () => {

            if(cityId && orderDate && orderTime && clocksId) {
                const {data} = await axios.get(`http://localhost:5000/api/availableMasters`, {
                    params: {
                    city_id: cityId,
                    start_work_at: `${orderDate} ${orderTime}`,
                    clocks_id: clocksId,
                    }
                })

                setMasterId(data[0].id)
                setMasters(data)
            }

        }
        masterName()
    },[cityId,clocksId,orderDate,orderTime])
    


    useEffect(() => {
        const clockSize = async () => {

            const{data} = await axios.get(`http://localhost:5000/api/clocks`)

            setClocksId(data[0].id)
            setClockSizes(data)
        }

        clockSize()
    },[])


    const onSubmit = () => {

        axios.post(`http://localhost:5000/api/order`, 
        {
            name:userName, 
            email:userEmail,
            clocks_id: clocksId,
            city_id: cityId,
            master_id: masterId,
            start_work_at: `${orderDate} ${orderTime}`
        })

        //setUserName('')
        //setUserEmail('')
        //setOrderTime('')
        //setOrderDate('')
        //alert('Your order has been created! Have a good day!')

    }

    return (
        <div>

            <form onSubmit={onSubmit} name='orderForm'>

                <div>
                    <div>   
                        <label>Enter your name:</label>
                    </div>

                    <input 
                    type='text' 
                    placeholder='Ivan Ivanov' 
                    value={userName}
                    onChange={(userNameEvent) => setUserName(userNameEvent.target.value)}
                    required
                    ></input>
                </div>

                <div>
                    <div>
                        <label>Enter your email:</label>
                    </div>

                    <input 
                    type='email' 
                    value={userEmail} 
                    placeholder='example@mail.com'
                    onChange={(userEmailEvent) => setUserEmail(userEmailEvent.target.value)}
                    required
                    ></input>
                </div>

                <div>
                    <div>
                        <label>Choose clocksize:</label>
                    </div>

                    <select name='clocksize' onChange={(clocksIdEvent) => setClocksId(+clocksIdEvent.target.value)}>
                        {
                            clockSizes.map(({size, id}) => (
                                <option value={id}>
                                    {`${size}`}
                                </option>
                            ))    
                        }
                    </select>
                </div>

                <div>   
                    <div>
                        <label>Choose your City:</label>
                    </div>

                    <select name='cities' onChange={(cityIdEvent) => setCityId(+cityIdEvent.target.value)}>
                        {
                            cities.map(({name, id}) => (
                                <option value={id}>
                                    {`${name}`}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>   
                    <div>
                        <label>Choose the date:</label>
                    </div>

                    <input 
                    type='date' 
                    name='orderDate'
                    value={orderDate}
                    onChange={(orderDateEvent) => setOrderDate(orderDateEvent.target.value)}
                    ></input>
                </div>

                <div>   
                    <div>
                        <label>Choose the time:</label>
                    </div>

                    <input 
                    type="time" 
                    name='orderTime'
                    step='3600'
                    min="09:00"
                    max="18:00"
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
                                <option selected = {id} value={id}>
                                    {`${name}`}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>   
                    <button type="submit"> Confirm order </button>
                </div>
            
            </form>
            
        </div>
    )
}



export default OrderForm 

