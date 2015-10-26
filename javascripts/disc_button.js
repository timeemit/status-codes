window.DiscButton = React.createClass({
  render: function() {
    var wrapper_class = 'disc-wrapper centered';
    var cls = 'disc class-' + this.props.code_class + 'xx';
    if ( this.props.chosen ) wrapper_class += ' chosen';

    return (
      <div className={wrapper_class} onClick={this.handleClick}>
        <div className={cls}></div>
      </div> 
    )
  },
  handleClick: function(e) {
    if ( this.props.chosen ) {
      this.props.choose(null);
    } else {
      this.props.choose(this.props.code_class);
    }
  },
  componentDidMount: function(){
    var node = $(this.getDOMNode());
    var opts = { style: this.props.code_class };
    Opentip.styles[this.props.code_class] = {
      target: true, 
      tipJoint: 'top left', 
      background: '#FFECB3',
      ajax: '/lib/classes/' + this.props.code_class + 'xx.txt',
      delay: 0
    };
    new Opentip( node, opts );
  }
})
