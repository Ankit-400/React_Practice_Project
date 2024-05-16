import React from "react"
import { PageType } from "../Types/types";

type propTye = {
    page: PageType;
    setPage: React.Dispatch<React.SetStateAction<PageType>>;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<propTye> = (props) => {
    const { page, setPage, setOffset } = props;

    function updatePageDetails(activePage: number, fromPage: number, toPage: number, flag: boolean) {

        if (flag) {
            activePage -= 1;
        }
        else activePage += 1;
        activePage = activePage == 0 ? 1 : activePage;

        if (activePage === toPage) {
            fromPage += 1;
        }

        if (activePage === fromPage) {
            fromPage -= 1;
        }

        fromPage = fromPage <= 0 ? 1 : fromPage;
        toPage = Math.min(fromPage + 4, page.totalPokemons - 20);

        return {
            activePage: activePage,
            fromPageNo: fromPage,
            toPageNo: toPage,
        }
    }


    return <>
        <div style={{
            display: 'flex', justifyContent: 'center', gap: '10px'
        }}>
            <button onClick={() => {
                setOffset(prev => prev - 20)
                setPage(prev => {

                    const updatedPage = updatePageDetails(
                        prev.activePage,
                        prev.fromPageNo,
                        prev.toPageNo,
                        true
                    );

                    return {
                        ...prev,
                        ...updatedPage
                    }
                })
            }}>&#x276E;
            </button>
            <div style={{ display: 'flex' }} key={page.activePage}>
                <div key={`Inner : ${page.activePage}`} style={{ transform: 'scale(0.9)', border: 'none' }}>
                    {
                        Array(page.toPageNo - page.fromPageNo + 1).fill(undefined).map((_, index) => index + page.fromPageNo).map((num) => {
                            return <button
                                key={num}
                                style={{ margin: '2px 5px' }} className={num === page.activePage ? 'active-page' : ''}
                                onClick={() => {
                                    setPage(prev => {
                                        const updatedPage = updatePageDetails(
                                            num - 1,
                                            prev.fromPageNo,
                                            prev.toPageNo,
                                            false
                                        );

                                        return {
                                            ...prev,
                                            ...updatedPage
                                        }
                                    });
                                }}
                            >
                                {num}
                            </button>
                        })
                    }
                </div>
            </div>
            <button onClick={() => {
                setOffset(prev => prev + 20)
                setPage(prev => {

                    const updatedPage = updatePageDetails(
                        prev.activePage,
                        prev.fromPageNo,
                        prev.toPageNo,
                        false
                    );

                    return {
                        ...prev,
                        ...updatedPage
                    }
                })
            }}>&#x276F;</button>
        </div>
    </>
}

export default Pagination;