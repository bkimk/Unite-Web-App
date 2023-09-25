const axios = require('axios');

async function runTest() {
  // const data = {
  //   "name": 'food resource',
  //   "kindofresource": 'foodresource',
  //   "maxDistance": 30000,
  //   "userLatitude": 0,
  //   "userLongitude": 0,
  // };

  //console.log(data);

  try {
    let requrl = 'http://localhost:3000/resource/getResources/namenearby'
    +"/"+'food%20resource%202'
    +"/"+'foodresource'
    +"/"+30000
    +"/"+0
    +"/"+0;

    console.log(requrl);

    await axios.get(requrl,).then(resp => {

      console.log(resp.data);
  });
    
  } catch (error) {
    console.error(error);
    //console.log('Test failed');
  }
}

runTest();
