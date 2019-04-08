import React from "react";
import "./table.css";
import { Icon } from "antd";
export default class Table extends React.Component {
  state = {
    datas: this.props.tableDatas,
    columns: this.props.tableColumns
  };
  rightClick = e => {
    console.log(e);
    e.preventDefault();
    var menu = document.getElementById("menu");
    menu.style.display = "block";
    console.log(e.screenX);
    menu.style.left = Math.ceil(e.screenX / 2) + "px";
  };
  toggleColumn = index => {
    const { columns } = this.state;
    columns[index].isshow = !columns[index].isshow;
    this.setState({
      columns
    });
    var menu = document.getElementById("menu");
    menu.style.display = "none";
  };
  componentDidMount() {
    document.addEventListener("click", e => {
      const meun = document.getElementById("menu");
      const x = Math.ceil(e.screenX / 2);
      const y = Math.ceil(e.screenY / 2);
      const leftx = meun.offsetLeft;
      const rightx = meun.offsetLeft + meun.clientWidth;
      const topy = meun.offsetTop;
      const bottomy = meun.offsetTop + meun.clientHeight;
      if (x > leftx && x < rightx && y > topy && y < bottomy) {
      } else {
        meun.style.display = "none";
      }
    });
  }
  render() {
    const { datas, columns } = this.state;

    return (
      <div style={{ position: "relative" }}>
        <ul className="menu" id="menu">
          {columns.map((item, index) => (
            <li key={index} onClick={() => this.toggleColumn(index)}>
              <span className="isChecked">
                {item.isshow ? <Icon type="check" /> : ""}{" "}
              </span>
              {item.name}
            </li>
          ))}
        </ul>
        <table>
          <thead>
            <tr onContextMenu={this.rightClick}>
              {columns.map((item, index) => {
                if (item.isshow) {
                  return <th key={index}>{item.name}</th>;
                }
                return null;
              })}
            </tr>
          </thead>
          <tbody>
            {datas.map((item, index) => (
              <tr key={index}>
                {Object.entries(item).map(([tdkey, tditem]) => {
                  if (
                    columns.filter(item => item.key === tdkey && item.isshow)
                      .length > 0
                  )
                    return <td key={tdkey}>{tditem}</td>;
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
