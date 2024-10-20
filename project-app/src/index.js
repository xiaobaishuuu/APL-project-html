import ReactDOM from "react-dom"
import React from "react"
import './styles.css'

function Header(){
    return (<h1>🍉物件配对✈️</h1>)
}

class Weather extends React.Component{
    state = {isHot:true}
    render(){
        return <h1 onClick={this.changeWeather}>today  {this.state.isHot? 'Hot':'cold'}</h1>
    }
    changeWeather =()=>{
        this.setState({isHot:!this.state.isHot})
    }
}

ReactDOM.render(<Header/>,document.getElementById('head'))
// ReactDOM.render(<Header/>,document.getElementsByTagName('header'))