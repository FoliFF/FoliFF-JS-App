// A list of pokemon that I choose from the website https://pokedex.org/

//Start of IIFE
let pokemonRepository = (function () {
    let repository = [{
        name: 'Quilava',
        height: 0.9,
        type: ['Fire']
    },
    {
        name: 'Lugia',
        height: 5.2,
        type: ['Psychic', 'Flying']
    },
    {
        name: 'Kabutops',
        height: 1.3,
        type: ['Water', 'Rock']
    },
    {
        name: 'Jolteon',
        height: 0.8,
        type: ['Electric']
    }];
  
    function add(pokemon) {
        if(
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ){
            repository.push(pokemon);
        }
        else{
            console.log("Pokemon is not correct");
        }
        
    }
    function getAll() {
        return repository;
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement('li');
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
    }
    //This function will show the details of the pokemon.
    function showDetails(pokemon){
        console.log(pokemon);
    }

    //all return function values
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
  })(); //end of IIFE

// Updated forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

//console.log(pokemonRepository.getAll());