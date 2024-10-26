import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './Game.css';

const ChoiceDifficult = ({ setDifficult }) => {
    return (
        <div className="choiceDifficult">
            <button onClick={() => setDifficult(4)}>簡單模式</button>
            <button onClick={() => setDifficult(6)}>正常模式</button>
            <button onClick={() => setDifficult(8)}>困難模式</button>
        </div>
    );
};

const Card = ({ emoji, onClick, isFlipped }) => (
    <div className='card' onClick={onClick}>
        <span>{isFlipped ? emoji : ''}</span>
    </div>
);

export default Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    const handleCardClick = (card) => {
        if (flippedCards.length < 2 && !matchedCards.includes(card.id)) {
            setFlippedCards((prev) => [...prev, card]);
            if (flippedCards.length === 1) {
                setTimeout(checkForMatch, 1000);
            }
        }
    };

    const checkForMatch = () => {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.emoji === secondCard.emoji) {
            setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        }
        setFlippedCards([]);
    };

    const handleDifficult = (columns) => {
        const newCards = [];
        for (let i = 0; i < columns; i++) {
            const emoji = String.fromCodePoint(0x1f601 + i);
            newCards.push({ id: nanoid(), emoji });
            newCards.push({ id: nanoid(), emoji });
        }
        setCards(newCards.sort(() => Math.random() - 0.5));
    };

    return (
        <main>
            <ChoiceDifficult setDifficult={handleDifficult} />
            <div className="cards-container">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        emoji={card.emoji}
                        isFlipped={matchedCards.includes(card.id) || flippedCards.includes(card)}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>
        </main>
    );
};