import React from 'react';
import Header from './Header';
import List from './List';
import Main from './Main';

export default function App (props){
    let banners = [
        {
            id:1,
            name: 'Ban 1',
            categoryName: 'Cat 1',
            content: 'Ban 1 content',
            price: 14.52
        },
        {
            id:2,
            name: 'Ban 2',
            categoryName: 'Cat 1',
            content: 'Ban 2 content',
            price: 10.34
        },
        {
            id:3,
            name: 'Ban 3',
            categoryName: 'Cat 2',
            content: 'Ban 3 content',
            price: 5.55
        }
    ];
    
    let dataBanners = {
        title: 'Banners',        
        name: 'Banner',
        data: banners
    }

    let categories = [
        {
            id:1,
            name: 'Cat 1',
            requestName: 'cat 1'
        },
        {
            id:2,
            name: 'Cat 2',
            requestName: 'cat 2'
        },
        {
            id:3,
            name: 'Cat 3',
            requestName: 'cat 3'
        }
    ];

    let dataCategories = {
        title: 'Categories',
        name: 'Category',
        data: categories,
    }

    const [bannersOpen, setBannersOpen] = React.useState(true)
    const [data, setData] = React.useState(dataBanners)
    const [elementIdOpen, setElementIdOpen] =  React.useState(0)

    function changeContent(name){
        console.log(name)
        setElementIdOpen(0)
        if(name === "Banners"){
            setBannersOpen(true)
            setData(dataBanners)
        }
        else{
            setBannersOpen(false)
            setData(dataCategories)
        }
    }

    function chooseElement (id){
        setElementIdOpen(id)
    }

    return (
        <div className="App">
            <div className="container">
                <Header bannersOpen={bannersOpen} onClick={changeContent}/>
                <div className="row mt-2" style={{height: "600px"}}>
                    <div className="col-3">
                        <List title={data.title} name={data.name} data={data.data} selected={elementIdOpen} chooseElement={chooseElement}/>
                    </div>
                    <div className="col-9">
                        <Main 
                            element={data.data.find(e => e.id === elementIdOpen)} 
                            bannersOpen={bannersOpen} 
                            categories={bannersOpen ? categories:  null}
                            elementIdOpen={elementIdOpen}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
