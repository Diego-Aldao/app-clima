let ciudad = "Mendoza";
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=65f15d1463f05830a8c4938fa985f2c1
`;

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
