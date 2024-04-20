import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.scss';

import AppBar from './app-bar';
import HeroElement from './hero-element';
import RestaurantList from './list';
import { fetchAllRecipes, createRecipeList } from './article-list.js';
import Footer from './footer';
console.log('Hello Coders! :)');

// Membuat fungsi untuk menampilkan pesan kesalahan
const displayErrorMessage = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message'); // Tambahkan kelas CSS untuk gaya pesan kesalahan
  document.body.appendChild(errorMessage);
};

// Fungsi untuk menghapus pesan kesalahan
const removeErrorMessage = () => {
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
};

// Fungsi untuk mengecek koneksi internet
const checkInternetConnection = () => {
  const isOnline = navigator.onLine;
  if (!isOnline) {
    displayErrorMessage('Tidak ada koneksi internet. Mohon periksa koneksi Anda.');
  } else {
    removeErrorMessage();
  }
};

// Cek koneksi saat halaman dimuat
window.addEventListener('load', checkInternetConnection);

// Cek koneksi saat ada perubahan status koneksi
window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);


// Menampilkan AppBar di dalam elemen dengan id "app"
const appContainer = document.getElementById('app');
appContainer.innerHTML = AppBar();

const toggleDrawer = () => {
  const drawer = document.getElementById('drawer');
  drawer.classList.toggle('open');
};

// Event listener untuk memanggil fungsi toggleDrawer saat tombol hamburger di klik
const hamburgerButton = document.getElementById('hamburger');
hamburgerButton.addEventListener('click', toggleDrawer);

// Fungsi untuk menutup menu offcanvas ketika area luar menu diklik
const closeDrawerOutside = () => {
  const drawer = document.getElementById('drawer');
  document.addEventListener('click', function(event) {
    const isClickInside = drawer.contains(event.target);
    const isHamburgerClicked = hamburgerButton.contains(event.target);
    if (!isClickInside && !isHamburgerClicked && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }
  });
};

// Panggil fungsi closeDrawerOutside untuk menutup menu saat klik di luar menu
closeDrawerOutside();

// Menambahkan HeroElement di dalam elemen dengan id "hero"
const heroContainer = document.getElementById('hero');
heroContainer.innerHTML = HeroElement();

// Ambil data restoran dari file JSON
fetch('./data/DATA.json')
  .then(response => response.json())
  .then(data => {
    const restaurants = data.restaurants;

    // Menampilkan daftar restoran
    const restaurantContainer = document.getElementById('restaurant-container');
    restaurantContainer.innerHTML = RestaurantList(restaurants);
      
  })
  .catch(error => console.error('Error fetching data:', error));


document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = 'e18bd0846c624a7d8c4aff44b5a6e6da'; // Ganti dengan kunci API Anda
  const numberOfRecipes = 5; // Ganti dengan jumlah resep yang ingin Anda tampilkan

  try {
    const recipes = await fetchAllRecipes(apiKey, numberOfRecipes);
    const recipeList = createRecipeList(recipes);
    const articleListContainer = document.getElementById('article-list');
    articleListContainer.appendChild(recipeList);

  } catch (error) {
    console.error('Failed to load recipes:', error);
  }
});


// Menampilkan Footer di dalam elemen dengan id "footer"
const footerContainer = document.getElementById('footer');
footerContainer.innerHTML = Footer();

