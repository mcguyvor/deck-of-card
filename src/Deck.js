import React, { Component } from 'react';
import axios from 'axios'
import Card from './Card'
import './Deck.css'
import './Card.css'

const API_URL = 'https://deckofcardsapi.com/api/deck/';
class Deck extends Component{
    constructor(props){
        super(props);
        this.state= {
            deck:null,draw : []
        }
        this.getCard = this.getCard.bind(this);
    }
   async componentDidMount(){
       let deck = await axios.get(`${API_URL}new/shuffle/`); // wait this to finish 
       this.setState({deck : deck.data});  
    }
    
    async getCard(){
        // make request using deck id
        let deck_id = this.state.deck.deck_id;
        try{
        let cardResponse =  await axios.get(`${API_URL}${deck_id}/draw/`)
        console.log(cardResponse);
        console.log(cardResponse.data.remaining)
        if(!cardResponse.data.success){
            throw new Error("no card remaining");
        }
       let card = cardResponse.data.cards[0];
       
        this.setState(st=>({
            draw : [...st.draw, 
                {id: card.code, 
                img : card.image,
                name : `${card.suit} ${card.value}`} ]
        }));
    }
    catch(err){
        alert(err);
    }
    }
    render(){
        const card = this.state.draw.map(c=>(<Card key={c.id}image={c.img} name={c.name}/>));
  
        return(
            <div className='Deck'>
                <h1 className='Deck-title'>Card header</h1>
                <h2 className='Deck-title Subtitle'>A little demo made with react</h2>
                <button className='Deck-btn' onClick={this.getCard} >Get Start</button>
                <div className='Deck-cardarea'>{card}
                </div>
            </div>
        );
    }
}
export default Deck;