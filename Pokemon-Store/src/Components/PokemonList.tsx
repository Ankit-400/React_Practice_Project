import '../Style/PokemonList.css'
import PokemonCard from "./PokemonCard";
import { pokemonDetail } from '../Types/types';

type PropsType = {
    loading: boolean;
    pokemonList: pokemonDetail[];
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
    setPokemon: React.Dispatch<React.SetStateAction<pokemonDetail | undefined>>
}

const PokemonList: React.FC<PropsType> = (props) => {
    return <div className='list-container'>
        {props.loading && <p>Loading...</p>}
        <PokemonCard loading={props.loading} pokemonList={props.pokemonList} toggle={props.toggle} setPokemon={props.setPokemon} />
    </div>
}

export default PokemonList;