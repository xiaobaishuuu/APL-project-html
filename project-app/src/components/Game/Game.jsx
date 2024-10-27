import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import './Game.css';

const ChoiceDifficult = ({setDifficult}) => {
    return (
        <div className="choiceDifficult">
            <button onClick={() => setDifficult(4)}>簡單模式</button>
            <button onClick={() => setDifficult(5)}>正常模式</button>
            <button onClick={() => setDifficult(6)}>困難模式</button>
        </div>
    );
};

const Card = (props) => {
    const setClass = () =>{
        let classname = 'card'
        if (props.isFlipped || props.isMatched) classname += ' flipped'
        if (props.isMatched) classname += ' matched'
        return classname
    }
    return (
        <div className={setClass()}  onClick={props.onClick}>
            <span className="card-back">{props.emoji}</span>
        </div>
    )
};

const setDeck = (columns) =>{
    let newCards = [];
    for (let i = 0; i < columns*2; i++) {
        const emoji = String.fromCodePoint(0x1f601 + i);
        newCards.push({key:nanoid(),emoji});
        newCards.push({key:nanoid(),emoji});
    }
    return newCards.sort(() =>  - 0.5)
}

export default function Game(){
    const [cards, setCards] = useState(setDeck(5));
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedEmojis, setMatchedEmojis] = useState([]);

    const difficultyGetter = (columns) => {
        setCards(setDeck(columns));
        setFlippedCards([])
        setMatchedEmojis([])
    };

    const handleCardClick = (cardObj) => {
        if (flippedCards.length < 2 && !matchedEmojis.includes(cardObj.emoji)) {
            const newFlippedCards = [cardObj,...flippedCards];
            setFlippedCards(newFlippedCards);
            if (newFlippedCards.length === 2) {
                setTimeout(() => {checkForMatch(newFlippedCards);}, 500);
            }
        }
    };

    const checkForMatch = (flippedCards) => {
        if (flippedCards[0].emoji === flippedCards[1].emoji) {
            setMatchedEmojis((emojis) => [flippedCards[0].emoji,...emojis]);
        }
        setFlippedCards([]);
    };
    return (
        <main>
            <ChoiceDifficult setDifficult={difficultyGetter} />
            <div className="cards-container">
                {cards.map(card => (
                    <Card {...card}
                    isMatched={matchedEmojis.includes(card.emoji)}
                    isFlipped={flippedCards.includes(card)}
                    onClick={() => handleCardClick(card)}/>
                ))}
            </div>
        </main>
    );
};