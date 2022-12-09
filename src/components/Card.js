import './assets/css/card.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import { Icon } from '@iconify/react';

const Card = () => {
    const [num, setNum] = useState('')
    const [advice, setAdvice] = useState('')
    const [loader, setLoader] = useState(false)
    const [advices, setAdvices] = useState([])

    const next = () => {
        setLoader(true)
        const num = Math.floor(Math.random() * 220) + 1
        axios.get(`	https://api.adviceslip.com/advice/${num}`)
        .then(response => {
            setAdvice(response.data.slip.advice)
            setAdvices([...advices, response.data.slip])
            setNum(num)
            setLoader(false)
        })
        .catch(err => {
            alert(err)
        })
    }

    useEffect(() => {
        setLoader(true)
        next()
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