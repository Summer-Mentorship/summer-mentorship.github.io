import React from 'react';
 

import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }
 
componentDidMount(){

  fetch('/currencies/v1/convert/EUR?',
  {method: 'GET', 
  headers: {'x-api-key' : '7a115e89bb8b4d43bd20255171b885c3' },
  }).then(res => res.json())
    .then(json => console.log(json));
}

// fetch('/currencies/v1/convert/EUR?', {
//   method: 'GET',
//   headers: { 'x-api-key': '0b2a29cc474445a382b9c96176922740' },
//   }).then(response => response.json())
//   .then(json => console.log(json));



  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div> Loading... </div>;
    }
    else {
    return (
      console.log(items),
      <div className="App">
        <h1> Currency</h1>
        Data has been uploaded.
        </div>
      
    );
    }

  }
}

export default App;


// {items.map(item => {
//   const{baseCurrency, quoteCurrency} = currency;
//      return (
//        <div key={baseCurrency}>
//        <p>From : {item.baseCurrency}</p>
//        <p>To : {item.baseCurrency}</p>
//        </div>
//      );
// }

