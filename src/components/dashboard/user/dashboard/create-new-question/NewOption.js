import { useState } from "react"

const NewOption = ({ index, deleteOption, data, onOptionUpdateHandler }) => {

    const [optionData, setOptionData] = useState(data)

    const onOptionChangeHandler = (events) => {
        if (events.target.name === "questiontype") {
            // setOptionData({...optionData,  markedasanswer: !(optionData.markedasanswer)  })
            setOptionData(prevState => {
                return { ...prevState, markedasanswer: !(optionData.markedasanswer) }
            })
        }
        
        else{
            setOptionData(prevState => {
                return { ...prevState, [events.target.name]: events.target.value }
            })
        }
    }

    // const AnswerHandler = () => {
    //     setOptionData({ ...optionData, markedasanswer: !(optionData.markedasanswer) })
    //     setTimeout(() => {
    //         onOptionUpdateHandler(index, optionData)
    //     }, 1500)
    // }

    return (
        <div className="field columns is-centered is-vcentered p-0">
            <div className="column is-2">
                <label className="label">Option {index + 1}</label>
            </div>
            <div className="column is-4">
                <div className="control">
                    <input name="optiontext" onChange={onOptionChangeHandler} value={optionData.optiontext} className="input" type="text" placeholder={`Enter Option ${index + 1}`} />
                </div>
            </div>
            {/* <div className="column is-4">
                <button type="button" className="button is-info" onClick={AnswerHandler}>{optionData.markedasanswer ? "Marked as Answer" : "✔ Mark as Answer"}</button>
            </div> */}
            {/* <div className="field columns is-centered"> */}
            {/* <div className="column is-4">
                            <label className="label">Question Type</label>
                        </div> */}
            <div className="column is-3">
                <div className="control">
                    <label className="switch">
                        <input type="checkbox" name="questiontype" onChange={() => { onOptionChangeHandler() }} checked={optionData.markedasanswer} />
                        <span className="check" />
                        <span className="control-label">{optionData.markedasanswer ? "Answer" : "..."}</span>
                    </label>
                </div>
            </div>
            {/* </div> */}
            <div className="column is-1">
                <button type="button" className="button is-danger" onClick={() => { deleteOption(index) }}>X</button>
            </div>
        </div>
    )
}

export default NewOption;