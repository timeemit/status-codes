window.SelectedDoc = React.createClass({
  getInitialState(){
    return {
      'tip': { 'deactivate': function() {} }
    }
  },
  render: function(){
    var doc = this.props.doc;
    if ( doc ) {
      var code_class = this.codeClass();
      var contents = (
        <div className='SelectedDoc'>
          <span className='js-header'>
            <h2 className='header-2'> 
              <div className='disc-wrapper centered-text'>
                <div className={'class-' + code_class + 'xx disc'}></div>
              </div> 
              <span className='text'>
                {doc.code} {doc.phrase}
              </span>
            </h2>
          </span>
          <div id='result' className='larger-text'> {doc.description} </div>
        </div>
      )
    } else {
      var contents = (
        <div className='SelectedDoc'>
          <h2 id='search' className='empty-state'> { '\u2190' } Search</h2>
          <h2 id='filter' className='empty-state'> { '\u2190' } Filter</h2>
          <h2 id='select' className='empty-state'> { '\u2190' } Select</h2>
        </div>
      )
    }
    return contents;
  },
  codeClass: function() {
    return Math.floor( +this.props.doc.code / 100 );
  },
  componentWillUpdate(next_props, next_state) {
    // Cleanup lingering opentip
    if ( this.props.doc ) {
      var node = $(this.getDOMNode()).children('.js-header')
      node.data().opentips[0].deactivate();
      delete(node.data().opentips);
    }
  },
  componentDidUpdate: function() {
    // Opentip
    if ( this.props.doc ) {
      var node = $(this.getDOMNode()).children('.js-header');
      var opts = { style: this.codeClass() };
      new Opentip( node, opts );
    }
  }
});
