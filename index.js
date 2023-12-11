const form = document.querySelector(".js-search");
const list = document.querySelector(".js-list");
form.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();
  const {
    days: { value: daysValue },
    query: { value: queryValue },
  } = event.currentTarget.elements;
  if (!queryValue) {
    alert("Please enter your value!");
    return;
  }
  forecastApi(queryValue, daysValue).then((data) =>
    createMarkup(data.forecast.forecastday)
  );
}

const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const KEY = "557cff91c3e64c23afa215730230412";

//  function forecastApi(city = "rivne", days = 7) {
//   return fetch(`${BASE_URL}?key=${KEY}&q=${city}&days=${days}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .catch((error) => console.error(error));
// }

async function forecastApi(city = "rivne", days = 7) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${KEY}&q=${city}&days=${days}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function createMarkup(arr) {
  const markup = arr
    .map(
      (el) =>
        `<li>
  <img src="${el.day.condition.icon}" alt="el.day.condition.text" />
<p>${el.day.condition.text}</p>
<h1>Date: ${el.date}</h1>
<h2>Temperature: ${el.day.avgtemp_c}&#8451</h2>
<h3>Maxwind: ${el.day.maxwind_mph}</h3>
</li>`
    )
    .join("");
  list.innerHTML = markup;
}
