import React from 'react';

function BannerForm(element, categories){
    console.log(categories)
    console.log(element)
    categories = categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)
    return (
        <form className="col-7 mx-4">
            <div className="row mb-3">
                <label className="col-2 form-label">Name</label>
                <input type="text" id="name" className="col form-control shadow-none" value={element.name}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Price</label>
                <input type="text" id="price" className="col form-control shadow-none" value={element.price}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Category</label>
                <select id="category" className="col form-select shadow-none" value={element.categoryName}>
                    {categories}
                </select>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Text</label>
                <textarea id="category" className="col form-control" rows="5" cols="50" value={element.content}></textarea>
            </div>
        </form>
    )
}

function CategoryForm(element){
    return (
        <form className="col-7 mx-4">
            <div className="row mb-3">
                <label className="col-2 form-label">Name</label>
                <input type="text" id="name" className="col form-control shadow-none" value={element.name}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Request ID</label>
                <input type="text" id="request-name" className="col form-control shadow-none" value={element.requestName}></input>
            </div>
        </form>
    )
}

function Title({element}){
    return <h4 className="ms-2">{element.name} ID: {element.id}</h4>
}

export default function Main({element, bannersOpen, categories, elementIdOpen}) {
    if(elementIdOpen === 0){
        if(bannersOpen){
            element = {
                name: '',
                categoryName: '',
                content: '',
                price: ''
            }
        }
        else{
            element = {
                name: '',
                requestName: ''
            }
        }
    }
    return (
        <div className="card border-dark rounded-0 h-100 p-0">
            <div className="card-header border-bottom border-dark bg-white p-0">
                {elementIdOpen !== 0 ? <Title element={element}/> : <h4 className="ms-2">Create new {bannersOpen ? "banner": "category"}</h4>}
            </div>
            <div className="card-body">
                {bannersOpen ? BannerForm(element, categories) : CategoryForm(element)}
            </div>

            <div className="card-footer btn-toolbar border-0 bg-white justify-content-between p-0">
                <button className="btn btn-dark rounded-0 shadow-none">Save</button>
                <button className="btn btn-danger rounded-0 shadow-none">Delete</button>
            </div>
        </div>
    )
}