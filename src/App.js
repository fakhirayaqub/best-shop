import React, {Component} from 'react';
import './App.css';

class App extends Component {
  
  state = {
    loading: true,
    person: null,  
  };

  async componentDidMount(){
    const url = 'https://api.randomuser.me/';
    const response = await fetch(url);
    const data =  await response.json();
    this.setState({person: data.results[0], loading: false})
    console.log(this.state.person); 
    // console.log(response);
  }

  render() {
    return (
      <div className="App">
        {this.state.loading  ? 
        (<div>loading.....</div>) : 
        (<div>
          <div>Data: {this.state.person.gender}</div> 
        </div>
        )}
      </div>
    )
  }
}


export default App;