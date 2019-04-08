import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import testDatas from './test.json';
import Select from './components/select/index';
import Pic from './components/pic';
import Table from './components/table';

import './styles.css';
class App extends React.Component {
  state = {
    selectData: testDatas,
    tableDatas: [
      { name1: 1, name2: 3, name3: 55, name4: 33, name5: 342 },
      { name1: 1, name2: 3, name3: 55, name4: 33, name5: 342 },
      { name1: 1, name2: 3, name3: 55, name4: 33, name5: 342 },
      { name1: 1, name2: 3, name3: 55, name4: 33, name5: 342 },
      { name1: 1, name2: 3, name3: 55, name4: 33, name5: 342 },
      { name1: 1, name2: 3, name3: 55, name4: 33, name5: 342 },
    ],
    tableColumns: [
      { key: 'name1', name: '应用1', isshow: true },
      { key: 'name2', name: '应用2', isshow: false },
      { key: 'name3', name: '应用3', isshow: true },
      { key: 'name4', name: '应用4', isshow: false },
      { key: 'name5', name: '应用5', isshow: true },
    ],
  };
  componentWillMount() {
    axios
      .get(
        'https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json'
      )
      .then(response => {
        this.setState({ selectData: response.data });
      });
  }
  render() {
    const { tableDatas, tableColumns } = this.state;
    return (
      <div className="App">
        <Table tableDatas={tableDatas} tableColumns={tableColumns} />
        <Select selectData={this.state.selectData} />
        <Pic />
      </div>
    );
  }
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
