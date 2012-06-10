var nimbo = nimbo || {};

nimbo.capture = {
  init: function () {
    var that = this;

    that.suiteContainer = $('#suite');
    that.statusContainer = $('#status');		

    that._status = 'idle';
    that._setStatus(that._status);

    that._pollId = setInterval(function () {
      that._getSuite();
    }, 1000);
  },
  postMessage: function (data) {
    this._onSuiteMessage(data);
  },	
  _getSuite: function () {
    var that = this;
    if (that._status === 'idle') {
      that._setStatus('polling');
      $.get('/suite_get', function (data) {
        that._onSuite(data);
      });
    };
  },
  _onSuite: function (data) {
    var suite_id = JSON.parse(data);
    if (suite_id) {
      this._setStatus('running');
      this._runSuite(suite_id);
    } else {
      this._setStatus('idle');
    }
  },
  _runSuite: function (suite_id) {
    var runner = document.createElement('iframe');
    runner.src = "/suite_runner";
    this.suiteContainer.append(runner);
  },
  _removeSuite: function () {
    this.suiteContainer.empty();
  },
  _onSuiteMessage: function (data) {
    this._setStatus('idle');
    this._removeSuite();
    $.post('/suite_end', data);
  },
  _setStatus: function (status) {
    this._status = status;
    document.getElementById('status').innerHTML = status;
//     this.statusContainer.empty();
//     this.statusContainer.text(status);
  }
};

$(function () { nimbo.capture.init(); });
