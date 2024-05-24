import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header'
import PokemonList from './Components/PokemonList'
import Pagination from './Components/Pagination'
import Modal from './Components/Modal'
import { useDispatch } from 'react-redux'
import { initialPokemonList } from './Store/cartSlice'
import CartPage from './Components/CartPage'

function App() {

  // const pokeStore = useSelector((state: InitialState) => state)
  const dispatch = useDispatch();

  const [loading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(-1);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(initialPokemonList());
    setIsLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <>
      <Header />
      <CartPage cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <div
        onClick={() => setCartOpen(true)}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <label style={{
          padding: '5px',
          border: '1px solid grey',
          boxShadow: '1px 2px 3px grey',
          width: '100px',
          cursor: 'pointer'
        }}>Cart</label>
      </div>
      <Modal
        open={openModal}
        toggle={setOpenModal}
        pokeId={selectedPoke}
      />
      {!loading && <>
        <PokemonList
          loading={loading}
          toggle={setOpenModal}
          setSelectedPoke={setSelectedPoke}
        />
        <Pagination loading={loading} setIsLoading={setIsLoading} />
      </>
      }
    </>
  )
}

export default App;
