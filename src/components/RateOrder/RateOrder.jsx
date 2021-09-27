import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const RateOrder = () => {

    const history = useHistory()

    const { ratingIdentificator } = useParams()
    
    const [rating, setRating] = useState(0)

    const [order, setOrder] = useState([])


    useEffect(() => {
        
        const getOrderForRate = async () => {

            const {data} = await axios.get('/OrderForRate',{

                params: {

                    ratingIdentificator: ratingIdentificator
                    
                }
            })
            
            if(data.length) {

                setOrder(data)
            } else {
                alert('Current order has been already rated')
                history.push('/')
            }
            
        }

        getOrderForRate()
    },[])


    const onSubmit = (event) => {
        event.preventDefault()

        axios.put('/RatedOrder', {
            id: order[0].orderId,
            rating: rating,
            master_id: order[0].masterId
        }).then(() => {

            alert('Thanks for your feedback')
            history.push('/')

        })
    }

    return (
        <div>
            <form className='form' onSubmit={onSubmit} name='orderForm'>
        
                <div>
                { order[0] &&
                    <>
                    <div>
                        <b>Please, rate the following master:</b>
                        <br />
                        {order[0].masterName}
                    </div>
                    <div>
                        <label>Order Info:</label>
                        <br/>
                        <b>Order №{order[0].orderId}</b>
                        <br />
                        <b> User name:</b>  {order[0].userName}
                        <br />
                        <b> User email:</b> {order[0].userEmail}
                        <br />
                        <b> Clock size:</b>  {order[0].clockSize}
                        <br />
                        <b> City:</b>  {order[0].cityName}
                        <br />
                        <b> Start work on:</b>  {order[0].startWorkOn}
                        <br />
                        <b> End work on:</b>  {order[0].endWorkOn} 
                    </div>
                </>
                }
                    
                    <ReactStars
                    count={5}
                    size={60}
                    activeColor="#ffd700"
                    isHalf={true}
                    value={rating}
                    onChange={(newRating) => setRating(newRating)}
                    />

                    <div className='form-button'>   
                        <button type="submit"> Confirm rating </button>
                    </div>
                        
                </div>
            </form>
        </div>
    )
}

export default RateOrder