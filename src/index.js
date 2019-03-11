import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import testDatas from "./test.json";
import Select from './components/select/index'
import Pic from './components/pic'

import "./styles.css";
class App extends React.Component {
  state = { selectData: testDatas };
  componentWillMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json"
      )
      .then((response) =>{
        this.setState({ selectData: response.data });
      });
  }
  render() {
    return (
      <div className="App">
        <Select selectData={this.state.selectData} />
        <Pic/>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
