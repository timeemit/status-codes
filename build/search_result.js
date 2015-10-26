var SearchResult = React.createClass({displayName: "SearchResult",
  render: function(){
    var doc = this.props.doc;
    return React.createElement("div", {className: "searchResult search-preview", onClick: this.bubbleDoc}, React.createElement("strong", null, doc.code), " ", doc.phrase)
  },
  bubbleDoc: function(){
    this.props.onChoose(this.props.doc);
  }
});
