// article-list.js

const fetchAllRecipes = async (apiKey, numberOfRecipes = 5) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numberOfRecipes}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

const createRecipeList = (recipes) => {
  const recipeListContainer = document.createElement('div');
  recipeListContainer.classList.add('recipe-list-container'); // Tambahkan kelas CSS untuk container

  // Judul list
  const listTitle = document.createElement('h1');
  listTitle.textContent = 'Explore Recipes';
  listTitle.classList.add('recipe-list-title'); // Tambahkan kelas CSS untuk judul list
  recipeListContainer.appendChild(listTitle);

  const recipeList = document.createElement('ul');
  recipeList.classList.add('recipe-list'); // Tambahkan kelas CSS untuk list
  recipes.forEach(recipe => {
    const listItem = document.createElement('li');
    listItem.classList.add('recipe-item'); // Tambahkan kelas CSS untuk setiap item

    // Gambar resep
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('recipe-item__image-container'); // Tambahkan kelas CSS untuk container gambar
    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.title; // Gunakan judul resep sebagai alternatif teks
    image.classList.add('recipe-item__image'); // Tambahkan kelas CSS untuk gambar
    imageContainer.appendChild(image);

    // Judul resep
    const title = document.createElement('h2');
    title.textContent = recipe.title;
    title.classList.add('recipe-item__title'); // Tambahkan kelas CSS untuk judul
    imageContainer.appendChild(title); // Letakkan judul di bawah gambar
    listItem.appendChild(imageContainer);

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('recipe-item__info'); // Tambahkan kelas CSS
    const price = document.createElement('p');
    price.textContent = `$${recipe.pricePerServing.toFixed(2)}`;
    price.classList.add('recipe-item__price'); // Tambahkan kelas CSS
    infoContainer.appendChild(price);
    const readyTime = document.createElement('p');
    readyTime.textContent = `${recipe.readyInMinutes} min`;
    readyTime.classList.add('recipe-item__ready-time'); // Tambahkan kelas CSS
    infoContainer.appendChild(readyTime);
    listItem.appendChild(infoContainer);

    recipeList.appendChild(listItem);
  });

  recipeListContainer.appendChild(recipeList);
  return recipeListContainer;
};

  
export { fetchAllRecipes, createRecipeList };
