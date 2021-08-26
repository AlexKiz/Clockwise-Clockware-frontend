import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PublicHeader from '../Headers/PublicHeader'
import '../order/order-form.css'

const currentDate = new Date() 
const currentDay = (currentDate.getDate() < 10) ? `0${currentDate.getDate()}` : currentDate.getDate()
const currentMonth = ((currentDate.getMonth() + 1) < 10) ? `0${(currentDate.getMonth() + 1)}` : (currentDate.getMonth() + 1)
const currentYear = currentDate.getFullYear()
const today = `${currentYear}-${currentMonth}-${currentDay}`

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

            const {data} = await axios.get(`/city`)

            if(data.length) {
                setCities(data)
                setCityId(data[0].id)
            }
        }

        cityName()
    },[])


    useEffect(() => {
        const masterName = async () => {

            if(cityId && orderDate && orderTime && clocksId) {
                const {data} = await axios.get(`/availableMasters`, {
                    params: {
                    city_id: cityId,
                    start_work_on: `${orderDate} ${orderTime}`,
                    clocks_id: clocksId,
                    }
                })

                if(data.length === 0) {
                    alert('All masters has been booked at that time. Please choose another time or date')
                    setOrderTime('')
                    setMasterId(0)
                    setMasters([])
                }

                if(data.length) {
                    setMasterId(data[0].id)
                    setMasters(data)
                }
                
            }
            
        }
        masterName()
    },[cityId,clocksId,orderDate,orderTime])
    


    useEffect(() => {
        const clockSize = async () => {

            const{data} = await axios.get(`/clocks`)
            if(data.length){
                setClocksId(data[0].id)
                setClockSizes(data)
            }
            
        }

        clockSize()
    },[])


    const onSubmit = (event) => {
        event.preventDefault()
        axios.post(`/order`, 
        {
            name:userName, 
            email:userEmail,
            clocks_id: clocksId,
            city_id: cityId,
            master_id: masterId,
            start_work_at: `${orderDate} ${orderTime}`
        })

        setUserName('')
        setUserEmail('')
        setOrderTime('')
        setOrderDate('')
        alert('Your order has been created! Please confirm it on your Emailbox. Have a good day!')

    }

    return (
            <div>
                <PublicHeader/>
            
            <div className='conteiner'>

                <div className='container-form'>
        
                        <form className='form' onSubmit={onSubmit} name='orderForm'>
        
                            <div>
        
                                <div className='form-section'>
                                    <div className='form-input__label'>   
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
        
                                <div className='form-section'>
                                    <div className='form-input__label'>
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
        
                                <div className='form-section'>
                                    <div className='form-input__label'>                   
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
                                    
                                <div className='form-section'>   
                                    <div className='form-input__label'>
                                        <label>Choose your city:</label>
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
                                    
                                <div className='form-section'>   
                                    <div className='form-input__label'>
                                        <label>Choose the date:</label>
                                    </div>
                                    
                                    <input 
                                    type='date' 
                                    name='orderDate'
                                    min= {today}
                                    value={orderDate}
                                    onChange={(orderDateEvent) => setOrderDate(orderDateEvent.target.value)}
                                    ></input>
                                </div>
                                    
                                <div className='form-section'>   
                                    <div className='form-input__label'>
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
                                    
                                <div className='form-section'>   
                                    <div className='form-input__label'>
                                        <label>Available masters:</label>
                                    </div>
                                    
                                    <select name='masterName' onChange={(masterIdEvent) => setMasterId(+masterIdEvent.target.value)}>
                                        {
                                            masters.map(({name, id}) => (
                                                <option value={id}>
                                                    {`${name}`}
                                                </option>
                                            ))
                                        }
                                        <option value="" disabled selected hidden>Choose the master</option>
                                    </select>
                                </div>
                                    
                                <div className='form-button'>   
                                    <button type="submit"> Create order </button>
                                </div>
                                    
                            </div>
                                    
                        </form>
                                    
                    </div>

                </div>
            
            </div>
    )
}


export default OrderForm 

