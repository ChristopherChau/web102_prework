/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++)
    {
        const gameCardInfo = document.createElement('div');

        gameCardInfo.classList.add('game-card');

        gameCardInfo.innerHTML = `
        <img src = "${games[i].img}" class="game-img">
        <h2>${games[i].name}</h2>
        <p>${games[i].description}}</p>
        <p>Backers: ${games[i].backers.toLocaleString('en-US')}</p>
        <p>Total Pledged: $${games[i].pledged.toLocaleString('en-US')}</p>
        <a href="#donate-section" class="donate-button">Donate Now</a>
        `;

        gamesContainer.appendChild(gameCardInfo);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce( (total,games) => {
    return total + games.backers;
}, 0);

contributionsCard.innerHTML = `${totalBackers.toLocaleString('en-US')}`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((totalMoney,games)=>{
    return totalMoney + games.pledged;
},0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// const totalGames = GAMES_JSON.reduce((totalGames, games) =>{
//     return totalGames + games;
// },0);

gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unFunded = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
    });
    addGamesToPage(unFunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener('click', filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener('click', filterFundedOnly);
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener('click', showAllGames);
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const arrayOfUnfundedGames = GAMES_JSON.filter((game) => {
    return game.goal > game.pledged;
});
const numberOfUnfunded = arrayOfUnfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
const correctGamePluralStr = numberOfUnfunded === 1 ? 'game' : 'games';
const remainGrammar = numberOfUnfunded === 1 ? 'remains' : 'remain';

const displayStr = `
<div class="alignContent">
A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, ${numberOfUnfunded} ${correctGamePluralStr} ${remainGrammar} unfunded. We need your help to fund ${correctGamePluralStr === 'game' ? 'this amazing game!' : 'these amazing games!'}
</div>
`;




// create a new DOM element containing the template string and append it to the description container
const unfundedSummary = document.createElement('p');
unfundedSummary.innerHTML = displayStr;
descriptionContainer.appendChild(unfundedSummary);



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});


let [firstGame, secondGame, ...others] = sortedGames;
let firstGameName = firstGame.name;
let secondGameName = secondGame.name;

let topGame = document.createElement('p');
topGame.innerHTML = firstGameName;
firstGameContainer.appendChild(topGame);

let runnerUpGame = document.createElement('p');
runnerUpGame.innerHTML = secondGameName;
secondGameContainer.appendChild(runnerUpGame);



// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
