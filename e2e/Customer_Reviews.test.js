const assert = require('assert');

Feature('Customer Reviews');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('adding a customer review to a restaurant', async ({ I }) => {
  I.seeElement('.restaurant__name a');
  const restaurantIndex = 2; // misalnya, restoran kedua
  const restaurantSelector = locate('.restaurant__name a').at(restaurantIndex);
  const restaurantName = await I.grabTextFrom(restaurantSelector);
  I.click(restaurantSelector);

  I.seeElement('#reviewForm');

  const reviewName = 'Irfan';
  const reviewText = 'Nice Food';

  I.clearField('#reviewName');
  I.clearField('#reviewText');

  I.fillField('#reviewName', reviewName);
  I.fillField('#reviewText', reviewText);

  I.forceClick('.submit-review-button');

  I.waitForVisible('.restaurant__reviews');
});
