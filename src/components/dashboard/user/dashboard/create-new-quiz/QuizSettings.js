import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const QuizSettings = () => {

    const navigate = useNavigate()
    const { userContextData } = useContext(UserContext)
    const [quizSettings, setQuizSettings] = useState({ userid: userContextData.userid, username: userContextData.username, shuffle: false, visibility: false, attempts: null, displayedquestions: null, durationinhours: null, durationinminutes: null })
    const [alert, setAlert] = useState({ status: false });
    const [isQuizNameAvailable, setIsQuizNameAvailable] = useState(null)

    const onChangeHandler = (events) => {

        if (events.target.name === "quizname") {
            setIsQuizNameAvailable("typing");
        }
        if (events.target.name === "shuffle") {
            setQuizSettings({ ...quizSettings, [events.target.name]: !quizSettings.shuffle })
        }
        else if (events.target.name === "visibility") {
            setQuizSettings({ ...quizSettings, [events.target.name]: !quizSettings.visibility })
        }
        else {
            setQuizSettings({ ...quizSettings, [events.target.name]: events.target.value })
        }
    }

    const checkAvailabilityHandler = () => {

        axios.post(`http://localhost:8080/check-quiz-name`, quizSettings).then(response => {
            if (response.data.status) {
                setIsQuizNameAvailable(true)
            }
            else {
                setIsQuizNameAvailable(false)
            }
        }).catch(err => {
            setAlert({ status: true, type: "is-danger", msg: "Server Error 500" })
        })
    }

    const onSubmitHandler = (events) => {
        events.preventDefault()
        if (isQuizNameAvailable) {
            console.log(quizSettings)
            setAlert({ status: true, type: "is-primary", msg: "Processing..." })

            setTimeout(() => {

                axios.post(`http://localhost:8080/create-new-quiz`, quizSettings).then(response => {
                    if (response.data.status) {
                        setAlert({ status: true, type: "is-success", msg: "Quiz Created Successfully. Redirecting...." })
                        setTimeout(() => {
                            navigate("/dashboard/all-quizzes")
                        }, 1200)
                    }
                    else {
                        setAlert({ status: true, type: "is-info", msg: response.data.msg })
                    }
                }).catch(err => {
                    setAlert({ status: true, type: "is-danger", msg: "Server Error 500" })
                })
            }, 1200)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div className="box has-background-danger-light">
                    <div className="box has-background-grey has-text-centered has-text-white">Quiz Settings</div>
                </div>
                <div className="box m-0 has-background-danger-light	">

                    <div className="box">
                        <div className="field columns is-centered">
                            <div className="column is-4">
                                <label className="label">Quiz Name</label>
                            </div>
                            <div className="column is-6">
                                <div className="field">
                                    <div className="control has-icons-left has-icons-right">
                                        <input className={`input ${isQuizNameAvailable !== "typing" && (isQuizNameAvailable === null ? "is-info" : isQuizNameAvailable ? "is-success" : "is-danger")}`} name="quizname" onChange={onChangeHandler} type="text" placeholder="This will be your quiz url" />
                                        <span className="icon is-small is-left">
                                            <i className="fa-solid fa-magnifying-glass" />
                                        </span>
                                        <span className="icon is-small is-right">
                                            {isQuizNameAvailable !== "typing" && <i className={`fas ${isQuizNameAvailable === null ? "" : isQuizNameAvailable ? "fa-check" : "fa-exclamation-triangle"}`} />}
                                        </span>
                                    </div>
                                    {isQuizNameAvailable !== "typing" && <p className={`help ${isQuizNameAvailable === null ? "is-info" : isQuizNameAvailable ? "is-success" : "is-danger"}`}>{isQuizNameAvailable === null ? "Please Enter Quiz Name" : isQuizNameAvailable ? "This Quiz Name is Available" : "This Quiz Name is Not Available"}</p>}
                                </div>

                            </div>
                            <div className="column is-2">
                                <button type="button" className="button is-info" onClick={checkAvailabilityHandler}>Check</button>
                            </div>
                        </div>

                        <div className="field columns is-centered">
                            <div className="column is-4">
                                <label className="label">Shuffle</label>
                            </div>
                            <div className="column is-8">
                                <div className="control">
                                    <label className="switch">
                                        <input type="checkbox" name="shuffle" onChange={onChangeHandler} defaultValue="false" />
                                        <span className="check" />
                                        <span className="control-label">{quizSettings.shuffle ? "On" : "Off"}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="field columns is-centered">
                            <div className="column is-4">
                                <label className="label">Total Duration</label>
                            </div>
                            <div className="column is-2">
                                <div className="control">
                                    <input name="durationinhours" min="0" placeholder='00' className="input" type="number" onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="column is-2"> Hours

                            </div>
                            <div className="column is-2">
                                <div className="control">
                                    <input name="durationinminutes" min="0" placeholder='00' className="input" type="number" onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="column is-2"> Minutes
                            </div>
                        </div>

                        <div className="field columns is-centered">
                            <div className="column is-4">
                                <label className="label">No. Of Attempts</label>
                            </div>
                            <div className="column is-8">
                                <div className="control">
                                    <input name="attempts" min="1" max="5" placeholder='Maximum attempts candidate can give' className="input" type="number" onChange={onChangeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="field columns is-centered">
                            <div className="column is-4">
                                <label className="label">Questions to Display</label>
                            </div>
                            <div className="column is-8">
                                <div className="control">
                                    <input name="displayedquestions" min="1" placeholder='The number of questions to be shown in exam' className="input" type="number" onChange={onChangeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="field columns is-centered">
                            <div className="column is-4">
                                <label className="label">Visibility</label>
                            </div>
                            <div className="column is-8">
                                <div className="control">
                                    <div className="control">
                                        <label className="switch">
                                            <input type="checkbox" name="visibility" onChange={onChangeHandler} defaultValue="false" />
                                            <span className="check" />
                                            <span className="control-label">{quizSettings.visibility ? "Online" : "Offline"}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {alert.status && <div className="box mt-5 has-background-danger-light">
                    <div className={`notification ${alert.type}`}>{alert.msg}</div>
                </div>}
                <div className="box mt-5 has-background-danger-light">
                    <button type="submit" className="button is-success is-fullwidth">Save Settings</button>
                </div>
            </form>
        </div>
    )
}

export default QuizSettings