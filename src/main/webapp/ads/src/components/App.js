import React from 'react';
import Header from './Header';
import List from './List';
import Main from './Main';

export default function App (props){
    const [banners, setBanners] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [bannersOpen, setBannersOpen] = React.useState(true)
    const [elementIdOpen, setElementIdOpen] =  React.useState(0)
    const [input, setInput] = React.useState('')
    const [bLoaded, setBLoaded] = React.useState(false)
    const [cLoaded, setCLoaded] = React.useState(false)
    const [data, setData] = React.useState([])
    const [dataFiltered, setDataFiltered] = React.useState([])
    const [requestError, setRequestError] = React.useState('')
    
    React.useEffect(() => {
        getCategories(false)
        getBanners()
      }, [])

    function getBanners(){
        setBLoaded(false)
        fetch("/banners")
        .then(res => res.json())
        .then(
            (result) => {
                setBanners(result)
                setData(result)
                setDataFiltered(result)
                setBLoaded(true)
                setBannersOpen(true)
            }
        )
    }

    function getCategories(main){
        setCLoaded(false)
        fetch("/categories")
        .then(res => res.json())
        .then(
            (result) => {
                if(main){
                    setData(result)
                    setDataFiltered(result)
                    setBannersOpen(false)
                }
                setCategories(result)
                setCLoaded(true)
            }
        )
    }
    
    function changeContent(name){
        setRequestError('')
        setElementIdOpen(0)
        if(name === "Banners"){
            getCategories(false)
            getBanners()
        }
        else{
            getCategories(true)            
        }
    }

    function chooseElement (id){
        setRequestError('')
        setElementIdOpen(id)
    }

    function doSearch(e){ 
        setRequestError('')
        let inp = e.target.value;
        setElementIdOpen(0)
        const elements = data.filter(el => {
            return el.name.toLowerCase().includes(inp.toLowerCase())
        })
        setInput(inp);
        setDataFiltered(elements);
    }

    function saveElement(name, price, categoryName, content, requestName){
        setRequestError('')
        let data = {}
        if(bannersOpen)
            data = {
                name: name,
                price : price,
                categoryName: categoryName,
                content: content
            }
        else
            data = {
                name: name,
                requestName: requestName
            }

        fetch(bannersOpen ? "/banners" : "/categories", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error) {
                    setRequestError(result.message)
                    return
                }
                if(bannersOpen) {
                    getBanners()
                    getCategories(false)
                }
                else getCategories(true)
            }
        )
    }

    function editElement(name, price, categoryName, content, requestName){
        setRequestError('')
        let data = {}
        if(bannersOpen)
            data = {
                id:elementIdOpen,
                name: name,
                price : price,
                categoryName: categoryName,
                content: content
            }
        else
            data = {
                id: elementIdOpen,
                name: name,
                requestName: requestName
            }

        fetch((bannersOpen ? "/banners/" : "/categories/") + elementIdOpen, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error) {
                    setRequestError(result.message)
                    return
                }
                if(bannersOpen) {
                    getBanners()
                    getCategories(false)
                }
                else getCategories(true)
            }
        )
    }

    function deleteElement(){
        setRequestError('')
        let url = (bannersOpen ? "/banners/" : "/categories/") + elementIdOpen
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error) {
                    setRequestError(result.message)
                    return
                }
                setElementIdOpen(0)
                if(bannersOpen) {
                    getBanners()
                    getCategories(false)
                }
                else getCategories(true)
            }
        )
    }

    if(bLoaded && cLoaded)
        return (
            <div className="App">
                <div className="container">
                    <Header bannersOpen={bannersOpen} onClick={changeContent}/>
                    <div className="row mt-2" style={{minHeight: "600px", maxHeight: "600px"}}>
                        <div className="col-3">
                            <List 
                                title={bannersOpen ? 'Banners':  'Categories'} 
                                name={bannersOpen ? 'Banner':  'Category'} 
                                data={dataFiltered} 
                                selected={elementIdOpen} 
                                chooseElement={chooseElement}
                                input={input}
                                doSearch={doSearch}
                            />
                        </div>
                        <div className="col-9">
                            <Main 
                                element={data.find(e => e.id === elementIdOpen)} 
                                bannersOpen={bannersOpen} 
                                categories={bannersOpen ? categories:  null}
                                elementIdOpen={elementIdOpen}
                                saveElement={saveElement}
                                editElement={editElement}
                                deleteElement={deleteElement}
                                error={requestError}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    else
        return <div>Loading...</div>;
}
