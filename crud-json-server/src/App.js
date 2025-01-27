import React from "react";
import Lists from "./Lists";

const data = require("./db.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      newItem: {
        title: "",
        author: "",
      },
      isEditing: false,
      editingIndex: null,
    };
  }

  // Simulate fetching data
  getLists = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
        alldata: data.posts, // Simulate fetching posts from JSON
      });
    }, 1000); // Simulate a loading delay
  };

  // Handle the addition of a new item
  handleAddItem = () => {
    const { newItem, alldata } = this.state;
    const updatedData = [...alldata, newItem]; // Add the new item to the existing data
    this.setState({
      alldata: updatedData,
      newItem: { title: "", author: "" }, // Clear the new item state after adding
    });
  };

  // Handle the deletion of an item
  handleDeleteItem = (index) => {
    const updatedData = this.state.alldata.filter((_, i) => i !== index); // Remove item by index
    this.setState({ alldata: updatedData });
  };

  // Handle the editing of an item (to populate the fields for update)
  handleEditItem = (index) => {
    const item = this.state.alldata[index];
    this.setState({
      newItem: { title: item.title, author: item.author },
      isEditing: true,
      editingIndex: index,
    });
  };

  // Handle the update of an item
  handleUpdateItem = () => {
    const { newItem, alldata, editingIndex } = this.state;
    const updatedData = [...alldata];
    updatedData[editingIndex] = newItem; // Replace the item at the specified index with the new item

    this.setState({
      alldata: updatedData,
      newItem: { title: "", author: "" }, // Clear input fields
      isEditing: false, // Turn off editing mode
      editingIndex: null, // Reset editing index
    });
  };

  // Handle input changes for adding or updating an item
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newItem: {
        ...this.state.newItem,
        [name]: value,
      },
    });
  };

  render() {
    const listTable = this.state.loading ? (
      <span>Loading Data...... Please be patient.</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
        onDelete={this.handleDeleteItem}
        onEdit={this.handleEditItem}
      />
    );

    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getLists}
          >
            Get Lists
          </button>
        </span>

        <div className="add-item-form">
          <h3>{this.state.isEditing ? "Update Item" : "Add New Item"}</h3>
          <input
            type="text"
            name="title"
            value={this.state.newItem.title}
            onChange={this.handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="author"
            value={this.state.newItem.author}
            onChange={this.handleInputChange}
            placeholder="Author"
          />
          {this.state.isEditing ? (
            <button onClick={this.handleUpdateItem} className="btn btn-warning">
              Update Item
            </button>
          ) : (
            <button onClick={this.handleAddItem} className="btn btn-success">
              Add Item
            </button>
          )}
        </div>

        {listTable}
      </div>
    );
  }
}

export default App;
