import React from 'react';

export default function ElementsList({elements, selected, chooseElement}) {
    const list = elements.map((el) =>
        <a key={el.id} href="#" onClick={()=> chooseElement(el.id)} className={"list-group-item list-group-item-action text-left border-0 " + (selected === el.id ? "bg-primary text-white" : "")}>
            <h5>{el.name}</h5>
        </a>
    )
    return (
        <div className="list-group rounded-0">{list}</div>
    )
}