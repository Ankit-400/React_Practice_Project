import { useDispatch, useSelector } from "react-redux";
import { StorePokemon, StoreState } from "../Types/types";
import { addToCart, removeFromCart } from "../Store/cartSlice";

type PropsType = {
    cartOpen: boolean;
    setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartPage: React.FC<PropsType> = (props) => {
    const { cartOpen: open, setCartOpen: setOpen } = props;
    const pokeStore: StorePokemon[] = useSelector((state: StoreState) => state.cart.cartItems);
    const totalProice = useSelector((state: StoreState) => state.cart.totalPrice)
    console.log(totalProice);
    const dispatch = useDispatch();
    return <div>
        <dialog open={open} style={{ zIndex: '1000', maxHeight: '500px', overflowY: 'auto', padding: '20px', minWidth: '500px' }}>
            <h2>... Poke Store ...</h2>
            {
                pokeStore.map(poke => {
                    return <div style={{
                        border: '1px solid white', display: 'flex', gap: '20px', justifyContent: 'space-evenly',
                        margin: '10px auto', padding: '20px', width: '100%',
                    }}>
                        <p className="name">Name: {poke.name}</p>
                        <p className="quantity">Quantity: {poke.quantity}</p>
                        <p className="quantity">Price: {poke.price} /-</p>
                        <button
                            style={{ padding: '10px', height: 'fit-content', margin: 'auto' }}
                            onClick={() => dispatch(addToCart({ id: poke.id, quantity: 1 }))}
                            disabled={poke.quantity == 10}
                        >
                            +
                        </button>
                        <button
                            style={{ padding: '10px', height: 'fit-content', margin: 'auto' }}
                            onClick={() => dispatch(addToCart({ id: poke.id, quantity: -1 }))}
                            disabled={poke.quantity == 1}
                        >
                            -
                        </button>
                        <button onClick={() => dispatch(removeFromCart({ id: poke.id }))}>
                            X
                        </button>
                    </div>
                })
            }
            <div>Total Price: {totalProice}</div>
            <button onClick={() => setOpen(false)}>Close</button>
        </dialog>
    </div>
}

export default CartPage;