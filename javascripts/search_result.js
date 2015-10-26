var SearchResult = React.createClass({
  render: function(){
    var doc = this.props.doc;
    return <div className='searchResult search-preview' onClick={this.bubbleDoc}><strong>{doc.code}</strong> {doc.phrase}</div>
  },
  bubbleDoc: function(){
    this.props.onChoose(this.props.doc);
  }
});
