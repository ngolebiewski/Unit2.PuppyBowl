//make state
//constantly out of scope! -- work with it -- then fix later.
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
    const roster = responseJSON.data.players;
    state.dogPlayers = roster;
    return roster;
    //add error stuff here!!!!
  } catch (error) {
    console.log(`error`);
  }
};

getPlayersFromAPI();

const getTeamsFromAPI = async () => {
  try {
    const response = await fetch(`${baseURL}teams`);
    const responseJSON = await response.json();
    state.teams = responseJSON.data.teams;
    //add error stuff here!!!!
  } catch (error) {
    console.log(`error`);
  }
};

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


////////////////////////////////////////////
/// GET DATA FROM API FOR INITIAL STATE  ///
////////////////////////////////////////////

//NOTE THIS DOESN'T WORK!!!!
//can't write to global variable from local scope
//would work with object oriented programming probably

// getPlayersFromAPI()
// getTeamsFromAPI()
// console.log(Object.keys(state))
// console.log(state.dogPlayers)


/////////////////////////
/// RENDER FUNCTIONS  ///
/////////////////////////
const renderNavSection=() => {}


///IMPORTANT!!///
const renderCards = async () => {
  renderNavSection(); //adds nav TBD
  ///main cards section
  state.dogPlayers = await getPlayersFromAPI() //loads up players into state from API
  
  const allDogArray = state.dogPlayers.map(dogInfo => {
    return `
    <content>
    <img src="${dogInfo.imageUrl}" alt="dog pic" width=100%>
    <h2>${dogInfo.name}</h2>
    </content>`
  });
  
  const cardViewSection = document.createElement(`section`);
  cardViewSection.id = `cards`;
  main.appendChild(cardViewSection);

  allDogArray.forEach((dogInfo, index) => {
    const dogCard = document.createElement(`article`);
    dogCard.id = (index);
    cardViewSection.append(dogCard);
    dogCard.innerHTML=dogInfo
  });
}

const renderForm = () => {}


// const renderCardMain = () => {
//   renderNavSection();
//   renderCards();
//   renderForm();
// }



renderCards();







const renderDetails = () => {}
const renderTeams = () => {}

///////////////////////////
/// LISTENER FUNCTIONS  ///
///////////////////////////

const addCardListeners = () => {}
const addNavListeners = () => {}
const addFormListeners = () => {}
const addBackListener = () => {}




