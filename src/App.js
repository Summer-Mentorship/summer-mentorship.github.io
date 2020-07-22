import React from 'react';
import ReactCountryFlag from 'react-country-flag'; // could not find

 

import './App.css';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visableItems: [], 
      isLoaded: false,
      searchCountry: '',
      
    
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
        items: result,
        visableItems: result, //adds result to the list// To show te result in json ==  .then(json => console.log(json));
        isLoaded: true
      });
    });
  }
  catch(err){
    alert(err);
  }
  finally{
    this.setState({
      isLoaded: true
    });

  }
}


handleSearch = event => {
  const {items} = this.state;
  
  this.setState({searchCountry: event.target.value});
 

  // Trying to set filtered items lits at value to key; visableItems.
  this.setState({visableItems: items.filter(item => {
    if (item.country.includes(this.state.searchCountry.toUpperCase())){
      return true;
    }
    return false;
  })
  });
} //End of handleSearch



  render() {
    //const {items} = this.state; 
    //const {visableItems} = this.state;

    // this.state.isLoaded;
    if (!this.state.isLoaded){
      return(
      <div> 
        <p>The page is not able to load, try again later  </p>

      </div>
      )

    }else{
      return (
        <div>
        <h1>Currecy</h1>
        <form>
          {/* <h1>This is what you search for: {this.state.searchCountry} </h1> */}
         
          <input type = 'text' name='searchCountry' onChange={this.handleSearch} placeholder='Search'/>

        </form>
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
          {this.state.visableItems.map(item => (
            <tr key={item.country}>
              <td><ReactCountryFlag 
                    //className ="emojiFlag" 
                    countryCode= {item.country} 
                  /></td>  
              <td>{item.baseCurrency}</td>
              <td>{item.quoteCurrency}</td>
              <td>{item.midRate}</td>
            </tr>
            
          ))}
          </tbody>
        </table>
        </div>
      );
      }
    }
}


     

  

export default App;



