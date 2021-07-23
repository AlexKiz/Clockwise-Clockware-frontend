import axios from "axios";
import { useState, useEffect } from "react";



const MasterController = () => {

    const [masterNameToCreate, setMasterNameToCreate] = useState('')

    const [cityId, setCityId] = useState(0)
    const [cities, setCities] = useState([])

    useEffect(() => {

        const readCities = async () => {
            
            const {data} = await axios.get('http://localhost:5000/api/city')

            setCities(data)
            setCityId(data[0].id)
        }

        readCities()
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        axios.post(`http://localhost:5000/api/master`,
        {
            name: masterNameToCreate, 
            city_id: cityId
        })

        setMasterNameToCreate('')
        alert('Master has been created')
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
                        value={masterNameToCreate}
                        onChange={(masterNameToCreateEvent) => setMasterNameToCreate(masterNameToCreateEvent.target.value)}
                        >
                        </input>
                    <div>
                    <div>
                        <label>Choose master's сity:</label>
                    </div>
                        <select onChange={(cityIdEvent) => setCityId(cityIdEvent.target.value)}>
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
                </div>
                    <button type='submit'>
                        Create master
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MasterController 