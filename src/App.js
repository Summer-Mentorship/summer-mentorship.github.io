import React from 'react';
import ReactCountryFlag from 'react-country-flag'; // could not find

 

import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
 
componentDidMount(){
  try{
  fetch('/currencies/v1/convert/EUR?',
  {method: 'GET', 
  headers: {'x-api-key' : '7a115e89bb8b4d43bd20255171b885c3' }, //my api key
  }).then(res => res.json())
    .then(result => {
      this.setState({
        items: result //adds result to the list
      });
    });
  }
  catch(error){
    console.log(error); 
  }
}


// To show te result in json ==  .then(json => console.log(json));



  render() {
    const {items} = this.state; 
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
              <td><ReactCountryFlag 
                    //className ="emojiFlag" 
                    countryCode= {items.country} 
                  /></td>  
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



