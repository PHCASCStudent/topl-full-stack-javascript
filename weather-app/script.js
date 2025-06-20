const submitBtn = document.getElementById("submit-btn");
const inputField = document.getElementById("input-field");
const result = document.getElementById("result");
const resWeather = document.getElementById("res-weather");
const resTemp = document.getElementById("res-temp");
const resConditions = document.getElementById("res-conditions");
const labels = document.querySelectorAll(".labels");

function hideResults() {
  labels.forEach((label) => (label.style.display = "none"));
  resWeather.textContent = "";
  resTemp.textContent = "";
  resConditions.textContent = "";
}

inputField.addEventListener("change", () => {
  if (inputField.value.trimF() === "") {
    result.textContent = "Please enter a location.";
    hideResults();
  }
});

const fetchdata = async (location) => {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
      )}?unitGroup=us&key=DDXNGSNC9DLMQ6G3Q64ZAJ9RV&include=current&contentType=json`
    );
    if (!res.ok) throw new Error("Location not found");
    const data = await res.json();
    if (data.currentConditions) {
      labels.forEach((label) => (label.style.display = "block"));
      resWeather.textContent = data.currentConditions.conditions;
      resTemp.textContent = `${data.currentConditions.temp}°F`;
      resConditions.textContent = data.currentConditions.conditions;
      result.textContent = "";
    } else {
      result.textContent = "No weather data found.";
      hideResults();
    }
  } catch (err) {
    result.textContent = "Error: " + err.message;
    hideResults();
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = inputField.value.trim();
  if (location) {
    result.textContent = "";
    hideResults();
    fetchdata(location);
  } else {
    alert("Please enter a valid location.");
    hideResults();
  }
});
