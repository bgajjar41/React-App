import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
// import logo from './logo.svg';
import Form from './Form.js';
import './App.css';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    right: true,
  },
  {
    name: 'Country',
    selector: 'country',
    sortable: true,
    right: true,
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
    right: true,
  },
  {
    name: 'Job',
    selector: 'job',
    sortable: true,
    right: true,
  },
];

class App extends React.Component {

  componentDidMount() {
    const url = 'https://logieagle.in/testlab/php-react-rest-api-crud/api/contacts.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
    })
  }

  state = {
    contacts: []
  }
  render() {
    return (
      <React.Fragment>
      <DataTable
      title="Contact Details"
      columns={columns}
      data={this.state.contacts}
      pagination = {true}
      paginationPerPage = {5}
      />
      <ContactForm />

      <h2>React Form Validation Demo</h2>
      <Form />
      </React.Fragment>
    );
  }
}

class ContactForm extends React.Component {
  state = {
    name: '',
    email: '',
    country: '',
    city: '',
    job: '',

  }

  handleFormSubmit( event ) {
    event.preventDefault();


    let formData = new FormData();
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('city', this.state.city)
    formData.append('country', this.state.country)
    formData.append('job', this.state.job)

    axios({
      method: 'post',
      url: 'https://logieagle.in/testlab/php-react-rest-api-crud/api/contacts.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
      //handle success
      console.log(response)

    })
    .catch(function (response) {
      //handle error
      console.log(response)
    });
  }

  render(){
    return (
      <form>
      <label>Name</label>
      <input type="text" name="name" value={this.state.name}
      onChange={e => this.setState({ name: e.target.value })}/>
      <br/>
      <label>Email</label>
      <input type="email" name="email" value={this.state.email}
      onChange={e => this.setState({ email: e.target.value })}/>
      <br/>
      <label>Country</label>
      <input type="text" name="country" value={this.state.country}
      onChange={e => this.setState({ country: e.target.value })}/>
      <br/>
      <label>City</label>
      <input type="text" name="city" value={this.state.city}
      onChange={e => this.setState({ city: e.target.value })}/>
      <br/>
      <label>Job</label>
      <input type="text" name="job" value={this.state.job}
      onChange={e => this.setState({ job: e.target.value })}/>
      <br/><br/>
      <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
      </form>);
    }
  }

  ReactDOM.render(<App />, document.getElementById('root'));

  export default App;
