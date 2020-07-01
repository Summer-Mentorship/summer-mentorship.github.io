import React from 'react';
 

import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
 
componentDidMount(){

  fetch('/currencies/v1/convert/EUR?',
  {method: 'GET', 
  headers: {'x-api-key' : '7a115e89bb8b4d43bd20255171b885c3' }, //my api key
  }).then(res => res.json())
    .then(result => {
      this.setState({
        isLoaded: true,
        items: result //adds result to the list
      });
    });
}


// To show te result in json ==  .then(json => console.log(json));



  render() {
    const {items} = this.state;
    //commented out, was not responding with the if/else-test.
    // if (!isLoaded) {
    //   return <div> Loading ...</div>;
    // } else {
      return (
        <table>
          <thead>
          <tr>
            <th>Country</th>
            <th>BaseCurrency</th>
            <th>QuoteCurrency</th>
            <th>Rate</th>
          </tr>
          </thead>
          <tbody>
          {items.map(item => (
            <tr key={items.country}>
              <td>{item.country}</td>
              <td>{item.baseCurrency}</td>
              <td>{item.quoteCurrency}</td>
              <td>{item.midRate}</td>
            </tr>
            
          ))}
          </tbody>
        </table>
      );
    }
  }

     

  

export default App;



