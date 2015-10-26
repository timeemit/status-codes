window.SelectedDoc = React.createClass({displayName: "SelectedDoc",
  getInitialState(){
    return {
      'tip': { 'deactivate': function() {} }
    }
  },
  render: function(){
    var doc = this.props.doc;
    if ( doc ) {
      var code_class = this.codeClass();
      var contents = (
        React.createElement("div", {className: "SelectedDoc"}, 
          React.createElement("span", {className: "js-header"}, 
            React.createElement("h2", {className: "header-2"}, 
              React.createElement("div", {className: "disc-wrapper centered-text"}, 
                React.createElement("div", {className: 'class-' + code_class + 'xx disc'})
              ), 
              React.createElement("span", {className: "text"}, 
                doc.code, " ", doc.phrase
              )
            )
          ), 
          React.createElement("div", {id: "result", className: "larger-text"}, " ", doc.description, " ")
        )
      )
    } else {
      var contents = (
        React.createElement("div", {className: "SelectedDoc"}, 
          React.createElement("h2", {id: "search", className: "empty-state"}, " ",  '\u2190', " Search"), 
          React.createElement("h2", {id: "filter"}, " ",  '\u2190', " Filter"), 
          React.createElement("h2", {id: "select"}, " ",  '\u2190', " Select")
        )
      )
    }
    return contents;
  },
  codeClass: function() {
    return Math.floor( +this.props.doc.code / 100 );
  },
  componentWillUpdate(next_props, next_state) {
    // Cleanup lingering opentip
    if ( this.props.doc ) {
      var node = $(this.getDOMNode()).children('.js-header')
      node.data().opentips[0].deactivate();
      delete(node.data().opentips);
    }
  },
  componentDidUpdate: function() {
    // Opentip
    if ( this.props.doc ) {
      var node = $(this.getDOMNode()).children('.js-header');
      var opts = { style: this.codeClass() };
      new Opentip( node, opts );
    }
  }
});
