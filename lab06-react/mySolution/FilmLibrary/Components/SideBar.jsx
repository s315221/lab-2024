import FilterList from "./FilterList";

export default function SideBar(props) {
    return (
        <div className={props.className}>
            {props.is === 'filter-list' ?
                <FilterList filters={props.filters} currentFilter={props.activeFilter} variant={props.variant} setActiveFilter={props.setActiveFilter} />
                :
                <></>
            }
        </div>
    );
}
