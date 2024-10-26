import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './Game.css';

const ChoiceDifficult = ({ setDifficult }) => {
    return (
        <div className="choiceDifficult">
            <button onClick={() => setDifficult(4)}>簡單模式</button>
            <button onClick={() => setDifficult(5)}>正常模式</button>
            <button onClick={() => setDifficult(6)}>困難模式</button>
        </div>
    );
};

const Card = (props) => {
    return (
        <div className='card' onClick={props.onClick}>
            <span>{props.isFlipped ? props.emoji : ''}</span>
        </div>
    )
};

const setDeck = (columns) =>{
    let newCards = [];
    for (let i = 0; i < columns*2; i++) {
        const emoji = String.fromCodePoint(0x1f601 + i);
        newCards.push({ key: nanoid(), emoji });
        newCards.push({ key: nanoid(), emoji });
    }
    return newCards.sort(() => Math.random() - 0.5)
}

export default function Game(){
    const [cards, setCards] = useState(setDeck(5));
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedEmojis, setMatchedEmojis] = useState([]);

    const handleCardClick = (cardObj) => {
        if (flippedCards.length < 2 && !matchedEmojis.includes(cardObj.emoji)) {
            const newFlippedCards = [...flippedCards, cardObj];
            if (newFlippedCards.length === 2) {
                setFlippedCards(newFlippedCards);
                setTimeout(() => {checkForMatch(newFlippedCards);}, 500);
            } else {
                setFlippedCards(newFlippedCards);
            }
        }
    };

    const checkForMatch = (flippedCards) => {
        if (flippedCards[0].emoji === flippedCards[1].emoji) {
            setMatchedEmojis((emojis) => [...emojis, flippedCards[0].emoji]);
        }
        setFlippedCards([]);
    };

    const difficultyGetter = (columns) => {
        setCards(setDeck(columns));
        setFlippedCards([])
        setMatchedEmojis([])
    };

    return (
        <main>
            <ChoiceDifficult setDifficult={difficultyGetter} />
            <div className="cards-container">
                {cards.map(card => (
                    <Card key={card.id} {...card}
                        isFlipped={matchedEmojis.includes(card.emoji) || flippedCards.includes(card)}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>
        </main>
    );
};