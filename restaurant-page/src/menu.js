export default function loadMenu() {
  const content = document.getElementById("content");
  const menuDiv = document.createElement("div");
  menuDiv.className = "menu";

  const headline = document.createElement("h1");
  headline.textContent = "Menu";

  const list = document.createElement("ul");
  const items = [
    { name: "Purple Pasta", price: "$12" },
    { name: "Lavender Lemonade", price: "$5" },
    { name: "Eggplant Parmigiana", price: "$14" },
    { name: "Berry Cheesecake", price: "$7" },
  ];
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price}`;
    list.appendChild(li);
  });

  menuDiv.appendChild(headline);
  menuDiv.appendChild(list);
  content.appendChild(menuDiv);
}
