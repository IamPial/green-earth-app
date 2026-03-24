//find the necessary elements
const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loadingSpinner");

// show loading spinner
const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
  treesContainer.innerHTML = "";
};

// hide loading spinner
const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
};

// load all Categories
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  data.categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline  w-full ";
    btn.innerText = category.category_name;
    btn.onclick = () => selectCategory(category.id, btn);

    categoriesContainer.appendChild(btn);
  });
};

// Select Category button & display the card with categories
const selectCategory = async (categoryId, btn) => {
  const allButtons = document.querySelectorAll(
    "#categories-container button, #allTreesBtn",
  );
  showLoading();
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await res.json();
  hideLoading();
  displayLoadTrees(data.plants);
};

//load all tress
const loadTrees = async () => {
  showLoading();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideLoading();
  displayLoadTrees(data.plants);
};

// displayTrees load tress
const displayLoadTrees = (trees) => {
  trees.forEach((tree) => {
    const div = document.createElement("div");
    div.className = "card bg-base-200 p-2 shadow-sm ";
    div.innerHTML = `
            <figure>
                  <img
                    src=${tree.image}
                    alt="Shoes"
                    class="rounded-lg h-48 w-full" 
                  />
            </figure>
                <div class="space-y-3 py-3 px-1">
                  <h2 class="card-title">${tree.name}</h2>
                  <p class="text-xs text-slate-600 line-clamp-2">
                    ${tree.description}
                  </p>
                  <div class="flex justify-between">
                    <span
                      class="badge bg-[#DCFCE7] text-[#15803D] rounded-full text-xs font-medium"
                      >${tree.category}</span
                    >
                    <span class="font-semibold text-neutral-800">৳${tree.price}</span>
                  </div>
                  <div class="card-actions">
                    <button class="btn btn-primary w-full rounded-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
    `;
    treesContainer.appendChild(div);
  });
};

loadTrees();

loadCategories();
