import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentResponsibility: '',
      username: '',
      responsibilities: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  } 

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault(); //prevents default behavior(refreshing the page when 'submit' is clicked)
    const responsibilitiesRef = firebase.database().ref('responsibilities'); //stores responsibilities in Firebase database spot (responsibility)
    const responsibility = {
      title: this.state.currentResponsibility,
      user: this.state.username
    } //grabs what the user typed in from the state and makes it into an object so it can be sent to Firebase
    responsibilitiesRef.push(responsibility); //sends a copy of the object so it can be stored in Firebase
    this.setState({
      currentResponsibility: '',
      username: ''
    }); //clears out inputs so that another item can be added
    
    responsibilitiesRef.on('value', (snapshot) => {
      console.log(snapshot.val());
    });
  }
  
  ///
  componentDidMount() {
    const responsibilitiesRef = firebase.database().ref('responsibilities');
    responsibilitiesRef.on('value', (snapshot) => {
      let responsibilities = snapshot.val();
      let newState = [];
      for (let responsibility in responsibilities) {
        newState.push({
          duty: responsibilities,
          title: responsibilities[responsibility].title,
          user: responsibilities[responsibility].user
        });
      }
      this.setState({
        responsibilities: newState
      });
    });
  }
///

removeResponsibility(responsibilityDuty) {
  const responsibilityRef = firebase.database().ref(`/responsibilities/${responsibilityDuty}`);
  responsibilityRef.remove();
}

// removeItem(itemId) {
//   const itemRef = firebase.database().ref(`/items/${itemId}`);
//   itemRef.remove();
// }

// <button onClick={() => this.removeItem(item.id)}>Remove Item</button>

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Responsibility Splitting</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentResponsibility" placeholder="Responsibility" onChange={this.handleChange} value={this.state.currentResponsibility} />
                <button>Add Item</button>
              </form>
          </section>



          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.responsibilities.map((responsibility) => {
                  return (
                    <li key ={responsibility.duty}>
                    <h3>{responsibility.title}</h3>
                    <p> done by: {responsibility.user}</p>
                    <button onClick={() => this.removeResponsibility(responsibility.id)}>Remove</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
