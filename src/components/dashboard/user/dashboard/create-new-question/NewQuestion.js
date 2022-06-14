import NewOption from "./NewOption"
import { useState } from "react";
import { useContext } from "react"
import { UserContext } from "../../../../context/UserContext"
// import { useNavigate } from "react-router-dom"
import axios from "axios";

const NewQuestion = () => {
    const { userContextData } = useContext(UserContext)
    const [questionData, setQuestionData] = useState({username: userContextData.username, questiontype: false, questiontitle: "", questiondescription: "", questionimageurl: "http://google.com", options: [{ optiontext: "", markedasanswer: false }] });

    const loadData = ()=>{
        setQuestionData({ questiontype: false, questiontitle: "", questiondescription: "", questionimageurl: "http://google.com", options: [{ optiontext: "", markedasanswer: false }] })
    }
    
    const [alert, setAlert] = useState({ status: false });

    const optionDeleteHandler = (optionIndex) => {
        const allOptions = [...questionData.options];
        allOptions.splice(optionIndex, 1);
        const updatedQuestion = { ...questionData, options: allOptions }
        setQuestionData(updatedQuestion)
    }

    const optionAddHandler = () => {
        const newOptionFormat = { optiontext: "", markedasanswer: false }
        const updatedOptions = [...questionData.options, newOptionFormat]
        const updatedQuestion = { ...questionData, options: updatedOptions }
        setQuestionData(updatedQuestion)
    }

    const onQuestionChangeHandler = (events) => {
        if (events.target.name === "questiontype") {
            setQuestionData({ ...questionData, [events.target.name]: !questionData.questiontype });
        }
        else {
            setQuestionData({ ...questionData, [events.target.name]: events.target.value });
        }
    }

    const onOptionUpdateHandler = (index, optionData) => {
        const newOptions = questionData.options.map((option, currentIndex) => {
            if (index === currentIndex) {
                return optionData
            }
            return option
        })
        setQuestionData({ ...questionData, options: newOptions })
    }

    const onSubmitHandler = () => {
        console.log(questionData)

        setAlert({ status: true, type: "is-primary", msg: "Processing..." })

        setTimeout(() => {
            axios.post(`http://localhost:8080/add-new-question`, questionData).then(response => {
                if (response.data.status) {
                    setAlert({ status: true, type: "is-success", msg: "Question Created Successfully" })
                    setTimeout(() => {
                        // navigate("/dashboard/create-new-questions")
                        setAlert({status:false})
                        loadData()
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

    return (
        <div >
            <div className="box has-background-danger-light">
                <div className="box has-background-grey has-text-centered has-text-white">Add New Question</div>
            </div>

            <div className="box has-background-danger-light">
                <div className="box">

                    <div className="field columns is-centered">
                        <div className="column is-4">
                            <label className="label">Question Title</label>
                        </div>
                        <div className="column is-8">
                            <div className="control has-icons-left has-icons-right">
                                <input name="questiontitle" onChange={onQuestionChangeHandler} value={questionData.questiontitle} className="input" type="text" placeholder="Text input" />
                                <span className="icon is-small is-left">
                                    <i className="fa-solid fa-t"></i>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="field columns is-centered">
                        <div className="column is-4">
                            <label className="label">Question Type</label>
                        </div>
                        <div className="column is-8">
                            <div className="control">
                                <label className="switch">
                                    <input type="checkbox" name="questiontype" onChange={onQuestionChangeHandler} defaultValue="false" />
                                    <span className="check" />
                                    <span className="control-label">{questionData.questiontype ? "Image" : "Text"}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {!(questionData.questiontype) && <div className="field columns is-centered">
                        <div className="column is-4">
                            <label className="label">Question Description</label>
                        </div>
                        <div className="column is-8">
                            <div className="control">
                                <textarea value={questionData.questiondescription} onChange={onQuestionChangeHandler} name="questiondescription" className="textarea" placeholder="e.g. Hello world" />
                            </div>
                        </div>
                    </div>}

                    {questionData.questiontype && <div className="field columns is-centered">
                        <div className="column is-4">
                            <label className="label">Question Image</label>
                        </div>
                        <div className="column is-8">
                            <div className="control">
                                <div className="file has-name">
                                    <label className="file-label">
                                        <input name="questionimageurl" className="file-input" type="file" />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload" />
                                            </span>
                                            <span className="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                        <span className="file-name">
                                            Screen Shot 2017-07-29 at 15.54.25.png
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>

                <div className="box">
                    {
                        questionData.options.map((option, index) => <NewOption onOptionUpdateHandler={onOptionUpdateHandler} deleteOption={optionDeleteHandler} data={option} index={index} />)
                    }
                    <button type="button" className="button is-info is-fullwidth" onClick={optionAddHandler}>+ Add New Option</button>
                </div>
            </div>

            {alert.status && <div className="box mt-5 has-background-danger-light">
                <div className={`notification ${alert.type}`}>{alert.msg}</div>
            </div>}

            <div className="box mt-5 has-background-danger-light">
                <button type="button" className="button is-success is-fullwidth" onClick={onSubmitHandler}>Save {"&"} Add New Question</button>
            </div>
        </div>
    )
}

export default NewQuestion;