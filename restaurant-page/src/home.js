export default function loadHome() {
  const content = document.getElementById("content");
  const homeDiv = document.createElement("div");
  homeDiv.className = "home";

  const headline = document.createElement("h1");
  headline.textContent = "Welcome to Purple Spoon!";

  const img = document.createElement("img");
  img.src =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";
  img.alt = "Restaurant interior";
  img.style.maxWidth = "300px";
  img.style.display = "block";
  img.style.margin = "1rem auto";

  const desc = document.createElement("p");
  desc.textContent =
    "Experience the best food in town with a cozy atmosphere and friendly staff. We use only the freshest ingredients!";

  homeDiv.appendChild(headline);
  homeDiv.appendChild(img);
  homeDiv.appendChild(desc);
  content.appendChild(homeDiv);
}
