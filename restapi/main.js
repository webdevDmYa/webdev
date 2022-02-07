const OMDbApi = 'http://www.omdbapi.com/?i=tt3896198&apikey=9b41e244';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const fourURL = 'https://api.foursquare.com/v3/places/search?near=';
async function getPlaces() {
  const options = {
    method: 'GET',
    Headers: {
      Accept: 'application/json',
      Authorization: 'fsq308P0zTuLC+KTx8lsm5gUA+BfockSNCmE7QZHhErNY2Q=',
    },
    mode: 'no-cors',
  };

  try {
    const city = document.getElementById('fours').value;
    const urlToFetch = `${fourURL}${city}&limit=5`;
    const response = await fetch(urlToFetch, options);
    if (response.ok) {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', function () {
  getPlaces();
});
