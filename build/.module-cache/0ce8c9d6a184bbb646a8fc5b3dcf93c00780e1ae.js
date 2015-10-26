window.SearchList = React.createClass({displayName: "SearchList",
  render: function() {
    var _this = this;
    var search_nodes = this.props.docs.map(function(doc) {
      return (
        React.createElement(SearchResult, {key: doc.code, onChoose: _this.bubbleDoc, doc: doc})
      )
    });
    return React.createElement("div", {className: "searchList"}, search_nodes);
  },
  bubbleDoc: function(doc) {
    this.props.onSelectDoc(doc);
  }
});
