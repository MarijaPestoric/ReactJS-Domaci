import './SingleCard.css'
import { useState } from "react";

export default function SingleCard({card, handleChoice, flipped, disabled, turns}) {
    const handleClick = () => {
        console.log(turns)
        if(!disabled && turns !== 5) {
            handleChoice(card)
        }
    }
    return (
        <div className ="card">
          <div className ={flipped ? 'flipped' : ""}>
            <img className = "front" src = {card.src} alt="card front"/>
            <img className = "back" src = "/images/cover2.png" onClick = {handleClick} alt="card back"/>
          </div>
        </div>
    )
}
