const form = document.getElementById('questionnaireForm');
const resultDiv = document.getElementById('result');
const bmrResultSpan = document.getElementById('bmrResult');
const recipeResultsDiv = document.getElementById('recipeResults');
const recipeList = document.getElementById('recipeList');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    const bmr = calculateBMR(weight, height, age, gender);
    bmrResultSpan.textContent = bmr.toFixed(2);

    resultDiv.classList.remove('hidden');

    // Get recommended calories for meal planning (you can adjust this based on user preferences)
    const recommendedCalories = bmr * 1.5;

    // Search recipes using Edamam's API
    searchRecipes(recommendedCalories);
});

function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

async function searchRecipes(calories) {
    calories = calories/3
    const url = `http://localhost:8000/recipes?calories=${calories}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.hits && data.hits.length > 0) {
        const recipe = data.hits[Math.floor(Math.random() * 10) + 1].recipe;
        const recipeImage = recipe.image;
        const recipeUrl = recipe.url;
  
        // Display the recipe image
        const imageContainer = document.getElementById('recipeImage');
        imageContainer.src = recipeImage;
        imageContainer.alt = recipe.label;
        
        const recipeLabelSpan = document.getElementById('recipeLabel');
        recipeLabelSpan.textContent = recipe.label;

        // Display the recipe link
        const recipeLink = document.getElementById('recipeLink');
        recipeLink.href = recipeUrl;
        recipeLink.textContent = 'View Recipe';
        recipeLink.target = '_blank';
  
        // Show the recipe result container
        const recipeResultsDiv = document.getElementById('recipeResults');
        recipeResultsDiv.classList.remove('hidden');
      } else {
        const recipeResultsDiv = document.getElementById('recipeResults');
        recipeResultsDiv.innerHTML = '<p>No recipes found for your calorie requirements.</p>';
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }
  