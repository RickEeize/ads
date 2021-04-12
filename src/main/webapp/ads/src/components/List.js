import React from 'react';
import ElementsList from './ElementsList';

export default function List({title, name, data, selected, chooseElement}){

    return (
    <div className="card h-100 border rounded-0 border-dark">
        <h2 className="card-header bg-white text-center border-0">{title}:</h2>
        <div className="card-body p-0 mt-2">
        <input type="text" className="form-control shadow-none rounded-0 border-dark w-95" placeholder={"Enter " + name.toLowerCase()  +" name"}/>
        <ElementsList elements={data} selected={selected} chooseElement={chooseElement}/>
        </div>
        <div className="card-footer bg-white p-0 border-0">
            <button onClick={() => chooseElement(0)} className="btn btn-primary btn-block shadow-none w-100 rounded-0">Create new {name.toLowerCase()}</button>
        </div>
    </div>
    )
}