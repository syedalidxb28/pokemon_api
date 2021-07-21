var header=document.createElement("header")
header.setAttribute("class","page-header")
var div=document.createElement("div")
div.setAttribute("class","logo")
var img=document.createElement("img")
img.setAttribute("class","page-header_item1")
img.setAttribute("alt","pokemon logo")
img.src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
div.appendChild(img)
header.appendChild(div)

var div=document.createElement("div")
div.setAttribute("class","pokepic")
var img=document.createElement("img")
img.setAttribute("class","page-header_item2")
img.setAttribute("alt","pokemon")
img.src="https://img.rankedboost.com/wp-content/uploads/2016/07/Pokemon-Go-Pok%C3%A9dex-300x229.png"
div.appendChild(img)
header.appendChild(div)
var h1=document.createElement("h1");
h1.innerText="POKEMON API DATA";
header.appendChild(h1);
document.body.appendChild(header)

var div=document.createElement("div")
div.setAttribute("class","container1")
div.setAttribute("id","poke-container")
document.body.append(div);


var poke_container = document.getElementById('poke-container');
function refresh(){
    location.reload()
}

var pokemons_no = 150;
var colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
var main_types = Object.keys(colors);

    var fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_no; i++) {
     	await getPokemon(i);
    }
};

var getPokemon = async id => {
	var res= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	
	var pokemon = await res.json();
    console.log(pokemon);
	createPokemonCard(pokemon);
    };

function createPokemonCard(pokemon) {
	var pokemonEl = document.createElement("div");
	pokemonEl.classList.add("pokemon");

	var poke_types = pokemon.types.map(type => type.type.name);
	var type = main_types.find(type => poke_types.indexOf(type) > -1);
	var name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	var color = colors[type];
	var ability = pokemon.abilities.map(ability=>ability.ability.name).join(',');
    var moves =pokemon.moves.map(move=>move.move.name).slice(0,5).join(',');
    var weight =pokemon.weight;
	pokemonEl.style.backgroundColor = color;

	var pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        
        <div class="ability">
        <small class="ab">Ability: <span>${ability}</span></small>
        </div>
        <div class="moves">
        <small class="m">Moves: <span>${moves}</span></small>
        </div>
        <div class="weight">
        <small class="w">Weight: <span>${weight}</span></small>
        </div>
</div>
    `;
    

	pokemonEl.innerHTML = pokeInnerHTML;
    // pokemonEl.innerHTML=div;
    // document.getElementById(pokedetails).addEventListener('click', function(event) {
    //     return pokemon;
    // });

	poke_container.appendChild(pokemonEl);
}
fetchPokemons()

