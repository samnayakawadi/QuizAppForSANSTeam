import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserContext } from "../../../../context/UserContext"
import SingleQuiz from "./SingleQuiz"

const AllQuizzes = () => {

    const { userContextData } = useContext(UserContext);
    const [allQuizzes, setAllQuizzes] = useState([])
    const [alert, setAlert] = useState({ status: false });

    const loadAllQuizzes = () => {
        setAlert({ status: true, type: "is-primary", msg: "Processing..." })

        setTimeout(() => {
            axios.get(`http://localhost:8080/all-quizzes/${userContextData.username}`).then(response => {
                setAllQuizzes(response.data)
                setAlert({ status: false })
                console.log(response.data)
            }).catch(() => {
                alert("Server Error 500")
            })
        }, 800)
    }

    useEffect(loadAllQuizzes, [])

    return (
        <div>
            <div className="has-text-centered">
                <div className="box has-background-danger-light">
                    <div className="box has-background-grey has-text-centered has-text-white">All Quizzes</div>
                </div>
            </div>
            {alert.status && <div className="mt-5 box"><div className={`notification ${alert.type}`}>{alert.msg}</div>
            </div>}
            {!alert.status && <div className="box mt-5 has-background-danger-light">

                {allQuizzes.length === 0 && <div className="box has-text-centered">No Quiz Found</div>}

                {allQuizzes.length !== 0 && allQuizzes.slice(0).reverse().map(quiz => {
                    return <SingleQuiz loadAllQuizzes={loadAllQuizzes} data={quiz} />
                })}
            </div>}
        </div>
    )
}

export default AllQuizzes