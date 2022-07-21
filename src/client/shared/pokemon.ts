export class Pokemon {
    id;
    name;
    url;
    img;
    height;
    weight;
    types: string[];
    hp;
    attack;
    defense;

    constructor(id: number, name: string, url: string, img: string,
        height: number, weight: number, types: string[] = [], hp: number, attack: number, defense: number) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.img = img;
        this.height = height;
        this.weight = weight;
        this.types = types;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
    }

    // Return each type from types array as an html element
    getTypesAsElement() {
        let typesStrings = "";
        for (let i = 0; i < this.types.length; i++) {
            typesStrings += `<div class="types" id="${this.types[i]}"> ${this.types[i]}</div>`;
        }
        return typesStrings;
    }
    
    // Renders the data from the Pokemon to the HTML
    renderInfoData(hide = false) {
        let pokemonDiv = document.getElementById(`pokemon-${this.id}`) as HTMLDivElement;
        let pokemonInfoDiv = document.getElementById(`pokemonInfo-${this.id}`) as HTMLDivElement;
        let infoClass = "pokemonInfo";
        if (pokemonInfoDiv.className === "pokemonInfoHidden" && !hide) {
            infoClass = "pokemonInfo";
        } else {
            infoClass = "pokemonInfoHidden";
        }
        pokemonDiv.innerHTML =
            `<div class="imgDiv"><img src="${this.img}" alt="pokemon_image"></img></div>
        <div class="idDiv"><p>${this.id}</p></div>
        <div class="nameDiv"><p>${this.name}</p></div>
        <div class="typeDiv">
        ${this.getTypesAsElement()}
        </div>
        <div class="APIDiv"><button><a href=${this.url}>API here!</a></button></div>
        <div class="${infoClass}" id="pokemonInfo-${this.id}">
            <p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>
            <p>hp: ${this.hp}</p>
            <p>attack: ${this.attack}</p>
            <p>defense: ${this.defense}</p>
        </div>`;
    }

    // Render the Pokemon
    createPokeElement() {
        let pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
        let pokemonDiv = document.createElement("div") as HTMLDivElement;
        pokemonDiv.id = 'pokemon-' + this.id;
        pokemonDiv.className = "pokemon";
        pokemonDiv.addEventListener('click', () => {
            this.renderInfoData();
        });
        pokemonDiv.innerHTML =
            `<div class="imgDiv"><img src="${this.img}" alt="pokemon_image"></img></div>
        <div class="idDiv"><p>${this.id}</p></div>
        <div class="nameDiv"><p>${this.name}</p></div>
        <div class="APIDiv"><button><a href=${this.url}>API here!</a></button></div>
        <div class="pokemonInfoHidden" id="pokemonInfo-${this.id}">
            <p>weight: ${this.weight}</p>
            <p>height: ${this.height}</p>
            <p>hp: ${this.hp}</p>
            <p>attack: ${this.attack}</p>
            <p>defense: ${this.defense}</p>
            <div>
                <p>types: ${this.types}</p>
            </div>
        </div>`;
        pokemonList.appendChild(pokemonDiv);
    }

}