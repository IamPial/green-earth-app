//find the necessary elements
const categoriesContainer = document.getElementById("categories-container");

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
loadCategories();
