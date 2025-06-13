export default function loadContact() {
  const content = document.getElementById("content");
  const contactDiv = document.createElement("div");
  contactDiv.className = "contact";

  const headline = document.createElement("h1");
  headline.textContent = "Contact Us";

  const phone = document.createElement("p");
  phone.textContent = "Phone: (555) 123-4567";

  const address = document.createElement("p");
  address.textContent = "123 Purple Lane, Flavor Town";

  const hours = document.createElement("p");
  hours.textContent = "Open daily: 11am - 10pm";

  contactDiv.appendChild(headline);
  contactDiv.appendChild(phone);
  contactDiv.appendChild(address);
  contactDiv.appendChild(hours);
  content.appendChild(contactDiv);
}
