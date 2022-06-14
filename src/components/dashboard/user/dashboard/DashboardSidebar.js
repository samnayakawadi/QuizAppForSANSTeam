import {Link, Outlet} from "react-router-dom"

const UserDashboardSidebar = ()=>{
    return (
        <div className="columns is-centered m-2">
            <div className="box column has-text-centered is-3 m-2 pr-5 has-background-grey-lighter">
                <Link to="/dashboard">
                    <button className="button is-primary is-fullwidth m-2 ">Dashboard</button>
                </Link>
                <Link to="/dashboard/create-new-quiz">
                    <button className="button is-info is-fullwidth m-2 ">Create New Quiz</button>
                </Link>
                <Link to="/dashboard/create-new-questions">
                    <button className="button is-info is-fullwidth m-2 ">Create New Questions</button>
                </Link>
                <Link to="/dashboard/all-quizzes">
                    <button className="button is-success is-fullwidth m-2 ">All Quizzes</button>
                </Link>
                <Link to="/dashboard/all-questions">
                    <button className="button is-success is-fullwidth m-2 ">All Questions</button>
                </Link>
                <Link to="/dashboard/testing">
                    <button className="button is-success is-fullwidth m-2 ">_testing_</button>
                </Link>
            </div>
            <div className="column is-7">
                <Outlet/>
            </div>
        </div>

    )
}

export default UserDashboardSidebar;