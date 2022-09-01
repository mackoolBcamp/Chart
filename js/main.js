const countrySelectElement = document.querySelector(".country_option");
const citiesSelect = document.getElementById("allCities")

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

function getCovidData() { }



async function apiCall() {
  axios
    .get("https://coronavirus.m.pipedream.net")
    .then((response) => {
      const citiesArray = []
      for (let index = 0; index < response.data.rawData.length; index++) {
        citiesArray.push(response.data.rawData[index].Country_Region)
      }
      let result = citiesArray.filter((item,index)=>{
        return citiesArray.indexOf(item) === index;
      })
      console.log(result);
      result.forEach(element => {
        citiesSelect.innerHTML += `<select id="allCities" class="country">
        <option value="${element}">${element}</option>
        </select>`
      });
      const setData = () => {
        const index = response.data.rawData.map(element=> {
          if (element.Country_Region== citiesSelect.value) {
            console.log(element)
          }
        })
        console.log(citiesSelect.value)
      }
      document.getElementById("btn").addEventListener("click",setData)
    })
    .catch((err) => console.log("Not resolved"));
  // .finally(() => console.log("Resolved anyway"));
}
apiCall()

