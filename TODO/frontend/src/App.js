import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import NotFound404 from "./components/NotFound404";
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import LoginForm from './components/Auth.js'
import axios from 'axios'
import ProjectForm from './components/ProjectForm'
import TodoForm from './components/TodoForms'

const DOMAIN = "http://127.0.0.1:8000/api/";
const get_url = (url) => `${DOMAIN}${url}`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarItems: [
                { name: "User", href: "/" },
                { name: "Project", href: "/project" },
                { name: "TODOs", href: "/todos" },
            ],
        users: [],
        projects: [],
        project: [],
        todos: [],
        auth: {username: '', is_login: false}
        };
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`get_url('todos/')${id}`, {headers})
            .then(response => {
                this.setState({
                    todos: this.state.todos.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
    }

    createTodo(name, project) {
        const headers = this.get_headers()
        const data = {name: name, project: project}
        axios.post(get_url('todos/'), data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id ===
                    new_todo.project)[0]
                new_todo.project = project
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }
    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`get_url('projects/')${id}`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
    }
    createProject(name, user) {
        const headers = this.get_headers()
        const data = {name: name, user: user}
        axios.post(`get_url('projects/')`, data, {headers})
            .then(response => {
                let new_project = response.data
                const user = this.state.users.filter((item) => item.id ===
                    new_project.user)[0]
                new_project.user = user
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }


    login(username, password) {
        axios.post(get_url('token/'), {username: username, password: password})
            .then(response => {
                const result = response.data
                const access = result.access
                const refresh = result.refresh
                localStorage.setItem('login', username)
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
                this.setState({'auth': {username: username, is_login: true}})
                this.load_data()
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль')
            } else {
                console.log(error)
            }
        })
    }


    logout() {
        localStorage.setItem('login', '')
        localStorage.setItem('access', '')
        localStorage.setItem('refresh', '')
        this.setState({'auth': {username: '', is_login: false}})
    }

    load_data() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login) {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        axios.get(get_url('users/'), {headers})
            .then(response => {
                // console.log(response.data)
                this.setState({users: response.data})
            }).catch(error =>

            console.log(error)
        )

        axios.get(get_url('projects/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({projects: response.data})
            }).catch(error =>
            console.log(error)
        )

        axios.get(get_url('todos/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({todos: response.data})
            }).catch(error =>
            console.log(error)
        )
    }

    componentDidMount() {

        // Получаем значения из localStorage
        const username = localStorage.getItem('login')
        if ((username != "") & (username != null)) {
            this.setState({'auth': {username: username, is_login: true}}, () => this.load_data())
        }
    }

   render() {
       return (
            <Router>
               <header>
                    <Navbar navbarItems={ this.state.navbarItems } auth={this.state.auth} logout={() => this.logout()}/>
               </header>
               <main role="main" className="flex-shrink-0">
                   <div className="container">
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} />
                            <Route exact path='project' element={<ProjectList  items={this.state.projects} />} />
                            <Route exact path='/projects/:id' element={<ProjectDetail getProject={(id) => this.getProject(id)}
                                                                                item={this.state.project} />} />
                            <Route exact path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, user) =>
                                   this.createProject(name, user)}/>}/>
                            <Route exact path='/todos' element={<ToDoList items={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>} />
                            <Route exact path='/todo/create' element={<TodoForm projects={this.state.projects} createTodo={(name, project) =>
                                   this.createTodo(name, project)}/>}/>
                            <Route exact path='/login' element={<LoginForm login={(username, password) => this.login(username, password)} />} />
                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>

                   </div>
               </main>
               <Footer/>
            </Router>
       )
  }
  getProject(id) {

      let headers = {
          'Content-Type': 'application/json'
      }
      console.log(this.state.auth)
      if (this.state.auth.is_login) {
          const token = localStorage.getItem('access')
          headers['Authorization'] = 'Bearer ' + token
      }

      axios.get(get_url(`/api/projects/${id}`), {headers})
          .then(response => {
              this.setState({project: response.data})
          }).catch(error => console.log(error))
  }
}

export default App;
