window.AppBox = React.createClass({
  getInitialState: function() {
    var _this = this;
    $.get("/lib/codes.json").complete(function(result){
      window.docs = result.responseJSON;
      window.default_docs = [ 
        window.docs[0],
        window.docs[100],
        window.docs[200],
        window.docs[300],
        window.docs[400],
      ];
      window.doc_dict = {}
      $.each(window.docs, function(index, doc){
        window.idx.add(doc);
        window.doc_dict[doc.code] = doc;
      });
      _this.setState({'docs': window.default_docs});
    });
    return { 
      'query': '',
      'filter': '',
      'docs': [],
      'selected_doc': null
    }
  },
  render: function() {
    return (
      <div className='appBox pure-g'>
        <div className='pure-u-1-3'>
          <SearchForm onQueryChange={this.handleQueryChange} />
          <SearchFilters onFilterSelect={this.handleFilterSelect} />
          <SearchList onSelectDoc={this.selectDoc} docs={this.state.docs} />
        </div>
        <div className='pure-u-2-3'>
          <SelectedDoc doc={this.state.selected_doc} />
        </div>
      </div>
    );
  },
  handleQueryChange: function(query) {
    this.queryForDocs(query, this.state.filter);
  },
  handleFilterSelect: function(filter) {
    this.queryForDocs(this.state.query, filter);
  },
  selectDoc: function(doc) {
    this.setState({'selected_doc': doc});
  },
  queryForDocs: function(query, filter) {
    var resulting_docs = [];

    if ( query ) {
      // Use lunr.js to match docs.
      resulting_docs = window.idx.search(query).map(function(result) {
        return window.doc_dict[ result.ref ];
      });
    } else {
      // Be sure that all docs are considered for filter
      resulting_docs = window.docs;
    }

    if ( filter ) {
      resulting_docs = resulting_docs.filter(function(doc) {
        return doc.code.match(filter);
      });
    }

    if ( ! ( query || filter ) ) {
      resulting_docs = window.default_docs;
    }

    this.setState({
      'docs': resulting_docs,
      'query': query,
      'filter':filter
    });
  }
});
