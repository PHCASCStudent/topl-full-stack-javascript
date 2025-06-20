const submitBtn = document.getElementById("submit-btn");
const inputField = document.getElementById("input-field");
const result = document.getElementById("result");

const fetchdata = async (location) => {
  console.log(location);
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
      )}?unitGroup=us&key=DDXNGSNC9DLMQ6G3Q64ZAJ9RV&include=current&contentType=json`
    );
    if (!res.ok) throw new Error("Location not found");
    const data = await res.json();
    console.log(data);
    // Show a simple summary (current temp and condition)
    if (data.currentConditions) {
      result.textContent = `Weather in ${data.resolvedAddress || location}: ${
        data.currentConditions.temp
      }°F, ${data.currentConditions.conditions}`;
    } else {
      result.textContent = "No weather data found.";
    }
  } catch (err) {
    result.textContent = "Error: " + err.message;
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submit
  const location = inputField.value.trim();
  if (location) {
    fetchdata(location);
  } else {
    alert("Please enter a valid location.");
  }
  console.log("location", location);
});
