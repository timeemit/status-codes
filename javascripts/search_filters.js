window.SearchFilters = React.createClass({
  getInitialState: function(){
   return { 'chosen': null };
  },
  render: function() {
    var _this = this;
    buttons = [1,2,3,4,5].map(function(i){
      var chosen = _this.state.chosen == i;
      return (
        <div key={i} className='pure-u-1-5 centered-text' >
          <DiscButton chosen={chosen} choose={_this.handleChoice} code_class={i} />
        </div>
      );
    });
    return (
      <div className='code-classes pure-g'>
        {buttons}
      </div>
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
