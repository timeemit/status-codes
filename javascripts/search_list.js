window.SearchList = React.createClass({
  render: function() {
    var _this = this;
    var search_nodes = this.props.docs.map(function(doc) {
      return (
        <SearchResult key={doc.code} onChoose={_this.bubbleDoc} doc={doc}></SearchResult>
      )
    });
    return <div className='searchList'>{search_nodes}</div>;
  },
  bubbleDoc: function(doc) {
    this.props.onSelectDoc(doc);
  }
});
