import fetch from 'cross-fetch';
import path from 'path';
import fs from 'fs';
// import { Collection } from "mongodb";
import { Pokemon } from '../client/shared/pokemon';
import { InsertPokemonsTable, deletePokemonTable } from "./postgres";

export const filePath = path.join(__dirname, "./data/data.json");
const folderPath = path.join(__dirname, "./data");

// Write the data from the api to the data.json
export async function writeData(pokemonsData: any) {
  let pokemonArr: Pokemon[] = [];
  deletePokemonTable(); //delete all pokemon from collections
  for (let i = 0; i < pokemonsData.length; i++) {
    handleInfoDataJson(pokemonsData[i], pokemonArr);
  }
  console.log("Finished loading data.json to pokeArr");
  console.log("Creating & loading fusion pokemons to pokeArr");
  const fusionsNum = pokemonArr.length + 3000;
  for (let i = pokemonArr.length; i < fusionsNum; i++) {
    let rnd = Math.floor(Math.random() * (pokemonArr.length - 0) + 0);
    let rnd2 = Math.floor(Math.random() * (pokemonArr.length - 0) + 0);
    pokemonArr.push(pokeFusion(pokemonArr[rnd], pokemonArr[rnd2], i+1) as Pokemon);
  }
  console.log("Finished loading fusion pokemons to pokeArr");
  addAllPokemon(pokemonArr);
}

// Adds each pokemon to the array (from the data.json structure)
function handleInfoDataJson(currentPokemon: Pokemon, pokemonArr: object[]) {
  console.log("Pokemon id: " + currentPokemon.name);
  pokemonArr.push(
    {
        id: Number(currentPokemon.id),
        name: currentPokemon.name,
        url: currentPokemon.url,
        img: currentPokemon.img,
        height: currentPokemon.height,
        weight: currentPokemon.weight,
        hp: currentPokemon.hp,
        attack: currentPokemon.attack,
        defense: currentPokemon.defense,
        types: currentPokemon.types,
    });
}

// Adds each pokemon to the array (from the api structure)
function handleInfoDataApi(index: number, pokeEntriesData: any, infoData: any, pokemonArr: object[]) {
  console.log("Pokemon number: " + index);
  let types: string[] = [];
  for (let i = 0; i < infoData.types.length; i++) {
    types.push(infoData.types[i].type.name);
  }
  pokemonArr.push(
    {
        id: Number(pokeEntriesData[index].entry_number), 
        name: pokeEntriesData[index].pokemon_species.name,
        url: pokeEntriesData[index].pokemon_species.url,
        img: infoData.sprites.front_default,
        height: infoData.height,
        weight: infoData.weight,
        hp: infoData.stats[5].base_stat, //hp
        attack: infoData.stats[4].base_stat, //attack
        defense: infoData.stats[3].base_stat, //defense
        types: types,
    });
}

function pokeFusion(parent1: Pokemon, parent2: Pokemon, id: number): object {
  let rnd = (Math.random()>=0.5)? 1 : 0; //returns random int 0 or 1
  return {
    id: id,
    name: parent1.name.substring(0, parent1.name.length / 2) + parent2.name.substring(parent1.name.length / 2),
    url: parent1.url,
    img: rnd ? parent1.img : parent2.img,
    height: Math.floor((parent1.height + parent2.height) / 2),
    weight: Math.floor((parent1.weight + parent2.weight) / 2),
    hp: Math.floor((parent1.hp + parent2.hp) / 2),
    attack: Math.floor((parent1.attack + parent2.attack) / 2),
    defense: Math.floor((parent1.defense + parent2.defense) / 2),
    types: typesFusion(parent1, parent2),
  };
}

function typesFusion(parent1: Pokemon, parent2: Pokemon) {
  const typesLength = (Math.ceil(parent1.types.length/2) + Math.ceil(parent1.types.length/2));
  let outputTypes: string[] = [];
  for (let i = 0; i < typesLength; i++) {
    let rndParentNum = (Math.random()>=0.5)? 1 : 0; //returns random int 0 or 1
    if (rndParentNum === 0) {
      let rndTypeNum = Math.floor(Math.random() * (parent1.types.length - 0) + 0);
      if(!outputTypes.includes(parent1.types[rndTypeNum])) {
        outputTypes.push(parent1.types[rndTypeNum]);
      }
    } else {
      let rndTypeNum = Math.floor(Math.random() * (parent2.types.length - 0) + 0);
      if(!outputTypes.includes(parent2.types[rndTypeNum])) {
          outputTypes.push(parent2.types[rndTypeNum]);
      }
    }
  }
  return outputTypes;
}

export async function handleJson() {
  if(fs.existsSync(folderPath)) {
    console.log("folder exists");
  } else {
    fs.mkdirSync(folderPath);
  }
  
  if(fs.existsSync(filePath)) {
    console.log("file exists");
  } else {
    console.log("data.json doesn't exist, getting api to data.json");
      fetch('https://pokeapi.co/api/v2/pokedex/1')
      .then(res => res.json())
      .then(data => writeDataJson(data, filePath));
  }
}

// Write the data from the api to the data.json
async function writeDataJson(data: any, filePath: string) {
    let pokemonArr: Pokemon[] = [];
    let pokeEntriesData = data.pokemon_entries;
    for (let i = 0; i < pokeEntriesData.length; i++) {
        let pokemon_url =  "https://pokeapi.co/api/v2/pokemon/" + pokeEntriesData[i].pokemon_species.name;
            await fetch(pokemon_url)
                .then(res => res.json())
                .then(infoData => handleInfoDataApi(i, pokeEntriesData, infoData, pokemonArr))
                .catch(err => console.log(err));
    }
    console.log("Finished loading api to json");
    fs.writeFileSync(filePath, JSON.stringify(pokemonArr));
}