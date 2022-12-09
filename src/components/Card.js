import './assets/css/card.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'

const Card = () => {
    const [num, setNum] = useState()
    const [advice, setAdvice] = useState('')
    const [loader, setLoader] = useState(false)

    const next = () => {
        setLoader(true)
        axios.get('https://api.adviceslip.com/advice')
        .then(response => {
            setAdvice(response.data.slip.advice)
            setNum(response.data.slip.id)
            setLoader(false)
        })
        .catch(err => {
            alert(err)
        })
    }

    useEffect(() => {
        next()
        setLoader(true)
    }, [])

    return ( 
        <div className='container'>
            <div className="card" onClick={next}>
                {loader?
                    <div className='loader-container'>
                        <Loader />
                    </div>:
                        <div>
                            <p>{num}</p>
                            <h3>{advice}</h3>
                        </div>
                }
            </div>
        </div>
     );
}
 
export default Card;