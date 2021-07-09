import React, {useState, useEffect} from 'react'
import axios from 'axios'

const OrderForm = () => {

    const [userName, setUserName] = useState('')

    const [userEmail, setUserEmail] = useState('')

    const [orderDate, setOrderDate] = useState('')

    const [orderTime, setOrderTime] = useState('')

    const [masterId, setMasterId] = useState(0)
    const [masters, setMasters] = useState([])

    const [cityId,setCityId] = useState(0)
    const [cities, setCities] = useState([])

    const [clockSizeId, setClockSizeId] = useState(0)
    const [clockSizes, setClockSizes] = useState([])


    useEffect(() => {
        const cityName = async () => {

            const {data} = await axios.get(`${process.env.REACT_APP_API_URI}/city`)

            setCityId(data[0].id)
            setCities(data)
        }

        cityName()
    },[])


    useEffect(() => {
        const masterName = async () => {
            if(cityId) {
                const {data} = await axios.get(`${process.env.REACT_APP_API_URI}/availableMasters`, {
                    params: {
                    city_id: cityId,
                    }
                })
                setMasterId(data[0].id)
                setMasters(data)
            }

        }
        masterName()
    },[cityId])
    


    useEffect(() => {
        const clockSize = async () => {

            const{data} = await axios.get(`${process.env.REACT_APP_API_URI}/clocksize`)

            setClockSizeId(data[0].id)
            setClockSizes(data)
        }
        clockSize()
    },[])


    const onSubmit = () => {

        axios.post(`${process.env.REACT_APP_API_URI}/order`, 
        {
            name:userName, 
            email:userEmail,
            clock_size: clockSizeId,
            city_id: cityId,
            master_id: masterId,
            start_work_at: `${orderDate} ${orderTime}`
        })

    }

    return (
        <div> 
            <div>
                <div>
                    <label>Enter your name:</label>
                </div>
                <input 
                type='text' 
                placeholder='Ivan Ivanov' 
                value={userName} 
                onChange={(userNameEvent) => setUserName(userNameEvent.target.value)}
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
                ></input>
            </div>

            <div>
                <div>
                    <label>Choose clocksize:</label>
                </div>
                <select name='clocksize' onChange={(clockSizeIdEvent) => setClockSizeId(+clockSizeIdEvent.target.value)}>
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
                <button onClick={onSubmit}> Confirm order </button>
            </div>
            
        </div>
    )
}



export default OrderForm 

