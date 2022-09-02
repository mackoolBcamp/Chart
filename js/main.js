const countrySelectElement = document.querySelector(".country_option");
const citiesSelect = document.getElementById("allCities")

function getCovidData() { }

async function apiCall() {
  axios
    .get("https://coronavirus.m.pipedream.net")
    .then((response) => {
      //Crea Array de los paises
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

      //Establece la gráfica
      function displayChart() {
        const labels = ["Recovered", "Deaths",];
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Casos diarios",
              backgroundColor: ["#DC002D","#30FF54"],
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
        //Actualza la gráfica
        const setData = () => {
          response.data.rawData.map(element => {
            if (element.Country_Region == citiesSelect.value) {
               index = response.data.rawData.indexOf(element)
            }
          })
          console.log(response.data.rawData[index])
          console.log(citiesSelect.value)
          myChart.data.datasets[0].data[0]=(response.data.rawData[index].Confirmed-response.data.rawData[index].Deaths)
          myChart.data.datasets[0].data[1]=response.data.rawData[index].Deaths
          console.log("Casos recuperados: ",myChart.data.datasets[0].data[0])
          console.log("Muertes: ",myChart.data.datasets[0].data[1])
          myChart.update()
          document.getElementById("chartInfo").innerHTML=`
          <span>Sample City: ${response.data.rawData[index].Combined_Key}</span>
          <br/>
          <span>Last Update: ${response.data.rawData[index].Last_Update}</span>
          `
        }
        document.getElementById("btn").addEventListener("click", setData)
      }
      displayChart();

    })
    .catch((err) => console.log("Not resolved"));
  // .finally(() => console.log("Resolved anyway"));
}
apiCall()

