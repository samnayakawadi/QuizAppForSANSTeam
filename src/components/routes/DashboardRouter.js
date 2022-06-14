import { Routes, Route, Outlet } from "react-router-dom";
import RedirectIfLoggedIn from "../redirects/RedirectIfLoggedIn";
import Logout from "../dashboard/Logout";
import PageNotFound from "../home/PageNotFound";
import UserDashboardSidebar from "../dashboard/user/dashboard/DashboardSidebar";
import UserDashboardHome from "../dashboard/user/dashboard/DashboardHome";
// import CreateNewQuiz from "../dashboard/user/dashboard/create-questions/AddQuestions";
import QuizSettings from "../dashboard/user/dashboard/create-new-quiz/QuizSettings";
import AllQuizzes from "../dashboard/user/dashboard/lists/AllQuizzes"
import AllQuestions from "../dashboard/user/dashboard/lists/AllQuestions"
import NewQuestion from ".././dashboard/user/dashboard/create-new-question/NewQuestion"
import Testing from "../dashboard/user/dashboard/Testing"

const DashboardRouter = () => {
    return (<div>
        <Routes>
            <Route exact path="/" element={<RedirectIfLoggedIn />}>
                <Route path="/" element={<UserDashboardSidebar />}>
                    <Route path="/" element={<UserDashboardHome />} />
                    <Route path="/create-new-quiz/" element={<Outlet />}>
                        <Route path="/create-new-quiz/" element={<QuizSettings />} />
                        <Route path="/create-new-quiz/settings" element={<QuizSettings />} />
                        {/* <Route path="/create-new-quiz/questions" element={<CreateNewQuiz />} /> */}
                    </Route>
                    <Route path="/create-new-questions/" element={<NewQuestion/>}/>
                    <Route path="/all-quizzes" element={<AllQuizzes/>}/>
                    <Route path="/all-questions" element={<AllQuestions/>}/>
                    <Route path="/testing" element={<Testing/>}/>
                </Route>
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    </div>)
}

export default DashboardRouter