import React from "react";
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
            default:
                console.log(1)
        }
        this.props.diffcult(column)
    }

    render(){
        return <div className="choiceDifficult">
                    <button ref={current => this.easy = current}   onClick={this.difficultHandle}>簡單模式</button>
                    <button ref={current => this.normal = current} onClick={this.difficultHandle}>正常模式</button>
                    <button ref={current => this.hard = current}   onClick={this.difficultHandle}>困難模式</button>
                    {/* <button>12</button>
                    <button>12s</button>
                    <input type="text"/>
                    <button>submit</button> */}
                </div>
    }
}

class Card extends React.Component{
    state = {show:false}
    filpCard = () =>{
        this.setState({show:!this.state.show})
    }
    render(){
        return (<div className="card" onClick={this.filpCard}>
                    <span>{this.state.show? this.props.emoji:''}</span>
                </div>)
    }
}

export default class Game extends React.Component{
    state = {card:[],
            clickOne: null,
            clickTwo: null
    }

    checkCard = () =>{
        let {clickOne,clickTwo} = this.state
        if (clickOne == clickTwo){
            [clickOne,clickTwo] = null
            // console.log(clickOne.clickTwo)
        }
    }

    diffcultGetter = (column) =>{
        let newState = {card:[]}
        for (let i = 0; i < column*2; i++) {
            newState.card.push({id:nanoid(),emoji:String.fromCodePoint(0x1f601 + i)})
            newState.card.push({id:nanoid(),emoji:String.fromCodePoint(0x1f601 + i)})
        }
        this.setState(newState)
    }
    render(){
        return (<main>
                    <ChoiceDifficult diffcult={this.diffcultGetter}/>
                    <div className="cards-container">{
                        this.state.card.map(card =>{
                            return <Card key={card.id} {...card}/>
                        })}
                        </div>
                </main>)
    }
}