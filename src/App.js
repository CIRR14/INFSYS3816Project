import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentResponsibility: '',
      username: ''
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
      duty: this.state.currentResponsibility,
      user: this.state.username
    } //grabs what the user typed in from the state and makes it into an object so it can be sent to Firebase
    responsibilitiesRef.push(responsibility); //sends a copy of the object so it can be stored in Firebase
    this.setState({
      currentResponsibility: '',
      username: ''
    }); //clears out inputs so that another item can be added
  }

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
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
