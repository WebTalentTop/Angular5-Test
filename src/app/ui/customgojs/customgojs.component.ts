import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-customgojs',
  templateUrl: './customgojs.component.html',
  styleUrls: ['./customgojs.component.scss']
})
export class CustomgojsComponent implements AfterViewInit {
  myDiagram: any;
  @ViewChild('dadDiagramDiv') dadDiagramDiv;
  @ViewChild('dadPaletteDiv') dadPaletteDiv;

  constructor() {}

  ngAfterViewInit() {
    const MAKE = go.GraphObject.make;
    const diagramDiv = this.dadDiagramDiv.nativeElement;
    const paletteDiv = this.dadPaletteDiv.nativeElement;
    console.log(this.dadDiagramDiv)
    // diagramDiv.clientWidth = 640
    // this.dadDiagramDiv.requestUpdate();

    const yellowgrad = MAKE(go.Brush, 'Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' });
    const greengrad = MAKE(go.Brush, 'Linear', { 0: '#98FB98', 1: '#9ACD32' });
    const bluegrad = MAKE(go.Brush, 'Linear', { 0: '#B0E0E6', 1: '#87CEEB' });
    const redgrad = MAKE(go.Brush, 'Linear', { 0: '#C45245', 1: '#871E1B' });
    const whitegrad = MAKE(go.Brush, 'Linear', { 0: '#F0F8FF', 1: '#E6E6FA' });
    const bigfont = 'bold 13pt Helvetica, Arial, sans-serif';
    const smallfont = 'bold 11pt Helvetica, Arial, sans-serif';
    const _this = this;


    function textStyle() {
      return {
        margin: 6,
        wrap: go.TextBlock.WrapFit,
        textAlign: 'center',
        editable: true,
        font: bigfont
      };
    }


    this.myDiagram =
      MAKE(go.Diagram, diagramDiv,
        {
          // have mouse wheel events zoom in and out instead of scroll up and down
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
          allowDrop: true,  // support drag-and-drop from the Palette
          initialAutoScale: go.Diagram.Uniform,
          'linkingTool.direction': go.LinkingTool.ForwardsOnly,
          initialContentAlignment: go.Spot.Center,
          layout: MAKE(go.LayeredDigraphLayout, { isInitial: false, isOngoing: false, layerSpacing: 50 }),
          'undoManager.isEnabled': true
        });

    /*

    // when the document is modified, add a '*' to the title and enable the 'Save' button
    this.myDiagram.addDiagramListener('Modified', function(e) {
      const button = document.getElementById('SaveButton');
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf('*');
      if (myDiagram.isModified) {
        if (idx < 0) document.title += '*';
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });
    */
   this.myDiagram.addDiagramListener('InitialLayoutCompleted', function(e) {
    var dia = e.diagram;
    // add height for horizontal scrollbar
    dia.div.style.width = "640px";
    dia.div.style.height = "480px";
  });

    const defaultAdornment =
      MAKE(go.Adornment, 'Spot',
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
          MAKE(go.Placeholder)),
        // the button to create a 'next' node, at the top-right corner
        MAKE('Button',
          { alignment: go.Spot.TopRight,
            click: addNodeAndLink },  // this function is defined below
          new go.Binding('visible', '', function(a) { return !a.diagram.isReadOnly; }).ofObject(),
          MAKE(go.Shape, 'PlusLine', { desiredSize: new go.Size(6, 6) })
        )
      );

    // define the Node template
    this.myDiagram.nodeTemplate =
      MAKE(go.Node, 'Auto',
        { selectionAdornmentTemplate: defaultAdornment },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        // define the node's outer shape, which will surround the TextBlock
        MAKE(go.Shape, 'Rectangle',
          { fill: yellowgrad, stroke: 'black',
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toEndSegmentLength: 50, fromEndSegmentLength: 40 }),
        MAKE(go.TextBlock, 'Page',
          { margin: 6,
            font: bigfont,
            editable: true },
          new go.Binding('text', 'text').makeTwoWay()));

    this.myDiagram.nodeTemplateMap.add('Source',
      MAKE(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        MAKE(go.Shape, 'RoundedRectangle',
          { fill: bluegrad,
          portId: '', fromLinkable: true, cursor: 'pointer', fromEndSegmentLength: 40}),
        MAKE(go.TextBlock, 'Source', textStyle(),
          new go.Binding('text', 'text').makeTwoWay())
        ));

    this.myDiagram.nodeTemplateMap.add('DesiredEvent',
      MAKE(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        MAKE(go.Shape, 'RoundedRectangle',
          { fill: greengrad, portId: '', toLinkable: true, toEndSegmentLength: 50 }),
        MAKE(go.TextBlock, 'Success!', textStyle(),
          new go.Binding('text', 'text').makeTwoWay())
        ));

    // Undesired events have a special adornment that allows adding additional 'reasons'
    const UndesiredEventAdornment =
      MAKE(go.Adornment, 'Spot',
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
          MAKE(go.Placeholder)),
        // the button to create a 'next' node, at the top-right corner
        MAKE('Button',
          { alignment: go.Spot.BottomRight,
            click: addReason },  // this function is defined below
          new go.Binding('visible', '', function(a) { return !a.diagram.isReadOnly; }).ofObject(),
          MAKE(go.Shape, 'TriangleDown', { desiredSize: new go.Size(10, 10) })
        )
      );

    const reasonTemplate = MAKE(go.Panel, 'Horizontal',
      MAKE(go.TextBlock, 'Reason',
        {
          margin: new go.Margin(4, 0, 0, 0),
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          stroke: 'whitesmoke',
          editable: true,
          font: smallfont
        },
        new go.Binding('text', 'text').makeTwoWay())
      );


    this.myDiagram.nodeTemplateMap.add('UndesiredEvent',
      MAKE(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        { selectionAdornmentTemplate: UndesiredEventAdornment },
        MAKE(go.Shape, 'RoundedRectangle',
          { fill: redgrad, portId: '', toLinkable: true, toEndSegmentLength: 50 }),
        MAKE(go.Panel, 'Vertical', {defaultAlignment: go.Spot.TopLeft},

          MAKE(go.TextBlock, 'Drop', textStyle(),
            { stroke: 'whitesmoke',
              minSize: new go.Size(80, NaN) },
            new go.Binding('text', 'text').makeTwoWay()),

          MAKE(go.Panel, 'Vertical',
            { defaultAlignment: go.Spot.TopLeft,
              itemTemplate: reasonTemplate },
            new go.Binding('itemArray', 'reasonsList').makeTwoWay()
          )
        )
        ));

    this.myDiagram.nodeTemplateMap.add('Comment',
      MAKE(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        MAKE(go.Shape, 'Rectangle',
          { portId: '', fill: whitegrad, fromLinkable: true }),
        MAKE(go.TextBlock, 'A comment',
          { margin: 9,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
            font: smallfont },
          new go.Binding('text', 'text').makeTwoWay())
        // no ports, because no links are allowed to connect with a comment
        ));

    // clicking the button on an UndesiredEvent node inserts a new text object into the panel
    function addReason(e, obj) {
      const adorn = obj.part;
      if (adorn === null) {
        return;
      }
      e.handled = true;
      const arr = adorn.adornedPart.data.reasonsList;
      _this.myDiagram.startTransaction('add reason');
      _this.myDiagram.model.addArrayItem(arr, {});
      _this.myDiagram.commitTransaction('add reason');
    }

    // clicking the button of a default node inserts a new node to the right of the selected node,
    // and adds a link to that new node
    function addNodeAndLink(e, obj) {
      const adorn = obj.part;
      if (adorn === null) {
        return;
      }
      e.handled = true;
      const diagram = adorn.diagram;
      diagram.startTransaction('Add State');
      // get the node data for which the user clicked the button
      const fromNode = adorn.adornedPart;
      const fromData = fromNode.data;
      // create a new 'State' data object, positioned off to the right of the adorned Node
      const toData = { text: 'new', loc: '' };
      const p = fromNode.location;
      toData.loc = p.x + 200 + ' ' + p.y;  // the 'loc' property is a string, not a Point object
      // add the new node data to the model
      const model = diagram.model;
      model.addNodeData(toData);
      // create a link data from the old node data to the new node data
      const linkdata = {};
      linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
      linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
      // and add the link data to the model
      model.addLinkData(linkdata);
      // select the new Node
      const newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);
      diagram.commitTransaction('Add State');
    }

    // replace the default Link template in the linkTemplateMap
    this.myDiagram.linkTemplate =
      MAKE(go.Link,  // the whole link panel
        new go.Binding('points').makeTwoWay(),
        { curve: go.Link.Bezier, toShortLength: 15 },
        new go.Binding('curviness', 'curviness'),
        MAKE(go.Shape,  // the link shape
          { stroke: '#2F4F4F', strokeWidth: 2.5 }),
        MAKE(go.Shape,  // the arrowhead
          { toArrow: 'kite', fill: '#2F4F4F', stroke: null, scale: 2 })
    );

    this.myDiagram.linkTemplateMap.add('Comment',
      MAKE(go.Link, { selectable: false },
        MAKE(go.Shape, { strokeWidth: 2, stroke: 'darkgreen' })));

    const palette =
      MAKE(go.Palette, paletteDiv,  // create a new Palette in the HTML DIV element
        {
          // share the template map with the Palette
          nodeTemplateMap: _this.myDiagram.nodeTemplateMap,
          autoScale: go.Diagram.Uniform  // everything always fits in viewport
        });

    palette.model.nodeDataArray = [
      { category: 'Source' },
      { }, // default node
      { category: 'DesiredEvent' },
      { category: 'UndesiredEvent', reasonsList: [{}] },
      { category: 'Comment' }
    ];

    // read in the JSON-format data from the 'mySavedModel' element
    this.load();
    this.layout();
  }

  layout() {
    this.myDiagram.layoutDiagram(true);
  }
  load() {
    this.myDiagram.model = go.Model.fromJson({
      'copiesArrays': true,
      'copiesArrayObjects': true,
      'nodeDataArray': [
        { 'key': -1, 'category': 'Source', 'text': 'Search' },
        { 'key': -2, 'category': 'Source', 'text': 'Referral' },
        { 'key': -3, 'category': 'Source', 'text': 'Advertising' },
        { 'key': 0, 'text': 'Homepage' },
        { 'key': 1, 'text': 'Products' },
        { 'key': 2, 'text': 'Buy' },
        { 'key': 3, 'text': 'Samples' },
        { 'key': 5, 'text': 'Documentation' },
        { 'key': 6, 'text': 'Download' },
        { 'key': 100, 'category': 'DesiredEvent', 'text': 'Ordered!' },
        { 'key': 101, 'category': 'DesiredEvent', 'text': 'Downloaded!' },
        { 'key': 200, 'category': 'UndesiredEvent',
          'reasonsList': [
            {'text': 'Needs redesign?'},
            {'text': 'Wrong Product?'}
          ]
        },
        { 'key': 201, 'category': 'UndesiredEvent',
          'reasonsList': [
            {'text': 'Need better samples?'},
            {'text': 'Bad landing page for Advertising?'}
          ]
        },
        { 'key': 202, 'category': 'UndesiredEvent',
          'reasonsList': [
            {'text': 'Reconsider Pricing?'},
            {'text': 'Confusing Cart?'}
          ]
        },
        { 'category': 'Comment', 'text': 'Add notes with general comments for the next team meeting' }
      ],
      'linkDataArray': [
        { 'from': -1, 'to': 0 },
        { 'from': -2, 'to': 0 },
        { 'from': -2, 'to': 3 },
        { 'from': -3, 'to': 3 },
        { 'from':  0, 'to': 1 },
        { 'from':  1, 'to': 2 },
        { 'from':  1, 'to': 3 },
        { 'from':  0, 'to': 5 },
        { 'from':  5, 'to': 3 },
        { 'from':  3, 'to': 2 },
        { 'from':  3, 'to': 6 },
        { 'from':  2, 'to': 100 },
        { 'from':  6, 'to': 101 },
        { 'from':  0, 'to': 200 },
        { 'from':  3, 'to': 201 },
        { 'from':  2, 'to': 202 }
      ]
    });
  }
}
