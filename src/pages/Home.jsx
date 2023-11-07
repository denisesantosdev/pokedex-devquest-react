const Home = () => {
    return (
        <>
            <header>
                <img src="" alt="Pokemon logo" />
                <div>
                    <input type="checkbox" name="" id="" />
                </div>
            </header>
            <section>
                <div>
                    <label htmlFor="searchPokemon"></label>
                    <input type="search" id="searchPokemon" />
                    <button>Search Pokemon</button>
                </div>
            </section>
            <main>
                <div>
                    <label htmlFor="pokemonType">Selecione tipo</label>
                    <select id="pokemonType">
                        <option defaultValue={'Todos'}>Todos</option>
                        <option>Pokemon type 1</option>
                    </select>
                </div>
                <a href="#">
                    <div>
                        <img src="" alt="Pokemon image" />
                        <h2>Pokemon name</h2>
                    </div>
                </a>
                <button>Carregar mais</button>
            </main>
        </>
    )
}

export default Home
