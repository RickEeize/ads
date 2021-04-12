import React from 'react';

function ElementsList(props) {
    console.log(props.elements);
    const list = props.elements.map((el) =>
        <a key={el.id} href="#" className="list-group-item list-group-item-action text-left border-0"><h5>{el.name}</h5></a>
    )
    return (
        <div className="list-group rounded-0">{list}</div>
    )
}

export default ElementsList;