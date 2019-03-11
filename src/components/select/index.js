import React from "react";
import "./style.css";

export default class Select extends React.Component {
  state = {
    address: "",
    isOpen: false,
    level: 3,
    selectedCode: this.props.selectData[0].code,
    firstLevel: this.props.selectData[0].name,
    secondLevel: this.props.selectData[0].children[0].children[0].name,
    secondLists: this.props.selectData[0].children[0].children,
    thirdLists: this.props.selectData[0].children[0].children[0].children,
    lists: this.props.selectData[0].children[0].children[0].children
  };

  toggleSelect = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  changeFirst = () => {
    this.setState({
      level: 1,
      lists: this.props.selectData
    });
  };

  changeSecond = () => {
    this.setState({
      level: 2,
      lists: this.state.secondLists
    });
  };
  changeThird = () => {
    this.setState({
      level: 3,
      lists: this.state.thirdLists
    });
  };
  handleChoose = item => {
    if (this.state.level === 1) {
      this.setState({
        selectedCode: item.code,
        level: 2,
        lists: this.setList(item),
        secondLists: this.setList(item),
        thirdLists: this.setList(this.setList(item)[0]),
        firstLevel: item.name,
        secondLevel:
          item.children.length === 1
            ? item.children[0].children[0].name
            : item.children[0].name
      });
    } else if (this.state.level === 2) {
      this.setState({
        selectedCode: item.code,
        level: 3,
        lists: item.children,
        thirdLists: item.children,
        secondLevel: item.name
      });
    } else {
      if (item.children) {
        this.setState({
          lists: item.children
        });
      } else {
        this.setState({
          address:
            this.state.firstLevel +
            " " +
            this.state.secondLevel +
            " " +
            item.name
        });
        console.log(this.state.address);
      }
      this.setState({
        selectedCode: item.code
      });
    }
  };
  setList(item) {
    return item.children.length === 1
      ? item.children[0].children
      : item.children;
  }
  render() {
    return (
      <div>
        <div className="inputContainer">
          <input
            type="text"
            value={this.state.address}
            readOnly
            placeholder="请选择行政区域"
            onClick={this.toggleSelect}
          />
          <div className={this.state.isOpen ? "arrow down" : "arrow"} />
        </div>
        <div className={this.state.isOpen ? "" : "hidden"}>
          <input type="text" placeholder="搜索行政规划" />
          <div className="head">
            <div
              onClick={this.changeFirst}
              className={this.state.level === 1 ? "active" : ""}
            >
              {this.state.firstLevel}
            </div>
            <div
              onClick={this.changeSecond}
              className={this.state.level === 2 ? "active" : ""}
            >
              {this.state.secondLevel}
            </div>
            <div
              onClick={this.changeThird}
              className={this.state.level === 3 ? "active" : ""}
            >
              请选择
            </div>
          </div>
          <div className="content flex">
            {this.state.lists.map(item => {
              return (
                <div
                  key={item.code}
                  onClick={this.handleChoose.bind(this, item)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
