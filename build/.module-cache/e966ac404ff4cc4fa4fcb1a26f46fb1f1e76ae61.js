window.SearchFilters = React.createClass({displayName: "SearchFilters",
  getInitialState: function(){
   return { 'chosen': null };
  },
  render: function() {
    var _this = this;
    buttons = [1,2,3,4,5].map(function(i){
      var chosen = _this.state.chosen == i;
      return (
        React.createElement("div", {key: i, className: "pure-u-1-5 centered-text"}, 
          React.createElement(DiscButton, {chosen: chosen, choose: _this.handleChoice, code_class: i})
        )
      );
    });
    return (
      React.createElement("div", {className: "code-classes pure-g"}, 
        buttons
      )
    );
  },
  handleChoice(chosen){
    this.setState({'chosen': chosen});
    if ( chosen ) {
      var regex_filter = new RegExp( '^' + chosen + '\\d\\d$' );
    } else {
      var regex_filter = null;
    }
    this.props.onFilterSelect(regex_filter);
  }
})
