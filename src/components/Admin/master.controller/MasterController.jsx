import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"



const MasterController = () => {

    const [masterName, setMasterName] = useState('')
    const [masterId, setMasterId]= useState(0)

    const [cityId, setCityId] = useState(0)
    const [cities, setCities] = useState([])

    const { propsMasterId, propsMasterName, propsCityId } = useParams()

    useEffect(() => {

        const readCities = async () => {
            
            const {data} = await axios.get('http://localhost:5000/api/city')

            setCities(data)
            setCityId(data[0].id)
        }

        readCities()
    }, [])


    useEffect(() => {

        if (propsMasterId) {

            setMasterName( propsMasterName )
        }

    }, [])
    

    const onSubmit = (event) => {
        event.preventDefault()

        if (propsMasterId) {

                axios.post(`http://localhost:5000/api/master`,
            {
                name: masterName, 
                city_id: cityId
            })

            setMasterName('')
            alert('Master has been created')

        } else {

            axios.put(`http://localhost:5000/api/master`,
            {
                id: masterId,
                name: masterName, 
                city_id: cityId
            })
        }
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <div>
                        <label>Enter master name:</label>
                    </div>
                    <input 
                    type='text'
                    placeholder = 'Name Surname'
                    value={masterName}
                    onChange={(masterNameEvent) => setMasterName(masterNameEvent.target.value)}
                    >                        
                    </input>
                    <div>
                    <div>
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
                <div>
                </div>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MasterController