//make state
const state = {
  dogPlayers: [],
  teams: [], //team ruff and team fluff LOL!
  currentPlayer: [],
}

////////////////////////
/// GLOBAL VARIABLES ///
////////////////////////
const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/`;
const main = document.querySelector(`main`);

////////////////////////
/// FETCH FUNCTIONS  ///
////////////////////////

//fetch data from API, LOL, fetch...dogs play fetch. 
const getPlayersFromAPI = async () => {
  try {
    const response = await fetch(`${baseURL}players`);
    const responseJSON = await response.json();
    state.dogPlayers = responseJSON.data.players;
    //add error stuff here!!!!
  } catch (error) {
    console.log(`error`);
  }
};

const getTeamsFromAPI = async () => {
  try {
    const response = await fetch(`${baseURL}teams`);
    const responseJSON = await response.json();
    state.teams = responseJSON.data.teams;
    console.log(state.teams);
    //add error stuff here!!!!
  } catch (error) {
    console.log(`error`);
  }
};

//I'm getting the individual player from the API to show I can, although I think I'll mainly be using the players from state
const getIndividualPlayerFromAPI = async (playerID) => {
  try {
    const response = await fetch(`${baseURL}players/${playerID}`);
    const responseJSON = await response.json();
    state.currentPlayer = responseJSON.data.player;
    console.log(state.currentPlayer);
    //add error stuff here!!!!
  } catch (error) {
    console.log(`error`);
  }
};

getIndividualPlayerFromAPI(229);