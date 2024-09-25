import { Route, Routes } from "react-router-dom"; // Import Route and Routes for routing
import Home from "../Pages/Home/Home"; // Import the Home page component
import LoginPage from "../Pages/Auth/LoginPage"; // Import the Login page component
import RegisterPage from "../Pages/Auth/RegisterPage"; // Import the Register page component
// import Matches from "../Pages/Matches/Matches"; // Import Matches page component (currently commented out)
// import MatchPage from "../Pages/matchPage/MatchPage"; // Import Match page component (currently commented out)
import ComingSoon from "../Pages/Comming Soon/CommingSoon"; // Import Coming Soon page component
// import Catalogue from "../Pages/Catalogue/Catalogue"; // Import Catalogue page component (currently commented out)
// import { PruebaCors } from "../Pages/corsPrueba/PruebaCors"; // Import CORS test page component (currently commented out)
// import MyAccount from "../Pages/Auth/MyAccount"; // Import My Account page component (currently commented out)
import PetsContext from "../Context/GlobalContext"; // Import Pets context for global state management
import { useContext } from "react"; // Import useContext hook
import Loader from "../Components/Loading"; // Import Loader component for loading state
import AboutPage from "../Components/aboutPage/aboutPage"; // Import About page component
import PetCRUD from "../Components/crudPet/cruPet"; // Import Pet CRUD component
import AllPets from "../Components/crudPet/getAllPets"; // Import component to get all pets
import FilterPetById from "../Components/crudPet/filterByIdPet"; // Import component to filter pet by ID
import DeletePetById from "../Components/crudPet/deletePet"; // Import component to delete pet by ID
import DeleteUser from "../Components/usersCrud/deleteUserById"; // Import component to delete user by ID
import UserList from "../Components/usersCrud/getAllUser"; // Import component to list all users
import UpdateUser from "../Components/usersCrud/updateUser"; // Import component to update user information
import PetCatalog from "../Components/catalogo/catalogue"; // Import Pet Catalog component
import Catalogue from "../Pages/catalogue/catalogue"; // Import Catalogue page component

function AppRoutes() {
    const { loading } = useContext(PetsContext); // Get loading state from PetsContext

    // Show loader while data is being fetched
    if (loading) return <Loader />;

    return (
        <Routes>
            {/* Default route for any undefined paths */}
            <Route path='*' element={<ComingSoon />} />
            {/* Uncomment the route for CORS testing */}
            {/* <Route path='/pruebascors' element={<PruebaCors />} /> */}
            <Route path='/' element={<Home />} /> {/* Home route */}
            {/* Uncomment the route for Matches page */}
            {/* <Route path='/Matches' element={<Matches />} /> */}
            <Route path='/petcrud' element={<PetCRUD />} /> {/* Route for Pet CRUD operations */}
            <Route path='/petcrud/allPets' element={<AllPets />} /> {/* Route to view all pets */}
            <Route path='/petcrud/allPets/byid' element={<FilterPetById />} /> {/* Route to filter pet by ID */}
            <Route path='/petcrud/delete' element={<DeletePetById/>} /> {/* Route to delete pet */}
            {/* Uncomment the route for Match page */}
            {/* <Route path='/Match' element={<MatchPage />} />  */}
            <Route path='/Sign-Up' element={<RegisterPage />} /> {/* Route for user registration */}
            <Route path='/Log-In' element={<LoginPage />} /> {/* Route for user login */}
            {/* Uncomment the route for My Account page */}
            {/* <Route path='/Account-Settings/:userId' element={<MyAccount />} /> */}
            <Route path='/user/delete' element={<DeleteUser />} /> {/* Route to delete user */}
            <Route path='/Catalogue' element={<Catalogue/>} /> {/* Route for the Catalogue page */}
            <Route path='/getall' element={<UserList />} /> {/* Route to get all users */}
            <Route path='/update' element={<UpdateUser />} /> {/* Route to update user information */}
            {/* Uncomment the route for My Account page */}
            {/* <Route path='/Account-Settings' element={<MyAccount />} /> */}
            {/* Uncomment the route for Catalogue page */}
            {/* <Route path='/Catalogue' element={<Catalogue />} /> */}
            <Route path='/About-Us' element={<AboutPage/>} /> {/* Route for About Us page */}
            <Route path='/Admin' element={<ComingSoon />} /> {/* Route for Admin page (coming soon) */}
            <Route path='/Blog' element={<ComingSoon />} /> {/* Route for Blog page (coming soon) */}
        </Routes>
    );
}

export default AppRoutes; // Export AppRoutes for use in the main application
