import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import PetsContext from "../Context/GlobalContext";
import { useContext } from "react";
import Loader from "../Components/Loading";
import AboutPage from "../Components/aboutPage/aboutPage";

function AppRoutes() {
    const { loading } = useContext(PetsContext);

    if (loading) return <Loader />;

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/About-Us' element={<AboutPage/>} />
            
        </Routes>
    );
}

export default AppRoutes;