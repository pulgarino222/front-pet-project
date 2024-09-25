import { createContext, useEffect, useState } from "react";
// import { getPokemonData, getPokemons } from "../Helpers/PokeApi"; // Uncomment if needed for Pokémon data
import { getPets } from "../Helpers/API"; // Import function to fetch pet data

// Create a context for pets
const PetsContext = createContext();

// Create a provider component for pets context
const PetsProvider = ({ children }) => {
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [error, setError] = useState(false); // State to manage error status
    const [allPets, setAllPets] = useState([]); // State to hold all pets data

    const [likepets, setLikepets] = useState([]); // State to manage liked pets
    const [dislikepets, setDislikepets] = useState([]); // State to manage disliked pets

    const [showDetails, setShowDetails] = useState(false); // State to control pet detail visibility
    const [userID, setUserID] = useState(null); // State to store user ID
    const [userInfo, setUserInfo] = useState(null); // State to store user information

    // Function to fetch all pets from the API
    const getAllPets = async () => {
        setLoading(true); // Set loading to true before fetching

        try {
            const data = await getPets(); // Fetch pet data

            setAllPets(data); // Store fetched data in state
            setLoading(false); // Set loading to false after fetching
        } catch (error) {
            setLoading(false); // Set loading to false in case of error
            setError(true); // Set error state to true
        }
    };

    // useEffect hook to fetch pets when the component mounts
    useEffect(() => {
        getAllPets();
    }, []);

    // Prepare data to be provided through context
    const data = {
        loading,
        setLoading,
        error,
        setError,
        allPets,
        dislikepets,
        setDislikepets,
        likepets,
        setLikepets,
        showDetails,
        setShowDetails,
        userID,
        setUserID,
        userInfo,
        setUserInfo,
    };

    // Return the provider with the context data
    return <PetsContext.Provider value={data}>{children}</PetsContext.Provider>;
};

// Export the provider and context for use in other components
export { PetsProvider };
export default PetsContext;
