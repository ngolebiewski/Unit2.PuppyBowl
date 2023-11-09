//CAREFUL! Use within scope of functions
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
    return state.teams;
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
    const currentPlayer = state.currentPlayer
    return currentPlayer;
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

//////////////////////////////////////
/// LISTENER AND RENDER FUNCTIONS  ///
//////////////////////////////////////

const addCardListeners = () => {
  const dogCardArticles = document.querySelectorAll(`article`);
  dogCardArticles.forEach(card => {
    card.addEventListener(`click`, (e) =>{
      const cardID = (e.currentTarget.id);
      renderDetails(cardID);
    })
  })
};

const renderDetails = async (cardIndex) => {
  const dogID = (state.dogPlayers[cardIndex].id);
  const dogDetails = await getIndividualPlayerFromAPI(dogID);
  const currentPlayerKeys = Object.keys(dogDetails);

  let html = `<article class="detail-view"><img src="${dogDetails.imageUrl}" alt="dog big pic" width=60%>`;
  currentPlayerKeys.forEach(key => html += `<p>${key}: ${dogDetails[key]}</p>`);
  html += `<button id="back-button">Back to Player Cards</button></article>`;

  const detailSection = document.createElement(`section`);
  detailSection.id = `details`;
  detailSection.innerHTML = html;
  main.replaceChildren(detailSection);

  //listener
  const backButton = document.getElementById(`back-button`);
  backButton.addEventListener(`click`, (e) => renderCards());
  //a weird "OBJECT PROMISE text appears under the header after adding the above line
}



const renderNavSection = () => {
  //all view button TBD
  const navigationSection = document.createElement(`section`);
  navigationSection.id = `navigation`;
  main.appendChild(navigationSection);
  navigationSection.innerHTML = `<h1>Add a new Puppy Player</h1>`;

  //team view TODO
    //const and append NAVIGATION element
      //make 2 buttons inside: all view & team view

  /////////
   //form
    //name
    //breed
    //imageurl
    //submit button
  const form = document.createElement(`form`);
  form.innerHTML = `
  <label>Dog Name</label><input id='pupName' type="text"></input><br>
  <label>Dog Picture URL</label><input id='pupImageURL' type="text"></input><br>
  <label>Dog Breed(s)</label><input id='pupBreed' type="text"></input><br>
  <button id='pupSubmit'>Submit Your Dog</button>
  `;
  navigationSection.appendChild(form);

  const nameInput = document.querySelector(`#pupName`);
  const imageInput = document.querySelector(`#pupImageURL`);
  const breedInput = document.querySelector(`#pupBreed`);
  
  form.addEventListener(`submit`, (e) =>{
    e.preventDefault();
    postNewDog(nameInput.value, imageInput.value, breedInput.value);
  })

  
}

postNewDog = async (theName, theImage, theBreed) => {
  try {
    await fetch(`${baseURL}players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: theName,
        imageUrl: theImage,
        breed: theBreed
      }),
    })
    alert(`your dog has been added to the Bowling League`)
  } catch (error) {
    console.log(error);
  }
  refreshCards();
}



const renderCards = async () => {
  main.innerHTML = ``;
  renderNavSection(); 
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

  addCardListeners();

}

const renderForm = () => {}
const renderTeams = () => {}

// const renderCardMain = () => {
//   renderNavSection();
//   renderCards();
//   renderForm();
// }


const refreshCards = () =>
{renderCards()};

renderCards();













