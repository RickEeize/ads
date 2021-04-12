import React from 'react';
import ElementsList from './ElementsList';

class List extends React.Component { 
    render() {
        return (
        <div className="card h-100 border rounded-0 border-dark">
            <h2 className="card-header bg-white text-center border-0">{this.props.data.title}:</h2>
            <input type="text" className="form-control shadow-none rounded-0 border-dark" placeholder={"Enter " + this.props.data.name.toLowerCase()  +" name"}/>
            <div className="card-body p-0 mt-2">
            <ElementsList elements={this.props.data.data} />
            </div>
            <div className="card-footer bg-white p-0 border-0">
                <button className="btn btn-primary btn-block shadow-none w-100 rounded-0">Create new {this.props.data.name.toLowerCase()}</button>
            </div>
        </div>
        )
    }
}

export default List;