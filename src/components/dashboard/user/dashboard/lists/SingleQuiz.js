import {useState} from "react"
import UpdateModal from "./quiz_modal/UpdateModal"
import DeleteModal from "./quiz_modal/DeleteModal"

const SingleQuiz = ({ data, loadAllQuizzes }) => {

    const [isModal, setIsModal] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [quizSettings, setQuizSettings] = useState(data)

    const onClickHandler = () => {
        setIsModal(!isModal);
        setQuizSettings(data)
    }

    const onDeleteHandler = ()=>{
        setIsDeleteModal(!isDeleteModal)
    }

    return (
        <div className="box mb-5 has-background-primary-light">
            <DeleteModal onDeleteHandler={onDeleteHandler} isDeleteModal={isDeleteModal} data={data} loadAllQuizzes={loadAllQuizzes}/>
            <UpdateModal loadAllQuizzes={loadAllQuizzes} quizSettings={quizSettings} setQuizSettings={setQuizSettings} data={data} isModal={isModal}  onClickHandler={onClickHandler}/>
            <div className="columns p-0 is-vcentered">
                <div className="column is-6">
                    <div className="title is-5 has-text-centered">{data.quizname.replaceAll("-", " ")}</div>
                </div>
                <div className="column is-2 mt-3">
                    <button onClick={onClickHandler} type="button" className="button mb-3 is-fullwidth is-info">Update</button>
                </div>
                <div className="column is-2 mt-3">
                    <button type="button" className="button mb-3 is-fullwidth is-success" disabled>Link</button>
                </div>
                <div className="column is-2 mt-3">
                    <button onClick={onDeleteHandler} type="button" className="button mb-3 is-fullwidth is-danger">Delete</button>
                </div>
            </div>
        </div>)
}

export default SingleQuiz