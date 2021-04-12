import React from 'react';


class Header extends React.Component{
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }
    
    handler(e){
        this.props.onClick(e.target.innerText);
    }

    render(){
        return (
            <div className="navbar navbar-expand-sm navbar-light border border-dark mt-2">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className={"nav-link " + (this.props.bannersOpen ? "text-primary" : "text-dark")} href="#" onClick={this.handler}>Banners</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + (this.props.bannersOpen ? "text-dark" : "text-primary") } href="#" onClick={this.handler}>Categories</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;