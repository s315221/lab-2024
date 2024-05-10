import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function FilterList(props) {
    return (
        <>
            <h2>Filters</h2>
            <div className='d-grid gap-1' >
                {props.filters.map(filter => <Button key={filter} variant={props.variant} className='text-start' active={props.currentFilter == filter} onClick={() => props.setActiveFilter(filter)}>{filter}</Button>)}
            </div>
        </>
    );
}