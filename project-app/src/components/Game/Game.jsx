import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import './Game.css';

const ChoiceDifficult = ({setDifficult}) => {
    // write a difficult and theme changer -- use input element
    // diffcult limitation is 1-100,
    // theme can be country flag or foot .etc  just mark down the unicode here,or change direactly in function(setDeck)
    return (
        <div className="choiceDifficult">
            <button onClick={() => setDifficult(4)}>簡單模式</button>
            <button onClick={() => setDifficult(5)}>正常模式</button>
            <button onClick={() => setDifficult(6)}>困難模式</button>
        </div>
    );
};
const Card = (props) => {
    const getClass = () =>{
        let newClass = 'card';
        if (props.isFlipped || props.isMatched) newClass += ' flipped';
        if (props.isMatched) newClass += ' matched'
        return newClass
    }
    return (
        <div className={getClass()}  onClick={props.onClick}>
            <span className="card-back">{props.emoji}</span>
        </div>
    )
};
const setDeck = (columns,theme = '') =>{       // write a shuffle func for (newCards) just add in setDeck
    let newCards = [];
    for (let i = 0; i < columns*2; i++) {
        const emoji = String.fromCodePoint(0x1f601 + i);
        newCards.push({key:nanoid(),emoji},{key:nanoid(),emoji});
    }
    return newCards
}
export default function Game(){
    const [cards, setCards] = useState(setDeck(5));
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedEmojis, setMatchedEmojis] = useState([]);

    const difficultyGetter = (columns) => {
        setCards(setDeck(columns))
        setFlippedCards([])
        setMatchedEmojis([])
    }
    const checkCard = (cardObj) => {
        if (flippedCards.length < 2 && !matchedEmojis.includes(cardObj.emoji) && !flippedCards.includes(cardObj)) {
            const newFlippedCards = [cardObj,...flippedCards];
            setFlippedCards(newFlippedCards)
            if (newFlippedCards.length === 2) {
                setTimeout(() => {
                if (newFlippedCards[0].emoji === newFlippedCards[1].emoji) {
                    setMatchedEmojis((emojis) => [newFlippedCards[0].emoji,...emojis])
                }setFlippedCards([])}, 500)
            }
        }
    }
    return (
        <main>
            <ChoiceDifficult setDifficult={difficultyGetter} />
            <div className="cards-container">
                {cards.map(card => (
                    <Card {...card}
                    isMatched={matchedEmojis.includes(card.emoji)}
                    isFlipped={flippedCards.includes(card)}
                    flippedCards = {flippedCards}
                    onClick={() => checkCard(card)}/>
                ))}
            </div>
        </main>
    )
}