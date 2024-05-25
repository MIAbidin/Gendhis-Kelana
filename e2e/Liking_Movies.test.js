const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click('.restaurant__name a');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.dontSeeElement('.restaurant-item');
});

Scenario('searching liked restaurants', async ({ I }) => {
  // Memastikan bahwa pesan 'Tidak ada restoran untuk ditampilkan' muncul jika tidak ada restoran yang disukai.
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container');

  // Kembali ke halaman utama.
  I.amOnPage('/');

  // Memastikan ada restoran yang dapat disukai dan menambahkan 3 restoran ke daftar restoran yang disukai.
  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i));

    // Memastikan tombol suka muncul dan mengkliknya.
    I.seeElement('#likeButton');
    I.click('#likeButton');

    // Mengambil nama restoran yang baru disukai.
    names.push(await I.grabTextFrom('.restaurant__name'));

    // Menunggu sebentar sebelum kembali ke halaman utama
    await I.wait(1); // Menunggu 1 detik (Anda bisa menyesuaikan waktu tunggu sesuai kebutuhan)

    I.amOnPage('/');
  }

  // Pergi ke halaman daftar restoran yang disukai.
  I.amOnPage('/#/like');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(names.length, visibleLikedRestaurants);

  // Memilih query pencarian, misalnya mengambil bagian dari nama restoran kedua.
  const searchQuery = names[1].substring(1, 3);

  // Mengisi input pencarian dengan query pencarian.
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // Memastikan bahwa hanya restoran yang sesuai dengan query pencarian yang ditampilkan.
  const visibleSearchedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(visibleSearchedRestaurants, 1);
});