import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory} from "react-router-dom"

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