import { Pokemon } from "./shared/pokemon";
// fetch('https://omer-and-gal-poke.herokuapp.com/getData')
fetch('http://localhost:4000/getData/page=0')
    .then(res => res.json())
    .then(data => handleData(data))
    .catch(err => console.log("error " + err)
    );

let pokemonArr: Pokemon[] = [];
let input_label = document.getElementById("pokemonSearchLabel") as HTMLLabelElement;
input_label.addEventListener("click", updatePokemonHtml);

// Pagination event handler
let currentMaxPage = 1;
window.addEventListener("scroll", () => {
    if((currentMaxPage === 1 && window.scrollY >= currentMaxPage * 1700) || window.scrollY >= 1700 + (2300 * (currentMaxPage-1))) {
        currentMaxPage++;
        updatePokemonHtml();
        if(currentMaxPage % 5 == 0) {
            fetch('http://localhost:4000/getData/page=' + currentMaxPage / 5)
                .then(res => res.json())
                .then(data => handleData(data))
                .catch(err => console.log("error " + err));
        }
    }
});

// Stores data from api in pokemonArr as Pokemons
function handleData(data: any) {
    for (let i = 0; i < data.length; i++) {
        pokemonArr.push(new Pokemon(
            Number(data[i].id), 
            data[i].name,
            data[i].url,
            data[i].img,
            data[i].height,
            data[i].weight,
            data[i].types,
            data[i].hp,
            data[i].attack,
            data[i].defense,
            ));
    }
    updatePokemonHtml();
}

// Filters the pokemonArr by a given input and returns the result
function filterByName() {
    let input_value = (<HTMLInputElement>document.getElementById("pokemonSearch")).value;
    let filteredArr: Pokemon[] = [];
    for (let i = 0; i < pokemonArr.length; i++) {
        if (pokemonArr[i].name.includes(input_value)) {
            filteredArr.push(pokemonArr[i]);
        }
    }
    return filteredArr;
}

// Renders the pokemons based on the filter and page number 
function updatePokemonHtml() {
    let filteredArr = filterByName();
    let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
    pokemonList.innerHTML = "";
    for (let i = 0; i < currentMaxPage*20 && i < filteredArr.length; i++) {
        filteredArr[i].createPokeElement();
        filteredArr[i].renderInfoData(true);
    }
}
