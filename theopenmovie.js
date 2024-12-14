const API_KEY = "8e13d43e";
const BASE_URL = "https://www.omdbapi.com/";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsTable = document.getElementById("results-table");
const detailsSection = document.getElementById("details");
const detailsContent = document.getElementById("details-content");
const closeModal = document.getElementById("close-modal");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value;
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${query}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      displayResults(data.Search);
    } else {
      alert("Resultados no encontrados!");
    }
  } catch (error) {
    console.error("Error al buscar datos:", error);
  }
});

function displayResults(results) {
  resultsTable.innerHTML = "";
  results.forEach((movie) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="Poster" width="50"></td>
      <td>${movie.Title}</td>
      <td>${movie.Year}</td>
      <td><button onclick="viewDetails('${movie.imdbID}')">Ver más</button></td>
    `;
    resultsTable.appendChild(row);
  });
}

async function viewDetails(imdbID) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      detailsContent.innerHTML = `
        <h3>${data.Title}</h3>
        <img src="${data.Poster !== "N/A" ? data.Poster : 'placeholder.jpg'}" alt="Poster" width="150">
        <p><strong>Año:</strong> ${data.Year}</p>
        <p><strong>Genero:</strong> ${data.Genre}</p>
      `;
      detailsSection.style.display = "block";
    } else {
      alert("Details no encontrados!");
    }
  } catch (error) {
    console.error("Error al buscar detalles:", error);
  }
}

closeModal.addEventListener("click", () => {
  detailsSection.style.display = "none";
});