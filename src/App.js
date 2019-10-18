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

  constructor () {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount() {
    this.get_data();
  }
  get_data() {
    const url = 'https://logieagle.in/testlab/php-react-rest-api-crud/api/contacts.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
    })
  }

  handleStateChange(value){
    // event.preventDefault();
    let contacts = this.state.contacts;
    contacts.unshift(value);
    this.setState({ contacts : contacts })
  }

  handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    this.setState({ selectedRows: state.selectedRows });
    console.log(this.state);
  };

  state = {
    contacts: []
  }
  render() {
    return (
      <React.Fragment>
      <table border='1' width='100%' >
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Country</th>
      <th>City</th>
      <th>Job</th>
      </tr>
      {this.state.contacts.map((contact) => (
        <tr>
        <td>{ contact.name }</td>
        <td>{ contact.email }</td>
        <td>{ contact.country }</td>
        <td>{ contact.city }</td>
        <td>{ contact.job }</td>
        </tr>
      ))}
      </table>
       // <DataTable title="Contact Details" columns={columns} data={this.state.contacts} pagination = {true} paginationPerPage = {5} selectableRows onRowSelected={this.handleChange} striped />
      <ContactForm handleStateChange = {this.handleStateChange}/>

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
    f_error: '',
  }

  handleFormSubmit( event ) {
    event.preventDefault();

    let name = this.state.name;
    let email = this.state.email;
    let city = this.state.city;
    let country = this.state.country;
    let job = this.state.job;

    if(name === ''){
      this.setState({f_error: 'Name can not be blank'});
    } else if(email === ''){
      this.setState({f_error: 'Email can not be blank'});
    } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
      this.setState({f_error: 'Email is invalid'});
    } else if(city === ''){
      this.setState({f_error: 'City can not be blank'});
    } else if(country === ''){
      this.setState({f_error: 'Country can not be blank'});
    } else if(job === ''){
      this.setState({f_error: 'Job can not be blank'});
    } else{

      this.setState({f_error: ''});

      let formData = new FormData();
      formData.append('name', name)
      formData.append('email', email)
      formData.append('city', city)
      formData.append('country', country)
      formData.append('job', job)



      // axios({
      //   method: 'post',
      //   url: 'https://logieagle.in/testlab/php-react-rest-api-crud/api/contacts.php',
      //   data: formData,
      //   config: { headers: {'Content-Type': 'multipart/form-data' }}
      // })
      // .then(function (response) {
      //   //handle success
      //   console.log(response)
      //   window.location.reload();
      // })
      // .catch(function (response) {
      //   //handle error
      //   console.log(response)
      // });

      axios.post('https://logieagle.in/testlab/php-react-rest-api-crud/api/contacts.php', formData)
      .then((res) => {
        console.log(res.data);

        var contact = {};
        formData.forEach(function(value, key){
          contact[key] = value;
        });
        this.props.handleStateChange(contact);

      });
    }
  }

  render(){
    return (
      <form>
      <p className="error">{this.state.f_error}</p>
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
