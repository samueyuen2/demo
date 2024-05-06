import { Routes, Route, } from "react-router-dom";

import About from "../pages/About/About";
import ListToDoItems from "../pages/ListToDoItems/ListToDoItems";
import Dashboard from "../pages/Dashboard/Dashboard";
import Insight from "../pages/Insight/Insight";

function Router() {
    return (
        <Routes>
            <Route path="/" >
                <Route index element={<Dashboard />} />
                <Route path="about" element={<About />} />

                <Route path="listToDoItems" element={<ListToDoItems />} />

                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="insight" element={<Insight />} /> */}

                {/* Default Not Found Catcher */}
                <Route path="*" element={<>Sorry, mate.<br />Page not found.</>} />
            </Route>
        </Routes>
    )
}

export default Router;