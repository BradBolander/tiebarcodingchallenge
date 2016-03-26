$( document ).ready(function() {
  $('#render-toggle').click(function(){
    $('#tie-render').toggle(500);
    $('#hint').toggle(500);
  });
  $('#container').addClass('magictime puffIn');
  $('#render-toggle').show();
  $('#render-toggle').addClass('magictime puffIn');
});

var TiesContainer = React.createClass({
  componentDidMount: function() {
    this.loadData();
  },
  loadData: function() {
    $.ajax({
      type: 'GET',
      url: "/javascripts/ties.json",
      dataType: 'json',
      cache: 'false',
      async: false,
      complete: function(obj) {
        console.log(obj.responseJSON.ties);
        this.setState({data: obj.responseJSON.ties});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div id="app">
      <TieRender/>
      <p className="block-title">NECKTIES</p>
      <TiesGrid data={this.state.data} />
      </div>
    );
  }
});

var TiesGrid = React.createClass({
  render: function() {
    var tieGrid = this.props.data.map(function(tie, index) {
      console.log(tie);
      return (
        <Tie title={tie.title} color={tie.color} url={tie.url} key={tie.id} />
      );
    });
    return (
      <div id="tiesContainer" >
          { tieGrid }
      </div>
    );
  }
});

var Tie = React.createClass({
  render: function() {
    return (
      <div className="tie-block">
        <img className="tie-image" src={this.props.url} ></img>
        <div className="title-backdrop">
          <p className="tie-color muted">{this.props.color}</p>
          <h4 className="tie-title">{this.props.title}</h4>
        </div>
      </div>
    )
  }
});

var TieRender = React.createClass({
  render: function() {
    return (
      <div className="tie-render">

      </div>
    )
  }
});

ReactDOM.render(
  <TiesContainer/>,
  document.getElementById('container')
);
