import React from 'react';

function BannerForm(element, categories, props){
    categories = categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)
    return (
        <form key={element.name} className="col-7 mx-4">
            <div className="row mb-3">
                <label className="col-2 form-label">Name</label>
                <input type="text" id="name" className="col form-control shadow-none" ref={props.name} defaultValue={element.name}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Price</label>
                <input type="text" id="price" className="col form-control shadow-none" ref={props.price} defaultValue={element.price}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Category</label>
                <select id="category" className="col form-select shadow-none" ref={props.category} defaultValue={element.categoryName}>
                    {categories}
                </select>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Text</label>
                <textarea id="content" className="col form-control shadow-none" rows="5" cols="50" ref={props.content} defaultValue={element.content}></textarea>
            </div>
        </form>
    )
}

function CategoryForm(element, props){
    return (
        <form key={element.name} className="col-7 mx-4">
            <div className="row mb-3">
                <label className="col-2 form-label">Name</label>
                <input type="text" id="name" className="col form-control shadow-none" ref={props.name} defaultValue={element.name}></input>
            </div>
            
            <div className="row mb-3">
                <label className="col-2 form-label">Request ID</label>
                <input type="text" id="request-name" className="col form-control shadow-none" ref={props.requestName} defaultValue={element.requestName}></input>
            </div>
        </form>
    )
}

function Title({text}){
    return <h4 className="ms-2">{text}</h4>
}

export default function Main({element, bannersOpen, categories, elementIdOpen, saveElement, editElement, deleteElement, error}) {
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
    const name = React.createRef()
    const price = React.createRef()
    const categoryName = React.createRef()
    const content = React.createRef()    

    const requestName = React.createRef()

    

    function handleSaveElement(e){
        if(bannersOpen)
            if(elementIdOpen === 0) saveElement(
                name.current.value, 
                price.current.value, 
                categoryName.current.value, 
                content.current.value, 
                null)
            else editElement(
                name.current.value, 
                price.current.value, 
                categoryName.current.value, 
                content.current.value, 
                null)
        else
            if(elementIdOpen === 0) saveElement(
                name.current.value, 
                null, 
                null, 
                null, 
                requestName.current.value)
            else editElement(
                name.current.value, 
                null, 
                null, 
                null, 
                requestName.current.value)
        
    }
    function handleDeleteElement(e){
        if(elementIdOpen === 0) return
        deleteElement()
    }

    const props = {
        name: name, 
        price: price, 
        category: categoryName, 
        content: content,
        requestName: requestName
    }

    return (
        <div className="card border-dark rounded-0 h-100 p-0">
            <div className="card-header border-bottom border-dark bg-white p-0">
                {elementIdOpen !== 0 ?
                    <Title text={element.name + " ID: " + element.id}/> : 
                    <Title text={"Create new "  + (bannersOpen ? "banner": "category")}/>}
            </div>
            <div className="card-body">
                {bannersOpen ? 
                BannerForm(element, categories, props) : 
                CategoryForm(element, props)}

            </div>

            <div className="card-footer border-0 bg-white p-0">
                <div className="text-center mb-4 bg-danger text-white mx-4">{error}</div>
                <div className="btn-toolbar justify-content-between">
                <button onClick={handleSaveElement} className="btn btn-dark rounded-0 shadow-none">Save</button>
                <button onClick={handleDeleteElement} className="btn btn-danger rounded-0 shadow-none">Delete</button>
                </div>
            </div>
        </div>
    )
}