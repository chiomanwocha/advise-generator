import './assets/css/card.css'
import axios from 'axios'
import Loader from './Loader'
import { useQuery } from 'react-query'
import { useState } from 'react'

const Card = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const fetch = () => {
        return axios.get('https://api.adviceslip.com/advice')
    }

    const onError = () => {
        setErrorMessage('Oops, something is wrong, please try again ..')
    }
    const {data, status, error, isFetching, refetch} = useQuery(['advices'], fetch, {
        refetchOnWindowFocus: false,
        onError
    })
    
    return ( 
        <div className='container'>
            <div className="card" onClick={refetch}>
                    {(status === 'loading' || isFetching) &&  
                        <div className='loader-container'>
                            <Loader />
                        </div>
                    }
                    {status === 'error' &&
                        <p className='error'>{errorMessage}</p>
                    }
                    {(status === 'success' && !isFetching )&&
                        <div>
                            <p>{data?.data.slip.id}</p>
                            <h3>{data?.data.slip.advice}</h3>
                        </div>
                    }
            </div>
        </div>
     );
}
 
export default Card;