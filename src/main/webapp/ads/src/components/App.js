import React from 'react';
import Header from './Header';
import List from './List';
import Main from './Main';

export default function App (props){
    const [banners, setBanners] = React.useState([]);    
    const [categories, setCategories] = React.useState([]);
    const [bannersOpen, setBannersOpen] = React.useState(true)
    const [elementIdOpen, setElementIdOpen] =  React.useState(0)
    const [input, setInput] = React.useState('')
    const [bLoaded, setBLoaded] = React.useState(false)
    const [cLoaded, setCLoaded] = React.useState(false)
    const [data, setData] = React.useState([])
    const [dataFiltered, setDataFiltered] = React.useState([])
    
    React.useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setCategories(result)
                    setCLoaded(true)
                },
                (error) => {
                }
            )
        fetch("http://localhost:8080/banners")
            .then(res => res.json())
            .then(
                (result) => {
                    setBanners(result)
                    setData(result)
                    setDataFiltered(result)
                    setBLoaded(true)
                },
                (error) => {
                }
            )
      }, [])

    function getBanners(){
        setBLoaded(false)
        fetch("http://localhost:8080/banners")
        .then(res => res.json())
        .then(
            (result) => {
                setBanners(result)
                setData(result)
                setDataFiltered(result)
                setBLoaded(true)
                setBannersOpen(true)
            },
            (error) => {
            }
        )
    }

    function getCategories(main){
        setCLoaded(false)
        fetch("http://localhost:8080/categories")
        .then(res => res.json())
        .then(
            (result) => {
                setCategories(result)
                setCLoaded(true)
                if(main){
                    setData(result)
                    setDataFiltered(result)
                    setBannersOpen(false)
                }
            },
            (error) => {
            }
        )
    }
    
    function changeContent(name){
        console.log(name)
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
        setElementIdOpen(id)
    }

    function doSearch(e){ 
        let inp = e.target.value;
        setElementIdOpen(0)
        const elements = data.filter(el => {
            return el.name.toLowerCase().includes(inp.toLowerCase())
        })
        setInput(inp);
        setDataFiltered(elements);
    }

    if(bLoaded && cLoaded)
        return (
            <div className="App">
                <div className="container">
                    <Header bannersOpen={bannersOpen} onClick={changeContent}/>
                    <div className="row mt-2" style={{height: "600px"}}>
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    else
        return <div>Loading...</div>;
}
