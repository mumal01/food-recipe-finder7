document.getElementById('search-btn').addEventListener('click', getMealList);

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();

    if (!searchInputTxt) {
        document.getElementById('meal-list').innerHTML = "Please enter an ingredient.";
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <h3>${meal.strMeal}</h3>
                            <a href="https://www.themealdb.com/meal.php?c=${meal.idMeal}" target="_blank">View Recipe</a>
                        </div>
                    `;
                });
            } else {
                html = "<p>No meals found! Try another ingredient.</p>";
            }
            document.getElementById('meal-list').innerHTML = html;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('meal-list').innerHTML = "Error fetching data. Please try again later.";
        });
}
