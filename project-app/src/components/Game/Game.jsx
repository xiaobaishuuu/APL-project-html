import React, { useLayoutEffect } from "react";
import {nanoid} from 'nanoid'
import './Game.css'

class ChoiceDifficult extends React.Component{

    difficultHandle = (event) =>{
        let column;
        switch (event.target){
            case this.easy:
                column = 4
                break;
            case this.normal:
                column = 6
                break;
            case this.hard:
                column = 8
                break;
        }
        this.props.diffcult(column)
    }

    render(){
        return <div className="choiceDifficult">
                    <button ref={current => this.easy = current}   onClick={this.difficultHandle}>簡單模式</button>
                    <button ref={current => this.normal = current} onClick={this.difficultHandle}>正常模式</button>
                    <button ref={current => this.hard = current}   onClick={this.difficultHandle}>困難模式</button>
                </div>
    }
}

class Card extends React.Component{
    state = {show:false}
    filpCard = (event) =>{
        if (this.props.match) return
        console.log(event.target)
        this.props.cardGetter(event.target)
        this.setState({show:!this.state.show})
    }
    render(){
        return (<div className='card'  onClick={this.filpCard}>
                    <span id={this.props.id}>{this.state.show? this.props.emoji:''}</span>
                </div>)
    }
}

export default class Game extends React.Component{
    state = {card:[],
        clickCards:[]
    }

    cardGetter = (event) =>{
        const {clickCards} = this.state
        let newClickCards = clickCards
        if (clickCards.length < 2){
            newClickCards  = [event.target.innerText,...clickCards];
        }else if(clickCards[0] == clickCards[1]){
            
        }
        this.setState({clickCards:newClickCards})
    }

    checkCard = () =>{
        let {clickOne,clickTwo} = this.state
        if (clickOne === clickTwo){
            [clickOne,clickTwo] = null
        }
    }

    diffcultGetter = (column) =>{
        let newState = {card:[]}
        for (let i = 0; i < column*2; i++) {
            for(let j = 0;j < 2;j++){
                newState.card.push({id:nanoid(),emoji:String.fromCodePoint(0x1f601 + i),match:false})
            }
        }
        this.setState(newState)
    }
    render(){
        return (<main>
                    <ChoiceDifficult diffcult={this.diffcultGetter}/>
                    <div className="cards-container">{
                        this.state.card.map(card =>{
                            return <Card key={card.id} cardGetter={this.cardGetter} {...card}/>
                        })}
                        </div>
                </main>)
    }
}