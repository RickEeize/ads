import React from 'react';
import Header from './Header';
import List from './List';
import Main from './Main';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = this.changeContent.bind(this);
        this.state = {
            bannersOpen: true,
            elementIdOpen: -1,
        };
    }
    banners = [
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
    
    dataBanners = {
        title: 'Banners',        
        name: 'Banner',
        data: this.banners
    }

    categories = [
        {
            id:1,
            name: 'Con 1',
            requestName: 'con 1'
        },
        {
            id:2,
            name: 'Con 2',
            requestName: 'con 2'
        },
        {
            id:3,
            name: 'Con 3',
            requestName: 'con 3'
        }
    ];

    dataCategories = {
        title: 'Categories',
        name: 'Category',
        data: this.categories
    }

    changeContent (name){
        console.log(name);
        this.setState({
            bannersOpen: name === 'Banners'? true : false,
        });
    }

    render(){
        return (
            <div className="App">
                <div className="container">
                    <Header bannersOpen={this.state.bannersOpen} onClick={this.changeContent}/>
                    <div className="row mt-2" style={{height: "600px"}}>
                        <div className="col-3">
                            <List data={this.state.bannersOpen ? this.dataBanners : this.dataCategories}/>
                        </div>
                        <div className="col-9">
                            <Main/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;