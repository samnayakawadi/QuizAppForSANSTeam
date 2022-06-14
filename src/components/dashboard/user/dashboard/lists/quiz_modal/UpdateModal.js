import { useState } from "react"
import axios from "axios"

const UpdateModal = ({ loadAllQuizzes, isModal, onClickHandler, data, quizSettings, setQuizSettings }) => {

    const active = isModal ? "is-active" : "";
    const [alert, setAlert] = useState({ status: false });
    const [isQuizNameAvailable, setIsQuizNameAvailable] = useState(true)

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

    const onSubmitHandler = () => {
        if (isQuizNameAvailable) {
            console.log(quizSettings)
            setAlert({ status: true, type: "is-primary", msg: "Processing..." })

            setTimeout(() => {

                axios.put(`http://localhost:8080/update-quiz`, quizSettings).then(response => {
                    if (response.data.status) {
                        setAlert({ status: true, type: "is-success", msg: response.data.msg })
                        setTimeout(() => {
                            loadAllQuizzes()
                        }, 1000)
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

    const onSampleSubmitHandler = (events) => {
        events.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onSampleSubmitHandler}>
                <div className={`modal ${active}`}>
                    <div className="modal-background" />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Update Quiz - {data.quizname.replaceAll("-", " ")}</p>
                            <button
                                onClick={onClickHandler}
                                className="delete"
                                aria-label="close"
                            />
                        </header>
                        <section className="modal-card-body">

                            <div>

                                {alert.status &&
                                    <div className={` mb-5 notification ${alert.type}`}>{alert.msg}</div>
                                }

                                <div >
                                    <div className="">
                                        <div className="field columns is-centered">
                                            <div className="column is-4">
                                                <label className="label">Quiz Name</label>
                                            </div>
                                            <div className="column is-6">
                                                <div className="field">
                                                    <div className="control has-icons-left has-icons-right">
                                                        <input value={quizSettings.quizname.replaceAll("-", " ")} className={`input ${isQuizNameAvailable !== "typing" && (isQuizNameAvailable === null ? "is-info" : isQuizNameAvailable ? "is-success" : "is-danger")}`} name="quizname" onChange={onChangeHandler} type="text" placeholder="This will be your quiz url" />
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
                                                        <input type="checkbox" value={quizSettings.shuffle} name="shuffle" onChange={onChangeHandler} checked={quizSettings.shuffle} />
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
                                                    <input value={quizSettings.durationinhours} name="durationinhours" min="0" placeholder='00' className="input" type="number" onChange={onChangeHandler} />
                                                </div>
                                            </div>
                                            <div className="column is-2"> Hours

                                            </div>
                                            <div className="column is-2">
                                                <div className="control">
                                                    <input value={quizSettings.durationinminutes} name="durationinminutes" min="0" placeholder='00' className="input" type="number" onChange={onChangeHandler} />
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
                                                    <input value={quizSettings.attempts} name="attempts" min="1" max="5" placeholder='Maximum attempts candidate can give' className="input" type="number" onChange={onChangeHandler} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field columns is-centered">
                                            <div className="column is-4">
                                                <label className="label">Questions to Display</label>
                                            </div>
                                            <div className="column is-8">
                                                <div className="control">
                                                    <input value={quizSettings.displayedquestions} name="displayedquestions" min="1" placeholder='The number of questions to be shown in exam' className="input" type="number" onChange={onChangeHandler} />
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
                                                            <input value={quizSettings.visibility} type="checkbox" name="visibility" onChange={onChangeHandler} checked={quizSettings.visibility} />
                                                            <span className="check" />
                                                            <span className="control-label">{quizSettings.visibility ? "Online" : "Offline"}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={onSubmitHandler} className="button is-success">Save changes</button>
                            <button onClick={onClickHandler} className="button">
                                Cancel
                            </button>
                        </footer>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateModal