// A list of pokemon that I choose from the website https://pokedex.org/

//Start of IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    //console.table(pokemon); //debugged my code to solve "pokemon is not correct"
      if(
        typeof pokemon === "object" &&
          "name" in pokemon &&
          "detailsUrl" in pokemon
        ){
          pokemonList.push(pokemon);
      }
      else{
        console.log("Pokemon is not correct");
      }  
    }

  function getAll() {
    return pokemonList;
  }

  function findPokemon(searchName) {
    //jquery syntax
    // Clear all the buttons on the page when user types in search box
    $('.pokemon-list').empty();

    // Add pokemon buttons for which the name includes the search string
    pokemonList.forEach(pokemon => {
      if (
        capitalizeFirstLetter(pokemon.name).indexOf(
          capitalizeFirstLetter(searchName)
        ) > -1
      ) {
        addListItem(pokemon);
      }
    });
  }

  function addListItem(pokemon){
    // In order to add each pokemon to a li in the list (ul HTML element):
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemonItem = document.createElement('div');
    listPokemonItem.classList.add('group-list-item');
    let button = document.createElement("button"); //create a button
    button.innerText = pokemon.name;
    button.classList.add("button-pokemon", "btn"); //add class name button
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    pokemonRepository.handleButtonClick(button, pokemon); //Invoke the function to add event listener
    listPokemonItem.appendChild(button);
    pokemonList.appendChild(listPokemonItem);
    
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.height = details.height;
          item.weight = details.weight;
          item.image = details.sprites;
          item.types = details.types;
          item.abilities = details.abilities;
        }).catch(function (e) {
          console.error(e);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        //console.log("item", item)
        let pokemon = {
          name: capitalizeFirstLetter(item.name),
          detailsUrl: item.url,
          height: item.url.height,
          weight: item.url.weight,
          image: item.url.sprites,
        };
        add(pokemon);
        //Adds pokemons to the pokemonList Array
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //This function will show the details of the pokemon.
  function showDetails(pokemon){
    // function that will be triggered when clicking pokemon buttons
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(item) {
    // creating the variables
    //jquery syntax
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // clear existing content
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let nameElement = $('<h1>' + capitalizeFirstLetter(item.name) + '</h1>');

    // create element for image in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imgUrl);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imgUrlBack);

    // create element for hight in modal content
    let heightElement = $('<p>' + 'height: ' + item.height + '</p>');

    // create element for weigth in modal content
    let weightElement = $('<p>' + 'weight: ' + item.weight + '</p>');

    // create element for height in modal
    let typeElement = $(
      '<p>' + 'types: ' + item.types.map(i => i.type.name).join(', ') + '</p>'
    );

    // create element for abilities in modal
    let abilityElement = $(
      '<p>' +
        'abilities: ' +
        item.abilities.map(i => i.ability.name).join(', ') +
        '</p>'
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);
  }

  function handleButtonClick(button, pokemon) {
    //add event listener to the pokemon button
    // eslint-disable-next-line no-unused-vars
    button.addEventListener('click', function(event) {
      //invoke the showdetails function once the button is clicked
      showDetails(pokemon);
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //all return function values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    handleButtonClick: handleButtonClick,
    findPokemon: findPokemon
  };
})(); //end of IIFE

// Updated forEach loop
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});