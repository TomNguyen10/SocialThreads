const apiKey = "313b1ceb88e84c02bd85b622eb6329fb";
const apiUrl = "https://api.football-data.org/v4/matches";

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Call the fetchData function and display the entire response
fetchData().then((data) => {
  if (data) {
    console.log("API Response:", data);
  }
});
