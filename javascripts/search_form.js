window.SearchForm = React.createClass({
  render: function() {
    return (
      <form className='searchForm search-box pure-form centered'>
        <input className='pure-input-1' type='text' placeholder='Search' onChange={this.handleChange} />
      </form>
    );
  },
  handleChange: function(e) {
    this.props.onQueryChange(e.target.value )
  }
});
