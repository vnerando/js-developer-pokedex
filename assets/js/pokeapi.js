const poekAPI = {}

function converterAPIForModel(pokeDetail) {

    const pokemon = new Pokemon ()
    pokemon.num = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)

    pokemon.moves = pokeDetail.moves.slice(0, 10).map((move) => move.move.name);

    pokemon.stats = pokeDetail.stats.map((baseStat) => baseStat.base_stat)

    pokemon.statsName = pokeDetail.stats.map((name) => name.stat.name)

    pokemon.peso = pokeDetail.height

    pokemon.altura = pokeDetail.weight

    const getDesc = pokeDetail.species

    return fetch(getDesc.url)
        .then((response) => response.json())
        .then((jsonDesc) => {
            pokemon.description = jsonDesc.flavor_text_entries[10].flavor_text            
            return pokemon
        })
}


poekAPI.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converterAPIForModel)
}



poekAPI.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(poekAPI.getPokemonsDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((getPokemonsDetail) => getPokemonsDetail)
        .catch((error) => console.error(error))
}

poekAPI.pokeInfoTab = (id = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then(converterAPIForModel)
        .catch((error) => console.error(error))
}