import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserContext } from "../../../../context/UserContext"
import SingleQuestion from "./SingleQuestion"

const AllQuestions = () => {

    const { userContextData } = useContext(UserContext);
    const [AllQuestions, setAllQuestions] = useState([])
    const [alert, setAlert] = useState({ status: false });

    const loadAllQuestions = () => {
        setAlert({ status: true, type: "is-primary", msg: "Processing..." })

        setTimeout(() => {
            axios.get(`http://localhost:8080/all-questions/${userContextData.username}`).then(response => {
                setAllQuestions(response.data)
                setAlert({ status: false })
                console.log(response.data)
            }).catch(() => {
                alert("Server Error 500")
            })
        }, 800)
    }

    useEffect(loadAllQuestions, [])

    return (
        <div>
            <div className="has-text-centered">
                <div className="box has-background-danger-light">
                    <div className="box has-background-grey has-text-centered has-text-white">All Questions</div>
                </div>
            </div>
            {alert.status && <div className="mt-5 box"><div className={`notification ${alert.type}`}>{alert.msg}</div>
            </div>}
            {!alert.status && <div className="box mt-5 has-background-danger-light">

                {AllQuestions.length === 0 && <div className="box has-text-centered">No Question Found</div>}

                {AllQuestions.length !== 0 && AllQuestions.slice(0).reverse().map((quiz, index) => {
                    return <SingleQuestion index={index} loadAllQuestions={loadAllQuestions} data={quiz} />
                })}
            </div>}
        </div>
    )
}

export default AllQuestions