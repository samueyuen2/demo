import {
    BrowserRouter,
    Routes, Route,
    Outlet, Link
} from "react-router-dom";

function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    {/* <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dashboard" element={<Dashboard />} /> */}

                    {/* Default Not Found Catcher */}
                    <Route path="*" element={<>Sorry, Page not found, mate.</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;