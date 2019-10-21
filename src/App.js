import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import DataTable from 'react-data-table-component';
// import logo from './logo.svg';
import Form from './Form.js';
import './App.css';

const instance = axios.create({ baseURL: 'http://localhost/react-app/php-react-rest-api-crud/api/' });

// const columns = [
//   {
//     name: 'Name',
//     selector: 'name',
//     sortable: true,
//   },
//   {
//     name: 'Email',
//     selector: 'email',
//     sortable: true,
//     right: true,
//   },
//   {
//     name: 'Country',
//     selector: 'country',
//     sortable: true,
//     right: true,
//   },
//   {
//     name: 'City',
//     selector: 'city',
//     sortable: true,
//     right: true,
//   },
//   {
//     name: 'Job',
//     selector: 'job',
//     sortable: true,
//     right: true,
//   },
// ];

class App extends React.Component {

  constructor () {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleChangeTextEdit = this.handleChangeTextEdit.bind(this);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);

    this.state = {
      name: "",
      email: "",
      country: "",
      city: "",
      job: "",
      isEdit: 0,
      contacts: []
    }
  }

  componentDidMount() {
    this.get_data();
  }
  get_data() {
    instance.get('contacts.php')
    .then(response => response.data)
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

  // handleChange = (state) => {
  //   // You can use setState or dispatch with something like Redux so we can use the retrieved data
  //   this.setState({ selectedRows: state.selectedRows });
  //   console.log(this.state);
  // };

  handleClickDelete = contact => {
    console.log(contact.id);

    const url = `contacts.php?id=${contact.id}`;
    const requestOptions = {
      method: 'DELETE'
    };

    instance.delete(url)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

    // // Note: I'm using arrow functions inside the `.fetch()` method.
    // fetch(url, requestOptions)
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // })

  }

  // state = {
  //   contacts: []
  // }

  /* CONFIRM DIALOUGE BOX */
  removeContact = (e, contact) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
          <h1>Are you sure?</h1>
          <p>You want to delete this file?</p>
          <button onClick={onClose}>No</button>
          <button
          onClick={() => {
            this.handleClickDelete(contact);
            onClose();
          }}
          >
          Yes, Delete it!
          </button>
          </div>
        );
      }
    })
  };

  editCliente(item) {
    console.log(item);
    this.setState({
      name: item.name,
      email: item.email,
      country: item.country,
      city: item.city,
      job: item.job,
      isEdit: item.id
    });
  }

  handleChangeTextEdit(text, title) {
    if(title === 'name') this.setState({ name: text });
    if(title === 'email') this.setState({ email: text });
    if(title === 'country') this.setState({ country: text });
    if(title === 'city') this.setState({ city: text });
    if(title === 'job') this.setState({ job: text });
  }

  handleClienteAdd(text) {
    var newText = {
      id: this.state.todos.length + 1,
      text: text
    };
    this.setState({
      todos: this.state.todos.concat(newText),
      text: ""
    });
  }

  handleTodoUpdate(todo) {
    console.log(todo.id);
    var todos = this.state.contacts;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == todo.id) {
        // todos.splice(i, 1);
        todos[i].name = todo.name;
        todos[i].email = todo.email;
        todos[i].city = todo.city;
        todos[i].country = todo.country;
        todos[i].job = todo.job;
      }
    }
    // todos.push(todo);
    this.setState({
      contacts: todos,
      name: "",
      email: "",
      country: "",
      city: "",
      job: "",
      isEdit: 0
    });
  }

  render() {
    return (
      <React.Fragment>
      <table border='1' width='100%' >
      <thead>
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Country</th>
      <th>City</th>
      <th>Job</th>
      <th>Action</th>
      <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {this.state.contacts.map((contact) => (
        <tr key={contact.id}>
        <td>{ contact.name }</td>
        <td>{ contact.email }</td>
        <td>{ contact.country }</td>
        <td>{ contact.city }</td>
        <td>{ contact.job }</td>
        <td><button onClick={e => this.removeContact(e, contact)}>Delete</button></td>
        <td><span className="cursorEdit" onClick={this.editCliente.bind(this, contact)}> Edit </span></td>
        </tr>
      ))}
      </tbody>
      </table>

      <hr />
      <EditCliente
      onClienteAdd = {this.handleStateChange}
      {...this.state}
      changeTextEdit={this.handleChangeTextEdit}
      onTodoUpdate={this.handleTodoUpdate}
      />

      <hr />

      

      <h2>React Form Validation Demo</h2>
      <Form />
      </React.Fragment>
    );
  }
}

// class ContactForm extends React.Component {
//   state = {
//     name: '',
//     email: '',
//     country: '',
//     city: '',
//     job: '',
//     f_error: '',
//   }
//
//   handleFormSubmit( event ) {
//     event.preventDefault();
//
//     let name = this.state.name;
//     let email = this.state.email;
//     let city = this.state.city;
//     let country = this.state.country;
//     let job = this.state.job;
//
//     if(name === ''){
//       this.setState({f_error: 'Name can not be blank'});
//     } else if(email === ''){
//       this.setState({f_error: 'Email can not be blank'});
//     } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
//       this.setState({f_error: 'Email is invalid'});
//     } else if(city === ''){
//       this.setState({f_error: 'City can not be blank'});
//     } else if(country === ''){
//       this.setState({f_error: 'Country can not be blank'});
//     } else if(job === ''){
//       this.setState({f_error: 'Job can not be blank'});
//     } else{
//
//       this.setState({f_error: ''});
//
//       let formData = new FormData();
//       formData.append('name', name)
//       formData.append('email', email)
//       formData.append('city', city)
//       formData.append('country', country)
//       formData.append('job', job)
//
//       // axios({
//       //   method: 'post',
//       //   url: 'contacts.php',
//       //   data: formData,
//       //   config: { headers: {'Content-Type': 'multipart/form-data' }}
//       // })
//       // .then(function (response) {
//       //   //handle success
//       //   console.log(response)
//       //   window.location.reload();
//       // })
//       // .catch(function (response) {
//       //   //handle error
//       //   console.log(response)
//       // });
//
//       instance.post('contacts.php', formData)
//       .then((res) => {
//         console.log(res.data);
//
//         var contact = {};
//         formData.forEach(function(value, key){
//           contact[key] = value;
//         });
//         this.props.handleStateChange(contact);
//
//         this.setState({name: ''});
//         this.setState({email: ''});
//         this.setState({city: ''});
//         this.setState({country: ''});
//         this.setState({job: ''});
//
//       });
//     }
//   }
//
//   render(){
//     return (
//       <form>
//       <h1>Add Contact Form</h1>
//       <p className="error">{this.state.f_error}</p>
//       <label>Name</label>
//       <input type="text" name="name" value={this.state.name}
//       onChange={e => this.setState({ name: e.target.value })}/>
//       <br/>
//       <label>Email</label>
//       <input type="email" name="email" value={this.state.email}
//       onChange={e => this.setState({ email: e.target.value })}/>
//       <br/>
//       <label>Country</label>
//       <input type="text" name="country" value={this.state.country}
//       onChange={e => this.setState({ country: e.target.value })}/>
//       <br/>
//       <label>City</label>
//       <input type="text" name="city" value={this.state.city}
//       onChange={e => this.setState({ city: e.target.value })}/>
//       <br/>
//       <label>Job</label>
//       <input type="text" name="job" value={this.state.job}
//       onChange={e => this.setState({ job: e.target.value })}/>
//       <br/><br/>
//       <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
//       </form>);
//     }
//   }

  class EditCliente extends React.Component {
    constructor(props) {
      super(props);
      this.onChangeEdit = this.onChangeEdit.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    state = {
      f1_error : ''
    }
    handleFormSubmit( e ) {
      e.preventDefault();

      var name = this.props.name.trim();
      var email = this.props.email.trim();
      var city = this.props.city.trim();
      var country = this.props.country.trim();
      var job = this.props.job.trim();
      var id = this.props.isEdit;


      if(name === ''){
        this.setState({f1_error: 'Name can not be blank'});
      } else if(email === ''){
        this.setState({f1_error: 'Email can not be blank'});
      } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        this.setState({f1_error: 'Email is invalid'});
      } else if(city === ''){
        this.setState({f1_error: 'City can not be blank'});
      } else if(country === ''){
        this.setState({f1_error: 'Country can not be blank'});
      } else if(job === ''){
        this.setState({f1_error: 'Job can not be blank'});
      } else{

        this.setState({f1_error: ''});

        let formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('city', city)
        formData.append('country', country)
        formData.append('job', job)
        formData.append('id', this.props.isEdit)

        if (this.props.isEdit) {

          console.log("is Updated...");

          const url = `/update/${id}`;

          instance.put(url, formData)
          .then((res) => {

          });

          var updateTodo = {
            id: this.props.isEdit,
            name: name,
            email: email,
            city: city,
            country: country,
            job: job,
          };

          this.props.onTodoUpdate(updateTodo);

        } else {

          console.log('is Created...');

          instance.post('contacts.php', formData)
          .then((res) => {

            var contact = {};
            formData.forEach(function(value, key){
              contact[key] = value;
            });

            this.props.onClienteAdd(contact);

          });
        }
      }
    }

    onChangeEdit(e, name) {
      this.props.changeTextEdit(e.target.value, name);
    }

    render() {
      return (
        <div>
        <form>
        <h1>Contact Form</h1>
        <p className="error">{this.state.f1_error}</p>
        <label>Name</label>
        <input type="text" ref="text" value={this.props.name} onChange={e => this.onChangeEdit(e, 'name')} required />
        <br/>
        <label>Email</label>
        <input type="email" ref="email" value={this.props.email} onChange={e => this.onChangeEdit(e, 'email')} required />
        <br/>
        <label>Country</label>
        <input type="text" ref="country" value={this.props.country} onChange={e => this.onChangeEdit(e, 'country')} required />
        <br/>
        <label>City</label>
        <input type="text" ref="city" value={this.props.city} onChange={e => this.onChangeEdit(e, 'city')} required />
        <br/>
        <label>Job</label>
        <input type="text" ref="job" value={this.props.job} onChange={e => this.onChangeEdit(e, 'job')} required />
        <br/>
        <br/>
        <input type="submit" value="Save Contact" onClick={e => this.handleFormSubmit(e)} />

        </form>
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('root'));

  export default App;
