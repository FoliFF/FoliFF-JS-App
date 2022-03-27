// A list of pokemon that I choose from the website https://pokedex.org/

//Start of IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
  let modalContainer = document.querySelector('#modal-container');

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

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement('li');
    let button = document.createElement("button"); //create a button
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
            name: item.name,
            detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //This function will show the details of the pokemon.
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
      console.log("Pokemon selected: " + pokemon.name + "is " + pokemon.height + " and with the abilities of " + pokemon.types);
    });
  }
  //Show Modal function
  function showModal(name, height, type, imageUrl) {
    let modalContainer = document.querySelector(".modal-container");
    document.querySelector(".modal-title").innerHTML = name;
    let pokeDescri = "Height: " + height + "<br>type: " + type;
    document.querySelector('.modal-text').innerHTML = pokeDescri;
    document.querySelector('.modal-img').setAttribute('src', imageUrl);
    console.log(imageUrl);

    // Add the new modal content
    let closeButtonElement = document.querySelector(".modal-close"); 
    closeButtonElement.addEventListener('click', hideModal);

    window.addEventListener('keydown', (e) => {
      console.log(e.key);
      if(e.key === 'Escape' && modalContainer.classList.contains('is-visible'))
        hideModal();
    });
        
    modalContainer.classList.add('is-visible');
  }

  function hideModal(){
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('is-visible');
  }

  //all return function values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})(); //end of IIFE

// Updated forEach loop
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});