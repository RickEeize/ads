import React from 'react';


export default function Header({bannersOpen, onClick}){
    
    function handler(e){
        onClick(e.target.innerText);
    }

    return (
        <div className="navbar navbar-expand-sm navbar-light border border-dark mt-2">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className={"nav-link " + (bannersOpen ? "text-primary" : "text-dark")} href="#" onClick={handler}>Banners</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link " + (bannersOpen ? "text-dark" : "text-primary") } href="#" onClick={handler}>Categories</a>
                </li>
            </ul>
        </div>
    )
}