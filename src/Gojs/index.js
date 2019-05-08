import React from 'react';
import go from 'gojs';
export default class Gojs extends React.Component {
  state = {};
  componentDidMount() {
    this.init();
  }
  init = () => {
    var $ = go.GraphObject.make; // for conciseness in defining templates
    // Must name or refer to the DIV HTML element
    const myDiagram = $(go.Diagram, 'myDiagramDiv', {
      // automatically scale the diagram to fit the viewport's size
      initialAutoScale: go.Diagram.Uniform,
      // disable user copying of parts
      allowCopy: false,
      // position all of the nodes and route all of the links
      layout: $(go.LayeredDigraphLayout, {
        direction: 90,
        layerSpacing: 10,
        columnSpacing: 15,
        setsPortSpots: false,
      }),
    });
    // replace the default Node template in the nodeTemplateMap
    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto', // the whole node panel
      $(
        go.TextBlock, // the text label
        new go.Binding('text', 'key')
      ),
      $(go.Shape, 'RoundedRectangle', {
        fill: 'white',
        minSize: new go.Size(120, NaN),
        stroke: '#756875',
        strokeWidth: 3,
      }),
      $(
        go.Panel,
        go.Panel.Vertical,
        {
          alignment: go.Spot.TopLeft,
          alignmentFocus: go.Spot.TopLeft,
          minSize: new go.Size(120, NaN),
        },
        $(
          go.Picture,
          {
            margin: new go.Margin(18, 0, 5, 0),
            desiredSize: new go.Size(80, 40),
            imageStretch: go.GraphObject.Uniform,
          },
          new go.Binding('source', 'key', this.convertKeyImage)
          // new go.Binding('text', 'img', this.convertKeyImage)
        ),
        $(
          go.TextBlock,
          {
            alignment: go.Spot.BottomCenter,
            alignmentFocus: go.Spot.BottomCenter,
            name: 'NODE_TEXT',
            margin: 6,
            font: '11pt avn85,NanumGothic,ng,dotum,AppleGothic,sans-serif',
            editable: false,
          },
          new go.Binding('text', 'key')
        )
      )
    );

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
        reshapable: true,
        relinkableFrom: true,
        relinkableTo: true,
        toShortLength: 3,
      },
      new go.Binding('points').makeTwoWay(),
      new go.Binding('curviness'),
      $(
        go.Shape, // the link shape
        {
          name: 'LINK',
          isPanelMain: true,
          strokeWidth: 1.5,
        }
      ),
      $(
        go.Shape, // the arrowhead
        {
          name: 'ARROW',
          toArrow: 'standard', // toArrow : kite, standard, OpenTriangle
          stroke: null,
          scale: 1.5,
        }
      ),
      $(
        go.Panel,
        'Auto',
        $(
          go.Shape, // the label background, which becomes transparent around the edges
          {
            fill: $(go.Brush, 'Radial', {
              0: 'rgb(255, 255, 255)',
              0.3: 'rgb(255, 255, 255)',
              1: 'rgba(255, 255, 255, 0)',
            }),
            stroke: null,
          }
        ),
        $(
          go.TextBlock,
          'transition', // the label text
          {
            textAlign: 'center',
            font: '9pt helvetica, TOMCATal, sans-serif',
            margin: 4,
          },
          new go.Binding('text').makeTwoWay()
        )
      )
    );
    // the array of link data objects: the relationships between the nodes
    var linkDataArray = [
      { from: 'USER', to: 'TOMCAT', text: 1123 },
      { from: 'TOMCAT', to: 'MYSQL', text: 1123 },
      { from: 'TOMCAT', to: 'UNKNOWN', text: 1123 },
      { from: 'QUEUE', to: 'UNKNOWN', text: 1123 },
      { from: 'QUEUE', to: 'MYSQL', text: 1123 },
      { from: 'QUEUE', to: 'ETC', text: 1123 },
      { from: 'UNKNOWN', to: 'NODE', text: 123 },
    ];
    // create the model and assign it to the Diagram
    myDiagram.model = $(go.GraphLinksModel, {
      // automatically create node data objects for each "from" or "to" reference
      // (set this property before setting the linkDataArray)
      archetypeNodeData: {},
      // process all of the link relationship data
      linkDataArray: linkDataArray,
    });
  };
  convertKeyImage = key => {
    if (!key) key = 'NE';
    console.log(key);
    return './images/' + key + '.png';
    // return './images/USER.png';
  };

  render() {
    return (
      <div>
        <div
          id="myDiagramDiv"
          style={{ border: 'solid 1px black', width: '100%', height: '600px' }}
        />
      </div>
    );
  }
}
