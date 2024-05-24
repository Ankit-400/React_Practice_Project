import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { updatePagination } from "../Store/cartSlice";
import { StoreState } from "../Types/types";

type PropsType = {
    loading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pagination: React.FC<PropsType> = (props) => {
    const { activePage, fromPage, toPage } = useSelector((state: StoreState) => state.cart)
    const dispatch = useDispatch();

    const { loading, setIsLoading } = props;

    if (loading) return <p>Loading...</p>

    return <>
        <div style={{
            display: 'flex', justifyContent: 'center', gap: '40px'
        }}>
            <div style={{ display: 'flex' }}>

                <button
                    onClick={() => {
                        setIsLoading(true);
                        dispatch(updatePagination(activePage - 1))
                        setIsLoading(false);
                    }}
                    disabled={activePage == 1}
                >
                    &#x276E;
                </button>
                <div style={{ display: 'flex' }} key={activePage}>
                    <div key={`Inner : ${activePage}`} style={{ transform: 'scale(0.9)', border: 'none' }}>
                        {
                            Array(toPage - fromPage + 1).fill(undefined).map((_, index) => index + fromPage).map((num) => {
                                return <button
                                    key={num}
                                    style={{ margin: '2px 5px' }} className={num === activePage ? 'active-page' : ''}
                                    onClick={() => {
                                        // setIsLoading(true);
                                        dispatch(updatePagination(num))
                                        // setIsLoading(false);
                                    }}
                                >
                                    {num}
                                </button>
                            })
                        }
                    </div>
                </div>
                <button onClick={() => {
                    // setIsLoading(true);
                    dispatch(updatePagination(activePage + 1))
                    // setIsLoading(false);
                }}>&#x276F;</button>
            </div>
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const inputElement = (e.target as HTMLFormElement).elements.namedItem('pageNo') as HTMLInputElement;
                    const inputValue = +(inputElement ? inputElement.value : '');
                    if (inputValue <= 30 && inputValue >= 1) {
                        // setIsLoading(true);
                        dispatch(updatePagination(inputValue));
                        // setIsLoading(false);
                    }
                    e.currentTarget.reset();
                }}>
                    <div>
                        <label htmlFor="pageNo">Go To Page: </label>
                        <input type="number" name="pageNo" style={{
                            padding: '5px', borderRadius: '5px', marginLeft: '10px', width: '60px'
                        }} />
                    </div>
                </form >
                <div>Max: 30</div>
            </div>
        </div>
    </>
}

export default Pagination;