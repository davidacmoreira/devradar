import React from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevFormRegister from './components/DevFormRegister';
import DevFormUpdate from './components/DevFormUpdate';
import DevItem from './components/DevItem';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      devs: [],
      aside: "register",
      id_dev_edit: "",
      bio_dev_edit: "",
      techs_dev_edit: ""
    };
  }

  async componentDidMount() {
    const response = await api.get('/devs');

    if (response.status === 200) {
      this.setState({ 'devs': response.data });
    }

    if (response.status === 204) {
      alert("no devs found");
      this.setState({ 'devs': [] });
    }
  }

  async componentDidUpdate() {
    const response = await api.get('/devs');

    if (response.status === 200) {
      this.setState({ 'devs': response.data });
    }

    if (response.status === 204) {
      this.setState({ 'devs': [] });
    }
  }

  render() {
    const handleButtonEdit = (github_username, bio, techs) => {
      this.setState({ "aside": "update", "id_dev_edit": github_username, "bio_dev_edit": bio, "techs_dev_edit": techs });
    };

    const handleAddDev = async (data) => {
      try {
        const response = await api.post('/devs', data);
        this.setState({ 'devs': this.state.devs.concat(response.data) })
      }
      catch (err) {
        alert(err.response.data.message);
      }
    };
  
    const handleEditDev = async (data) => {
      try {
        const response = await api.put(`/devs/update/${data.github_username}`, {
          "bio": data.bio,
          "techs": data.techs
        });
        
        const indexDev = this.state.devs.findIndex(dev => dev.github_username === data.github_username);
        const updateDevs = [...this.state.devs];
        updateDevs[indexDev] = response.data;
  
        this.setState({ 'devs': updateDevs, 'aside': 'register', 'idDevEdit':'', 'bioDevEdit':'', 'techsDevEdit':'' });
      }
      catch (err) {
        alert(err.response.data.message);
      }
    };
  
    const handleRemoveDev = async (github_username) => {
      try {
        await api.delete(`/devs/destroy/${github_username}`);
  
        const updateDevs = this.state.devs.filter(dev => dev.github_username !== github_username);
        this.setState({ 'devs': updateDevs });
      }
      catch (err) {
        alert(err.response.data.message);
      }
    };

    const component = {
      register: DevFormRegister,
      update: DevFormUpdate
    }

    const handleFunctions = {
      register: handleAddDev,
      update: handleEditDev
    }

    const TagForm = component[this.state.aside];

    return(
      <div id="app">
        <aside>
          <strong>{this.state.aside}</strong>
          <TagForm onSubmit={handleFunctions[this.state.aside]} idDevEdit={this.state.id_dev_edit} bioDevEdit={this.state.bio_dev_edit} techsDevEdit={this.state.techs_dev_edit} />
        </aside>

        <main>
          <ul>
            {this.state.devs.map(dev => (
              <DevItem key={dev._id} dev={dev} onClickEdit={handleButtonEdit} onClickRemove={handleRemoveDev} />
            ))}
          </ul>
        </main>
      </div>
    )
  }
}

export default App;
