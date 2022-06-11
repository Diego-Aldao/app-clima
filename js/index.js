let ciudad = "Mendoza";
let apiKey = "65f15d1463f05830a8c4938fa985f2c1";
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&lang=es&units=metric&appid=${apiKey}
`;

fetch(url)
  .then((response) => response.json())
  .then((data) => manipularDatos(data));

let nombreCiudad = document.getElementById("ciudad");
let descripcion = document.getElementById("descripcion");
let tempActual = document.getElementById("temp-actual");
let sensacionTermica = document.getElementById("sensacion-termica");
let imgClimaPrincipal = document.getElementById("img-clima-principal");
let viento = document.getElementById("viento");
let humedad = document.getElementById("humedad");
let diaExtendido01 = document.getElementById("dia-extendido-01");
let fecha = document.getElementById("fecha");

const manipularDatos = (datos) => {
  nombreCiudad.innerHTML = `${datos.city.name}, ${datos.city.country}`;
  descripcion.innerHTML = `${datos.list[0].weather[0].description}`;
  fecha.innerHTML = diaDeHoy();
  tempActual.innerHTML = `${Math.round(datos.list[0].main.temp)}°c`;
  sensacionTermica.innerHTML = `sensacion térmica ${Math.round(
    datos.list[0].main.feels_like
  )}°c`;
  imgClimaPrincipal.innerHTML = `<i class="${agregarIconosPersonalizados(
    datos.list[0]
  )}"></i>`;
  viento.innerHTML = `${datos.list[0].wind.speed}m/s viento`;
  humedad.innerHTML = `${datos.list[0].main.humidity}% humedad`;
  obtenerExtendido(datos);
};

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

//CREAR SECCION EXTENDIDO
const obtenerExtendido = (datos) => {
  const timesToDisplay = [8, 16, 24, 32];
  let date;
  let nombreDia;
  let contenedorExtendido = document.getElementById("contenido-extendido");

  var contenidoDias = "";
  datos.list.forEach((lista, index) => {
    if (timesToDisplay.includes(index)) {
      date = new Date(lista.dt * 1000);
      nombreDia = dias[date.getDay()];
      contenidoDias += `<div class="dia-extendido">
                          <p class="dato-extendido">${nombreDia}</p>
                          <i class="${agregarIconosPersonalizados(
                            datos.list[index]
                          )}"></i>
                          <p class="dato-extendido dato-2">${Math.round(
                            lista.main.temp_min
                          )}° / ${Math.round(lista.main.temp_max)}°</p>
                        </div>`;
    }
  });
  contenedorExtendido.innerHTML = contenidoDias;
};

//OBTENER FECHA ACTUAL
const diaDeHoy = () => {
  let date = new Date();
  let dia = dias[date.getDay()];
  let horas = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutos = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let total = `${dia}, ${horas}:${minutos} pm`;
  return total;
};

//ICONOS PERSONALIZADOS
const agregarIconosPersonalizados = (datos) => {
  var prefix = "wi wi-";
  var code = datos.weather[0].id;
  var icon = weatherIcons[code].icon;

  /* si no estamos en el rango del code de openWeather, agregamos el prefijo dia/noche*/
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  // y agregamos el prefijo al icono
  icon = prefix + icon;
  return icon;
};
