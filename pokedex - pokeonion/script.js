const pokeContainer = document.getElementById('poke-container');
const pokeCount = 1500;

const colors = {
    fire: '#e62c2c',
    grass: '#3ccc46',
    electric: '#fcd40e',
    water: '#0089c9',
    ground: '#b45a00',
    rock: '#999923',
    fairy: '#ff1fbc',
    poison: '#67256d',
    bug: '#21681e',
    dragon: '#f0ff68',
    psychic: '#b601fd',
    flying: '#f2f5ca',
    fighting: '#fabd43',
    normal: '#F5F5F5',
    ice: '#70eeff',
    dark: '#111111c5',
    ghost: '#f0f0f06c',
    steel: '#b8b8b8'

};

const mainType = Object.keys(colors);

const fetchPoke = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPoke(i);
    }
};

const getPoke = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokeCards(data);
};

const createPokeCards = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(t => t.type.name);
    const type = mainType.find(t => pokeTypes.indexOf(t) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="${type}">Type: <span>${type}</span></small>
        </div>
    `;

    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
};



const search = document.getElementById('search');

search.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const pokemons = document.querySelectorAll('.pokemon');

    pokemons.forEach(pokemon => {
        const name = pokemon.querySelector('.name').innerText.toLowerCase();

        pokemon.style.display = name.includes(value) ? 'block' : 'none';
    });
});


fetchPoke();
