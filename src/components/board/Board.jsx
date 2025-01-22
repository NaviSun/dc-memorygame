import './Board.css'
import Card from "../Card/Card";
export default function Board({ cards, handleChoise, choiseOne, choiseTwo, disabled, sizeBoard }) {
    let size = 'card-grid'
    if (sizeBoard === 9) {
        size = 'card-grid cg18'
    } else if (sizeBoard === 12) {
        size = 'card-grid cg24'
    } else {
        size = 'card-grid'
    }
    return (
        <div className={size}>
            {cards.map((card, index) => (
                <Card
                    handleChoise={handleChoise}
                    key={card.id} index={index}
                    card={card}
                    flipped={card === choiseOne || card === choiseTwo || card.matched}
                    disabled={disabled}
                />
            ))}
        </div>
    )
}