// Your code here
const form = document.querySelector("form");
const section = document.getElementById("weather");
const input = document.getElementById("weather-search");
const api_key = "4237191eb462a237532ce11fc2d03958";

form.onsubmit = async (e) => {
  e.preventDefault();
  let query = input.value;
  input.value = "";
  section.innerHTML = "";
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${api_key}&q=${query}`
  );

  console.log(response);
  let data = await response.json();
  console.log(data);
  if ((data.cod && data.cod !== 200) || data.data) {
    let h2 = document.createElement("h2");
    h2.innerHTML = "Location Not Found";
    section.replaceChildren(h2);
    return;
  }
  render(data);
};

const render = ({
  coord: { lat, lon },
  dt,
  main: { temp, feels_like },
  name,
  sys: { country },
  weather,
}) => {
  const { icon, description } = weather[0];
  let city = createElement("h2", { innerHTML: `${name}, ${country}` });
  let mapLink = createElement("a", {
    innerHTML: "Click to view map",
    href: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    target: "__BLANK",
  });
  let iconImg = createElement("img", {
    src: `https://openweathermap.org/img/wn/${icon}@2x.png`,
  });
  let condition = createElement(
    "p",
    {
      innerHTML: description,
    },
    {
      textTransform: "capitalize",
    }
  );
  let current = createElement("p", {
    innerHTML: `Current: ${temp}&deg;`,
  });
  let feelsLike = createElement("p", {
    innerHTML: `Feels like: ${feels_like}&deg;`,
  });
  let date = new Date(dt * 1000);
  let lastUpdated = createElement("p", {
    innerHTML: `Last updated: ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`,
  });

  section.replaceChildren(
    city,
    mapLink,
    iconImg,
    condition,
    current,
    feelsLike,
    lastUpdated
  );
};

const createElement = (el, props, styles = null) => {
  let element = document.createElement(el);
  for (let prop in props) {
    element[prop] = props[prop];
  }
  if (styles) {
    for (let style in styles) {
      element.style[style] = styles[style];
    }
  }
  return element;
};
