import ReactDOM from "react-dom"
import React from "react"

class Weather extends React.Component{
  state = {isHot:true}
  render(){
      return <h1 onClick={this.changeWeather}>today  {this.state.isHot? 'Hot':'cold'}</h1>
  }
  changeWeather =()=>{
      this.setState({isHot:!this.state.isHot})
  }
}
ReactDOM.render(<Weather/>,document.getElementById('test'))