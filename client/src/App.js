import React, { Component } from "react";
import TodoContract from "./contracts/TodoContract.json";
import getWeb3 from "./getWeb3";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";

class App extends Component {
  state = {
    account: "",
    todocount: 0,
    todos: [],
    instance: "",
    address: "",
  };

  componentDidMount = async () => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    //To get the instance of deployed network
    const deployedNetwork = TodoContract.networks[networkId];
    this.setState({ address: deployedNetwork.address });
    //usual format const contract = new web3.eth.Contract(abi, address)
    const Todos = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);
    this.setState({ instance: Todos });
    const counts = await Todos.methods.todoCount().call();
    this.setState({ todocount: counts });

    for (let i = 1; i <= this.state.todocount; i++) {
      let todos = await Todos.methods.tasks(i).call();
      this.setState({ todos: [...this.state.todos, todos] });
    }
  };

  createTodo = async (desc) => {
    await this.state.instance.methods.addTodo(desc).send({ from: this.state.account });
  };

  toggleComplete = async (_id) => {
    const id = _id * 1;
    await this.state.instance.methods.toggleTaskStatus(id).send({ from: this.state.account });
  };

  render() {
    return (
      <>
        <div className="container center">
          <h3>Todo List with Truffle React App</h3>
          <TodoForm createTodo={this.createTodo} />
          <TodoList todos={this.state.todos} toggleComplete={this.toggleComplete} />
        </div>
      </>
    );
  }
}

export default App;
