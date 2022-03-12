// A list of pokemon that I choose from the website https://pokedex.org/
//IIFE

let pokemonRepository = (function () {
    let pokemonList = [{
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
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };
  })();

// Updated forEach loop
pokemonRepository.getAll().forEach(function(pokemon){
    if(pokemon.height > 5)
        document.write(pokemon.name + ", Height: " + pokemon.height + " m, Wow that is big! </br> ");
    else if(pokemon.height < 0.9)
    document.write(pokemon.name + ", Height: " + pokemon.height + " m, Wow that is smaller than I expected! </br> ");
    else
        document.write(pokemon.name + ", Height: " + pokemon.height + " m </br>");

  });

console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Froslass', height: 5.2, type: ['Ice', 'Ghost']});
console.log(pokemonRepository.getAll()); // { name: 'Froslass', height: 5.2, type: ['Ice', 'Ghost']}

/*For-loop that will print out the pokemonList array on the page.*/
/* Commented out in case I will need to reuse this code.
for(let i = 0; i < pokemonList.length; i++)
{
    //Checks if any in the pokemonList height is over 5. If it is it will add It's big!
    if(pokemonList[i].height > 5){
        
        document.write(pokemonList[i].name + ' (Hight: ' + pokemonList[i].height + ' m) Wow that is big! </br>');
    }
    //Checks the smallest in the pokemonList. If it is it will add It's small
    else if (pokemonList[i].height < 0.9){
        document.write(pokemonList[i].name + ' (Hight: ' + pokemonList[i].height + ' m) Wow that is smaller than I expected! </br>');
    }
    // Otherwise print out their height and name
    else{ 
        document.write(pokemonList[i].name + ' (Hight: ' + pokemonList[i].height + ' m) </br>');
    }
    
}
*/