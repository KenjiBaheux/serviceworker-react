var Disruption = React.createClass({
  render: function () {
    return (
      <div className="disruption">
        <h2 className="disruptionText">
          {this.props.text}
        </h2>
        <span />
      </div>
    );
  }
});

var DisruptionBox = React.createClass({
  loadDisruptionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'xml',
      method: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDisruptionsFromServer();
    setInterval(this.loadDisruptionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="disruptionBox">
        <h1>Disruptions</h1>
        <DisruptionList data={this.state.data} />
      </div>
    );
  }
});

var DisruptionList = React.createClass({
  render: function() {
    var disruptionNodes = this.props.data.map(function(disruption, index) {
      return (
        <Disruption station={disruption.station} key={index}>
          {disruption.text}
        </Disruption>
      );
    });
    return (
      <div className="disruptionList">
        {disruptionNodes}
      </div>
    );
  }
});

React.render(
  <DisruptionBox url='http://cors-io.herokuapp.com/cloud.tfl.gov.uk/TrackerNet/stationStatus' pollInterval={20000} />,
  document.getElementById('content')
);
