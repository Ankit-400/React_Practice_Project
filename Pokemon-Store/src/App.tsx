import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header'
import PokemonList from './Components/PokemonList'
import Pagination from './Components/Pagination'
import Modal from './Components/Modal'
import { pokemonDetail, PageType } from './Types/types'

function App() {

  const [page, setPage] = useState<PageType>({
    totalPokemons: 0,
    activePage: 1,
    fromPageNo: 1,
    toPageNo: 0
  });

  const [offset, setOffset] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<(object & pokemonDetail)[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemonData, setSelectedPokemonData] = useState<pokemonDetail>();

  useEffect(() => {
    async function fetchTotalPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon');
      const da = await res.json();
      console.log(da);
      setPage({
        totalPokemons: da.count,
        fromPageNo: 1,
        activePage: 1,
        toPageNo: 5
      });
    }
    fetchTotalPokemon();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function fetchPokemon() {
      const list = [];
      const startPage = ((page.activePage - 1) * 20) + 1;
      const stopPage = startPage + 20;
      for (let index = startPage; index < stopPage; index++) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + index);
        const data = await response.json();
        list.push(await data);
      }
      setPokemonList(list);
      setIsLoading(false);
    }

    fetchPokemon();
  }, [offset, page.activePage]);

  return (
    <>
      <Header />
      <Modal
        open={openModal}
        toggle={setOpenModal}
        data={selectedPokemonData!} />
      <PokemonList
        loading={loading}
        pokemonList={pokemonList}
        toggle={setOpenModal}
        setPokemon={setSelectedPokemonData}
      />
      {!loading && <Pagination setOffset={setOffset} page={page} setPage={setPage} />}
    </>
  )
}

export default App;
