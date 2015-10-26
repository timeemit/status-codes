window.SearchForm = React.createClass({displayName: "SearchForm",
  render: function() {
    return (
      React.createElement("form", {className: "searchForm search-box pure-form centered"}, 
        React.createElement("input", {className: "pure-input-1", type: "text", placeholder: "Search", onChange: this.handleChange})
      )
    );
  },
  handleChange: function(e) {
    this.props.onQueryChange(e.target.value )
  }
});
