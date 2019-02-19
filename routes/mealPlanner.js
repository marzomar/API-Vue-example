var express = require('express');
var axios = require('axios');
var router = express.Router();

const API_URL = 'https://foodvisor.io/itw/food/list/';

async function extract(url) {
  try {
    const response = await axios.get(url, {
      params: {
        foo: 'bar'
      },
      headers: { Authorization: "Bearer iwn-31@!3pf(w]pmarewj236^in" }
    });
    return response.data;
  } catch (error) {
    return error
  }
}

/**
 * Index the courses in the array by type ("starter", "dish", "dessert")
 * @param {Array} data 
 * @return {Object} an object containing courses indexed by type.
 */
function createIndex(data) {
  let index = {
    starter : [],
    dish : [],
    desert : []
  };
  // hack to wait for promise to resolve into data
  data.forEach(o => { 
    if (index[o.type]) {
      index[o.type].push(o);
    }
  });
  return index;
}

/**
 * 
 * @param {Array} data
 * @param {Function} callback
 */
function forEachMeal(data, callback) {
  data.starter.forEach(starter => {
    data.dish.forEach(dish => {
      data.desert.forEach(desert => {
        var meal = { starter, dish, desert };
        if (callback(meal)) {
          return;
        }
      });
    });
  });
}

/* GET Meal. */
router.get('/', async function(req, res, next) {
  let matching = [];
  // Pour optimiser, on pourrait créer indexedData en dehors de la requête de demander à l'API de foodvisor à chaque requête
  const data = await extract(API_URL);
  const indexedData = createIndex(data);
  forEachMeal(indexedData, meal => { 
    var cals = meal.starter.cal + meal.dish.cal + meal.desert.cal;
    if (cals >= 450 && cals <= 550) {
      meal.cals = cals;
      matching.push(meal);
    }
  });
  matching.sort((a,b) => a.cals - b.cals);
  res.json(matching);
});

module.exports = router;
