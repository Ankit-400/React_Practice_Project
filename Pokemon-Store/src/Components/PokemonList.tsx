import '../Style/PokemonList.css'
import PokemonCard from "./PokemonCard";

type PropsType = {
    loading: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPoke: React.Dispatch<React.SetStateAction<number>>
}

const PokemonList: React.FC<PropsType> = (props) => {
    const { loading, toggle, setSelectedPoke } = props;
    if (loading) return <p>Loading...</p>
    return <div className='list-container'>
        <PokemonCard loading={loading} toggle={toggle} setSelectedPoke={setSelectedPoke} />
    </div>
}

export default PokemonList;