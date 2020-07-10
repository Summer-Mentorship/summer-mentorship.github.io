import React from 'react';
import ReactCountryFlag from 'react-country-flag'; // could not find

 

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
  try{
  fetch('/currencies/v1/convert/EUR?',
  {method: 'GET', 
  headers: {'x-api-key' : '7a115e89bb8b4d43bd20255171b885c3' }, //my api key
  }).then(res => res.json())
    .then(result => {
      this.setState({
        items: result, //adds result to the list
        isLoaded: true
      });
    });
  }
  catch(err){
    alert(err);
    //console.log(error); 
    //alert 
  }
  finally{
    this.setState({
      isLoaded: true
    });

  }
}


// To show te result in json ==  .then(json => console.log(json));

handleSubmit(event){
  alert('This is what you are searching for' + this.state.value)
}

  render() {
    const {items} = this.state; 
    // this.state.isLoaded;
    if (this.isLoaded){
      return(
      <div> 
        <p>The page is not able to load, try again later  </p>

      </div>
      )

    }else{
      return (
        <div>
        <h1>Currecy</h1>
        <form onSubmit= {this.handleSubmit}>
            <input type = 'text' value = ''></input>
            <button type = 'submit' value ='submit'>Search</button>
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
          {items.map(item => (
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



