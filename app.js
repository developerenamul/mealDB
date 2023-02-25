const loadMealCategory = () => {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const displayCategory = (categories) => {
  const cardsHolder = document.getElementById("cards-container");
  cardsHolder.innerHTML = "";
  categories.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.classList.add("col");

    // data insert to div
    div.innerHTML = `
<div class="card" onclick = "foodDetails('${category.strCategory}')">
              <img src="${
                category.strCategoryThumb
              }" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Category : ${category.strCategory}</h5>
                <p class="card-text">
                  ${category.strCategoryDescription.slice(0, 200)}
                </p>
              </div>
            </div>
`;
    cardsHolder.appendChild(div);
  });
};

// categories details

const foodDetails = (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data.meals));
};

const displayFoods = (foods) => {
  const message = document.getElementById("no-foods-message");
  if (foods === null) {
    message.classList.remove("d-none");
  }

  const cards = document.getElementById("cards-container");
  cards.innerHTML = "";
  foods.forEach((food) => {
    // console.log(food);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    
    <div class="card">
              <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${food.strMeal} </h5>
                <p class="card-text">
                  Category : ${food.strCategory}
                </p>
              </div>
            </div>
    
    `;
    cards.appendChild(div);
  });
};

loadMealCategory();
