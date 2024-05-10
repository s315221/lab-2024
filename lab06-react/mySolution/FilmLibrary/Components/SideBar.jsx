export default function SideBar() {
    return (
        <>
            <main className="d-flex flex-column flex-sm-row">
                <search-box className="collapse d-sm-none flex-fill flex-column align-self-stretch m-2" id="collapsable">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" />
                    </form>
                </search-box>
                <filter-list className="d-flex flex-row col-sm-3 align-items-start bg-light">
                    <div className="collapse d-sm-flex flex-fill flex-column " id="collapsable">
                        <br />
                        <h5 className="">Filters</h5>
                        <div className="btn-group-vertical d-flex flex-fill" role="group" aria-label="Vertical button group">
                            <filter-button type="button" id="filter-all" className="btn text-start active">All</filter-button>
                            <filter-button type="button" id="filter-favorites" className="btn text-start">Favorites</filter-button>
                            <filter-button type="button" id="filter-bestRated" className="btn text-start">
                                Best Rated
                            </filter-button>
                            <filter-button type="button" id="filter-seenLastMonth" className="btn text-start">Seen Last
                                Month</filter-button>
                            <filter-button type="button" id="filter-unseen" className="btn text-start">Unseen</filter-button>
                        </div>
                    </div>
                </filter-list>
                <film-table className="d-flex flex-column flex-fill">
                    <div className="d-flex flex-row">
                        <h1 id="film-table-title">All</h1>
                    </div>
                    <div className="d-flex flex-row">
                        <table className="table">
                            <thead></thead>
                            <tbody id="film-list">

                            </tbody>
                        </table>
                    </div>
                    <button-add-film>
                        <div className="position-fixed bottom-0 end-0 transparency translate-middle">
                            <button className="btn rounded-circle bg-primary text-light">
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    </button-add-film>
                </film-table>

            </main>
        </>
    );
}