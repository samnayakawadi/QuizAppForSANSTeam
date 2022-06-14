import {useState} from "react"
import axios from "axios"

const DeleteModal = ({ loadAllQuestions, data, onDeleteHandler, isDeleteModal }) => {

    const active = isDeleteModal ? "is-active" : "";
    const [alert, setAlert] = useState({ status: false });

    const onSubmitHandler = () => {
        setAlert({ status: true, type: "is-primary", msg: "Processing..." })

        setTimeout(() => {

            axios.delete(`http://localhost:8080/delete-quiz/${data.quizid}`).then(response => {
                if (response.data.status) {
                    setAlert({ status: true, type: "is-success", msg: response.data.msg })
                    setTimeout(() => {
                        loadAllQuestions()
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
                            <p className="modal-card-title">Delete Quiz - {data.questiontitle}</p>
                            <button
                                onClick={onDeleteHandler}
                                className="delete"
                                aria-label="close"
                            />
                        </header>
                        <section className="modal-card-body">
                        
                        {alert.status &&
                                    <div className={` mb-5 notification ${alert.type}`}>{alert.msg}</div>
                                }
                            <div className="title is-5">Are You sure you want to delete this ?</div>

                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={onSubmitHandler} className="button is-danger">Confirm Delete</button>
                            <button onClick={onDeleteHandler} className="button">
                                Cancel
                            </button>
                        </footer>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DeleteModal