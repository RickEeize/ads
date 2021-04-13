import React from 'react';

function BannerForm(element, categories){
    categories = categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)
    return (
        <form key={element.name} className="col-7 mx-4">
            <div className="row mb-3">
                <label className="col-2 form-label">Name</label>
                <input type="text" id="name" className="col form-control shadow-none" defaultValue={element.name}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Price</label>
                <input type="text" id="price" className="col form-control shadow-none" defaultValue={element.price}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Category</label>
                <select id="category" className="col form-select shadow-none" defaultValue={element.categoryName}>
                    {categories}
                </select>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Text</label>
                <textarea id="content" className="col form-control" rows="5" cols="50" defaultValue={element.content}></textarea>
            </div>
        </form>
    )
}

function CategoryForm(element){
    return (
        <form key={element.name} className="col-7 mx-4">
            <div className="row mb-3">
                <label className="col-2 form-label">Name</label>
                <input type="text" id="name" className="col form-control shadow-none" defaultValue={element.name}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Request ID</label>
                <input type="text" id="request-name" className="col form-control shadow-none" defaultValue={element.requestName}></input>
            </div>
        </form>
    )
}

function Title({text}){
    return <h4 className="ms-2">{text}</h4>
}

export default function Main({element, bannersOpen, categories, elementIdOpen, setData}) {
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
                {elementIdOpen !== 0 ?
                    <Title text={element.name + " ID: " + element.id}/> : 
                    <Title text={"Create new "  + (bannersOpen ? "banner": "category")}/>}
            </div>
            <div className="card-body">
                {bannersOpen ? BannerForm(element, categories, setData) : CategoryForm(element)}
            </div>

            <div className="card-footer btn-toolbar border-0 bg-white justify-content-between p-0">
                <button className="btn btn-dark rounded-0 shadow-none">Save</button>
                <button className="btn btn-danger rounded-0 shadow-none">Delete</button>
            </div>
        </div>
    )
}