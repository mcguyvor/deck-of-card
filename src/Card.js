import React, { Component } from 'react';
import './Card.css'
class Card extends Component{
    constructor(props){
        super(props)
                //tranform : translate card and rote 20 defree

        let angle = Math.random()*90-45;
        let x = Math.random()*40-20;
        let y= Math.random() * 40-20;
        this._transform = `translate(${x}px,${y}px) rotate(${angle}deg)`;
    }
    render(){
        
        return(
            <div className='Card'>
           { console.log(this._transform )}
                <img style={{transform : this._transform}} src ={this.props.image} alt={this.props.name}/>
            </div>
        );
    }
}
export default Card;