const { got } = require("got-cjs");

// STEP 1:
// Use the readme file provided to write documentation for the add function. 
// Please provide a description, input parameters, expected results, and an example of the function in use.

function add(num1, num2) {
    return num1 + num2
}

function add(...nums) {
    return nums.reduce((prev, cur) => prev + cur, 0);
}


// STEP 2:
// Use the readme file provided to write documentation for the findSimilarities function. 
// Please provide a description, input parameters, expected results, and an example of the function in use.

function findSimilarities(obj1, obj2) {
    const similarities = {};
    Object.entries(user1).forEach(([k, v]) => {
        if (v === user2[k]) {
            similarities[k] = v;
        }
    });

    return similarities;
}

// STEP 3:
// Use the readme file provided to write documentation for the fetchData function.
// Please take the time to look at the documentation for the zippopotam API, then write up the documentation (inputs, outputs, example)

async function fetchLatLong(zipcode) {
    const { body: bodyString } = await got.get(`https://api.zippopotam.us/us/${zipcode}`);
    const body = JSON.parse(bodyString);
    if (body && body['places'] && body['places'][0]) {
        return { 
            longitude: body['places'][0]['longitude'],
            latitude: body['places'][0]['latitude'] 
        }
    } else {
        return 'No Location Found';
    }
}
