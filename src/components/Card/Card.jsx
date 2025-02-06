import React from 'react'
import './Card.css'
import cover from '../../assets/cover.jpeg'
export default function Card({ card, handleChoise, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoise(card)
        }
    }

    return (
        <div className="card">
            <div id={card.id} className={flipped ? "flipped" : ""}>
                <img className="front"  src={card.image} alt={card.alt} />
                <img className="back"  src={cover} onClick={() => handleClick()} alt="card front" />
            </div>
        </div>
    )
} 