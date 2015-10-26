window.AppBox = React.createClass({displayName: "AppBox",
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
      React.createElement("div", {className: "appBox pure-g"}, 
        React.createElement("div", {className: "pure-u-1-3"}, 
          React.createElement(SearchForm, {onQueryChange: this.handleQueryChange}), 
          React.createElement(SearchFilters, {onFilterSelect: this.handleFilterSelect}), 
          React.createElement(SearchList, {onSelectDoc: this.selectDoc, docs: this.state.docs})
        ), 
        React.createElement("div", {className: "pure-u-2-3"}, 
          React.createElement(SelectedDoc, {doc: this.state.selected_doc})
        )
      )
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
