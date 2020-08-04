import React from 'react';
import ReactCountryFlag from 'react-country-flag'; // could not find

import './App.css';

//importing icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
 
//Arrow icon
const arrows = <FontAwesomeIcon icon = {faArrowsAltV} />
 

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visableItems: [], 
      isLoaded: false,
      searchCountry: '',
      lastSorted: ''
    
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
        isLoaded: true,
        
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


handleSearch = async event => {
  const {items} = this.state;
  
  await this.setState({searchCountry: event.target.value});

  console.log(this.state.searchCountry);
 

  // Trying to set filtered items lits at value to key; visableItems.
  this.setState({visableItems: items.filter(item => {
    if (item.country.includes(this.state.searchCountry.toUpperCase())){
      return true;
    }
    return false;
    })
  });

} //End of handleSearch



handleCountry =  event => {
  const {items} = this.state;
  if (this.state.lastSorted !== 'country') {
    this.setState({visableItems: items.sort((a,b) => (a.country > b.country))})
    this.setState({lastSorted: 'country'})
  }else {
    const liste = this.state.visableItems;
    this.setState({visableItems: liste.reverse()})

    console.log(this.state.visableItems);
    
  }
}


handleBase =  event => {
  const {items} = this.state;
  if (this.state.lastSorted !== 'base'){
    this.setState({visableItems: items.sort((a,b) => (a.baseCurrency > b.baseCurrency))})
    this.setState({lastSorted: 'base'})
  } else {
    const listet = this.state.visableItems;
    this.setState({visableItems: listet.reverse()})

    console.log(this.state.visableItems);
  }
  
}

handleRate =  event => {
  const {items} = this.state;
  //printing to console
  console.log('This is items before the if test');
  console.log(this.state.items);

  if (this.state.lastSorted !== 'rate'){
    this.setState({visableItems: items.sort((a,b) => (a.midRate - b.midRate) )})
    this.setState({lastSorted: 'rate'})

    //Printing to console to se what items is.
    console.log('Items');
    console.log(this.state.items);
    console.log('visableItems');
    console.log(this.state.visableItems);
  }else {
    const list = this.state.visableItems;
    this.setState({visableItems: list.reverse()})

    console.log(this.state.visableItems);
  }
  
}

 render() {

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
          <label for="searchCountry">Search:</label>
          <input type = 'text' name='searchCountry' onChange={this.handleSearch} placeholder='Search'/>

        </form>
        <table>
          <thead>
          <tr class = "buttons">
            <th><p onClick={this.handleCountry}> Country{arrows}</p></th>
            <th><p onClick={this.handleBase} >BaseCurrency {arrows}</p></th>
            <th>QuoteCurrency</th>
            <th><p onClick={this.handleRate}>Rate {arrows}</p></th>
          </tr>
          </thead>
          <tbody>
          {this.state.visableItems.map((item, index) => (
            <tr key={index}>
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



