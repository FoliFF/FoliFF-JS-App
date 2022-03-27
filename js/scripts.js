// A list of pokemon that I choose from the website https://pokedex.org/

//Start of IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    console.table(pokemon); //debugged my code to solve "pokemon is not correct"
      if(
        typeof pokemon === "object" &&
          "name" in pokemon &&
          "detailsUrl" in pokemon //&&
          //"types" in pokemon
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
        console.log(pokemon);
    });
  }
  //Show Modal function
  function showModal(title, text) {

    // Clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
  }

  let dialogPromiseReject; //This can be set later, by showDialog

  function hideModal(){
    
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if(dialogPromiseReject){
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

function showDialog(title, text) {
  showModal(title, text);
  
  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');
  
  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');
  
  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';
  
  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';
  
  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);
  
  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();

  //Return a promise that resolves when confirmed, else rejects
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null; // Reset this
      hideModal();
      resolve();
    });
  
    // This can be used to reject from other functions
    dialogPromiseReject = reject;
  });

}

  //Hide modal with esc key and Event Listener
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function(){
      alert("Confirmed!");
    }, () => {
      alert("Not confirmed");
    });

  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //all return function values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})(); //end of IIFE

// Updated forEach loop
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});