const countrySelectElement = document.querySelector(".country_option");
const citiesSelect = document.getElementById("allCities")



function getCovidData() { }



async function apiCall() {
  axios
    .get("https://coronavirus.m.pipedream.net")
    .then((response) => {
      const citiesArray = []
      for (let index = 0; index < response.data.rawData.length; index++) {
        citiesArray.push(response.data.rawData[index].Country_Region)
      }
      let result = citiesArray.filter((item, index) => {
        return citiesArray.indexOf(item) === index;
      })
      console.log(result);
      result.forEach(element => {
        citiesSelect.innerHTML += `<select id="allCities" class="country">
        <option value="${element}">${element}</option>
        </select>`
      });
      let index = 0

      function displayChart() {
        const labels = ["Recovered", "Deaths",];
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Casos diarios",
              backgroundColor: "rgb(10, 70, 126)",
              borderColor: "rgb(255, 99, 132)",
              data: [10, 20],
            },
          ],
        };

        const config = {
          type: "doughnut",
          data: data,
          options: {},
        };
        const myChart = new Chart(document.getElementById("myChart"), config);
        console.log("se ejecuto funcion");
        const setData = () => {
          response.data.rawData.map(element => {
            if (element.Country_Region == citiesSelect.value) {
               index = response.data.rawData.indexOf(element)
            }
          })
          console.log(index)
          console.log(citiesSelect.value)
          myChart.data.datasets[0].data[0]=0
          console.log(myChart.data.datasets[0].data[0])
        }
        document.getElementById("btn").addEventListener("click", setData)

        console.log(myChart.data.datasets[0].data[0])

      }
      displayChart();

    })
    .catch((err) => console.log("Not resolved"));
  // .finally(() => console.log("Resolved anyway"));
}
apiCall()

