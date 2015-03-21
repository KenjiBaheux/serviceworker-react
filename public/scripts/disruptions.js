var stationDisruption = React.createClass({
  render: function () {
    return (
      <div className="disruption">
        <h2 className="disruptionText">
          {this.props.station} - {this.props.status}
        </h2>
        <span />
      </div>
    );
  }
});

var lineDisruption = React.createClass({
  render: function () {
    return (
      <div className="disruption">
        <h2 className="disruptionText">
          {this.props.stationFrom} - {this.props.stationTo} - {this.props.status}
        </h2>
        <span />
      </div>
    );
  }
});

var LineDisruptionBox = React.createClass({
  loadLineDisruptionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'xml',
      method: 'GET',
      success: function(xmldoc) {
        var lineDisruptions = $('LineStatus', xmldoc).map(function() {
          return {
            stationTo: $('StationTo', this).attr('Name'),
            stationFrom: $('StationFrom', this).attr('Name'),
            status: $('Status', this).attr('Description'),
            active: $('Status', this).attr('IsActive') == 'true',
            statusType: $('StatusType', this).attr('Description')
          }
        }).get();
        this.setState({data: lineDisruptions});
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
    this.loadLineDisruptionsFromServer();
    setInterval(this.loadLineDisruptionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="lineDisruptionBox">
        <h1>Line Disruptions</h1>
        <lineDisruptionList data={this.state.data} />
      </div>
    );
  }
});

var StationDisruptionBox = React.createClass({
  loadStationDisruptionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'xml',
      method: 'GET',
      success: function(xmldoc) {
        var stationDisruptions = $('StationStatus', xmldoc).map(function() {
          return {
            station: $('Station', this).attr('Name'),
            status: $('Status', this).attr('Description'),
            active: $('Status', this).attr('IsActive') == 'true',
            statusType: $('StatusType', this).attr('Description')
          }
        }).get();
        this.setState({data: stationDisruptions});
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
    this.loadStationDisruptionsFromServer();
    setInterval(this.loadStationDisruptionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="stationDisruptionBox">
        <h1>Station Disruptions</h1>
        <stationDisruptionList data={this.state.data} />
      </div>
    );
  }
});

var stationDisruptionList = React.createClass({
  render: function() {
    var disruptionNodes = this.props.data.map(function(disruption, index) {
      return (
        <stationDisruption station={disruption.station} key={index} status={disruption.status} />
      );
    });
    return (
      <div className="stationDisruptionList">
        {disruptionNodes}
      </div>
    );
  }
});

var lineDisruptionList = React.createClass({
  render: function() {
    var disruptionNodes = this.props.data.map(function(disruption, index) {
      return (
        <lineDisruption stationTo={disruption.stationTo} stationFrom={disruption.stationFrom} key={index} status={disruption.status} />
      );
    });
    return (
      <div className="lineDisruptionList">
        {disruptionNodes}
      </div>
    );
  }
});

React.render(
  <LineDisruptionBox url='http://cors-io.herokuapp.com/cloud.tfl.gov.uk/TrackerNet/lineStatus/incidentsonly' pollInterval={30000} />,
  document.getElementById('content')
);
React.render(
  <StationDisruptionBox url='http://cors-io.herokuapp.com/cloud.tfl.gov.uk/TrackerNet/stationStatus/incidentsonly' pollInterval={30000} />,
  document.getElementById('content2')
);
