const PocketBase = require('pocketbase/cjs')
require('cross-fetch/polyfill');

const client = new PocketBase('http://127.0.0.1:8090');


async function getRecords() {
    const records = await client.records.getFullList('heart_rate', 200, {
        sort: '-created',
    });
    
    console.log(records)
}

async function newMeasurement() {
    const userData = await client.users.authViaEmail('kadlu.4321@gmail.com', '1234567890');
    console.log("test");

    let data = { user: userData.user.id, bpm: 155, timestamp: '2022-09-24 20:09:29.397', model_prob: 0.5}

    let response = await client.records.create('heart_rate', data);
    console.log(response);
}

newMeasurement()
getRecords()