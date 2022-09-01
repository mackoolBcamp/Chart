function displayChart() {
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Casos diarios",
        backgroundColor: "rgb(10, 70, 126)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  console.log("se ejecuto funcion");
}
displayChart();

const countrysDict = {};

function getCovidData() {}

function getCountries() {
  const endpoint = "https://coronavirus.m.pipedream.net";
  fetch(endpoint)
    .then((response) => {
      return response.json();
      const json = response.json();
      console.log("object", Object.keys(json));
      console.log("json", json);
    })
    .then((response) => {
      const { rawData } = response;

      for (let item of rawData) {
        const { Country_Region } = item;
        if (!countrysDict[Country_Region]) {
          countrysDict[Country_Region] = [];
        }
        countrysDict[Country_Region].push(item);
      }

      console.log("dict", countrysDict);
      const countryNames = Object.keys(countrysDict);
      console.log("paises", countryNames);
      //Un Pais Elegido
      const oneCountryName = countryNames[53];

      const countryData = countrysDict[oneCountryName];
      console.log("countryData", oneCountryName, ":", countryData);

      //Select recibe info de oneCountryName
      const select = document.createElement("select");
      const option = document.createElement("option");
      option.setAttribute("value", oneCountryName);
      option.innerHTML = oneCountryName;
      const countrySelectElement = document.getElementById("country-option");
      countrySelectElement.appendChild(option);
      // ingreso Pais individual al select
      const option2 = document.createElement("option");
      option2.setAttribute("value", oneCountryName);
      option2.innerHTML = countryNames[9];
      countrySelectElement.appendChild(option2);
      // ingreso Pais individual al select
      const option3 = document.createElement("option");
      option3.setAttribute("value", oneCountryName);
      option3.innerHTML = countryNames[117];
      countrySelectElement.appendChild(option3);

      // console.log("2do then", response);
      // console.log("2do then", response.rawData[49].Country_Region);
    })
    .catch((err) => console.log(err));
}
getCountries();

// async function apiCall() {
//   axios
//     .get("https://coronavirus.m.pipedream.net")
//     .then((response) => console.log(response.data.rawData[49].Country_Region))
//     .catch((err) => console.log("Not resolved"));
//   // .finally(() => console.log("Resolved anyway"));
// }
// apiCall();
