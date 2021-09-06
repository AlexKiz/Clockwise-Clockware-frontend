import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory} from "react-router-dom"
import '../master.controller/master-update-form.css'

const MasterController = () => {

    const history = useHistory()

    const { propsMasterId, propsMasterName, propsCityId } = useParams()

    const [masterName, setMasterName] = useState('')
    const [masterId, setMasterId]= useState(0)

    const [cityId, setCityId] = useState(0)
    const [cities, setCities] = useState([]) 

    

    useEffect(() => {

        const readCities = async () => {
            
            const {data} = await axios.get(`/city`)

            if(propsCityId) {
                
                setCities(data)
                setCityId(propsCityId)

            } else if(data.length){

                setCities(data)
                setCityId(data[0].id)
            }
            
        }

        readCities()
    }, [])


    useEffect(() => {

        if (propsMasterId) {

            setMasterName( propsMasterName )
            setMasterId ( propsMasterId )
        }

    }, [])


    const onSubmit = (event) => {
        event.preventDefault()

        if (!propsMasterId) {

                axios.post(`/master`,
            {
                name: masterName, 
                city_id: cityId
            }).then(() =>{
                setMasterName('')
                alert('Master has been created')
                history.push('/admin/masters-list')
            })

        } else {

            axios.put(`/master`,
            {
                id: masterId,
                name: masterName, 
                city_id: cityId
            }).then(() => {
                alert('Master has been updated')
                history.push('/admin/masters-list')
            })
        }
        
    }


    return (
        <div className='container-form'>

            <form className='form' onSubmit={onSubmit}>

                <div>

                    <div className='form-section'>
                        <div className='form-input__label'>
                            <label>Enter master name:</label>
                        </div>
                        <input 
                        type='text'
                        placeholder = 'Name Surname'
                        pattern='[A-Za-zА-Яа-я]{3,49}[\s]{1}[A-Za-zА-Яа-я]{3,50}$'
                        title='Master name must be at least 3 letter and alphabetical characters only'
                        value={masterName}
                        onChange={(masterNameEvent) => setMasterName(masterNameEvent.target.value)}
                        >                        
                        </input>
                    </div>
                    
                    <div className='form-section'>
                        <div className='form-input__label'>
                            <label>Choose master's сity:</label>
                        </div>
                        <select onChange={(cityIdEvent) => setCityId(cityIdEvent.target.value)}>
                            {
                                cities.map(({name, id}) => (
                                    <option selected = {id === +propsCityId} value={id}>
                                        {`${name}`}
                                    </option>
                                ))
                                
                            }
                        </select>
                    </div>

                    <div className='form-button'>
                        <button type='submit'>
                            Submit
                        </button>
                    </div>
                
                </div>

            </form>
        </div>
    )
}

export default MasterController