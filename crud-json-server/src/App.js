import React from "react";
import Lists from "./Lists";

const data = require("./db.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: "",
      },
    };
  }

  // getLists = () => {
  //   this.setState({ loading: true });
  //   fetch("http://localhost:5000/posts")
  //     .then((res) => res.json())
  //     .then((result) =>
  //       this.setState({
  //         loading: false,
  //         alldata: result.posts,
  //       })
  //     )
  //     .catch("error", console.log);
  // };

  getLists = () => {
    this.setState({ loading: true }); // Set loading to true before fetching
    // Simulate fetching data by using the imported JSON
    setTimeout(() => {
      this.setState({
        loading: false,
        alldata: data.posts, // Access the posts array from the imported data
      });
    }, 1000); // Simulate a loading delay
  };

  render() {
    const listTable = this.state.loading ? (
      <span>Loading Data...... Please be patient.</span>
    ) : (
      <Lists alldata={this.state.alldata} />
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
        {listTable}
      </div>
    );
  }
}

export default App;
