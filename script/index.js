//find the necessary elements
const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("trees-container");

// load all Categories
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  data.categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className =
      "btn btn-outline  w-full hover:bg-[#15803D] hover:text-white";
    btn.innerText = category.category_name;

    categoriesContainer.appendChild(btn);
  });
};

// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }

//load all tress
const loadTrees = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
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
