const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const recipeResults = document.getElementById('recipe-results');
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
let currentPage = 1;
let totalPages = 0;

searchButton.addEventListener('click', () => {
  const ingredients = searchInput.value.trim();

  // Clear previous results
  recipeResults.innerHTML = '';

  // Reset pagination
  currentPage = 1;
  previousButton.disabled = true;
  nextButton.disabled = true;

  // Fetch recipes based on ingredients and current page
  fetchRecipes(ingredients, currentPage);
});

function fetchRecipes(ingredients, page) {
  // Make a request to the Spoonacular API to fetch recipes based on ingredients and page number
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=123c70e515374f3a81ed4bfd1a306c53&number=10&offset=${(page - 1) * 10}`)
    .then(response => response.json())
    .then(data => {
      // Process the response and append recipe cards to the recipeResults div
      data.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="Recipe Image">
          <h2>${recipe.title}</h2>
          <p>Missing Ingredients: ${recipe.missedIngredients.length}</p>
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
        `;
        recipeResults.appendChild(recipeCard);
      });

      // Calculate total pages based on the number of results
      totalResults = data.length || 0;
      totalPages = Math.ceil(totalResults / 10);

      // Enable/disable pagination buttons based on the current page
      updatePaginationButtons();
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

function updatePaginationButtons() {
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

previousButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchRecipes(searchInput.value.trim(), currentPage);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchRecipes(searchInput.value.trim(), currentPage);
  }
});
