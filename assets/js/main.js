const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const modal = document.querySelector('dialog')
const closeModal = document.getElementById('fechar')
const button = document.getElementById('openModal')
const limit = 5
let offset = 0
let id = 1

function loaddPokemonItens(offset, limit){
    poekAPI.getPokemons(offset, limit)
        .then((pokemons = []) => { 
            const newHTML = pokemons.map((pokemon) => 
            `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.num}</span>
                    <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type pokemon ${type}">${type}</li>`).join('')}
                            </ol>
                            <button num="${pokemon.num}" id="openModal" type="button" onClick="openModal(this)"><img src="${pokemon.photo}" alt="${pokemon.name}";></img></button>
                        </div>
                </li>
                
                `).join('')
                pokemonList.innerHTML += newHTML
            })
            
            .catch((error) => console.error(error))
    }

function loadPokemonInfo(id) {
   poekAPI.pokeInfoTab(id)
        .then((pokemon = []) => {
            const newInfoTHML = `
            <div class="buttonClose">
                <span class="fecharButton">
                    <button class="fechar" id="fechar" value="anonymous function" onclick="(function(){
                        modal.close()})()"> x </button>
                </span>
            </div>
            <div class="info ${pokemon.type}">
            <div class="name_number">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.num}</span>
            </div>
            <div class="types">
                ${pokemon.types.map((type) => `<li class="type pokemon ${type}">${type}</li>`).join('')}
            </div>
            <div class="image">
                <img src="${pokemon.photo}" alt="${pokemon.name}" width="50%"></img>
            </div>
    
            <!--TAB CONTENTE-->
            </div>
            <div class="infoDetail ${pokemon.type}">
            <div class="mytabs ${pokemon.type}">
                <input type="radio" id="about" name="mytabs" checked="checked">
                <label for="about">About</label>
                <div class="tab">
                    <ol class="altura_peso">
                        <li>Altura: ${pokemon.peso}</li>
                        <li>Peso: ${pokemon.altura}</li>
                    </ol>
                    <span class="about"> <p>${pokemon.description}</p>
                </div>
    
                <input type="radio" id="baseStats" name="mytabs">
                <label for="baseStats">Base Stats</label>
                <div class="tab">
                    <div class="bstats">
                        <ol class="statsName">
                            ${pokemon.statsName.map((statsName) => `<li>${statsName}</li>`).join('')}
                        </ol>
                        <ol class="baseStats">
                            ${pokemon.stats.map((stats) => `<li class="${stats}">${stats}</li>`).join('')}
                        </ol>
                    </div>
                </div>
    
                <input type="radio" id="abilities" name="mytabs">
                <label for="abilities">Abilities</label>
                <div class="tab" >
                    <ol class="abilities">
                        ${pokemon.abilities.map((abilitie) => `<li>${abilitie}</li>`).join('')}
                    </ol>
                </div>
                
                <input type="radio" id="moves" name="mytabs">
                <label for="moves">Moves</label>
                <div class="tab">
                    <ol class="move">
                        ${pokemon.moves.map((moves) => `<li class="moves">${moves} </li>`).join('')}
                    </ol>
                </div>
                
                </div>
            </div>
        `
        modal.innerHTML = newInfoTHML
        })
        modal.showModal()
}

loaddPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loaddPokemonItens(offset, limit)
})

function openModal(event) {
    loadPokemonInfo(event.attributes.num.value);
}