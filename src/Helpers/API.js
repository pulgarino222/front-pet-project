// Function to fetch all pets from the server
export const getPets = async () => {
  try {
      // Uncomment the line below for local testing
      // let url = `${baseURL}/pets`; 
      // Uncomment the line below for local server testing
      // let url = `http://localhost:8080/pets/`; 
      // Use the following URL for production
      let url = `https://c19-24-m-node.onrender.com/pets/`;
      const res = await fetch(url); // Fetch the data from the API
      const data = await res.json(); // Parse the response as JSON
      if (data.status === "success") return data.payload; // Return the payload if the request was successful
  } catch (err) {
      console.log(err); // Log any errors that occur during the fetch
  }
};

// Function to fetch user information based on user ID
export const getUserInfo = async (_id) => {
  console.log(_id); // Log the user ID for debugging purposes
  try {
      // Uncomment the line below for local testing
      // let url = `${baseURL}/users`; 
      // Uncomment the line below for local server testing
      // let url = `http://localhost:8080/users`; 
      // Use the following URL for production with the user ID
      let url = `https://c19-24-m-node.onrender.com/users/${_id}`;
      const res = await fetch(url); // Fetch the data from the API
      const data = await res.json(); // Parse the response as JSON
      if (data.status === "success") return data.payload; // Return the payload if the request was successful
  } catch (err) {
      console.log(err); // Log any errors that occur during the fetch
  }
};
