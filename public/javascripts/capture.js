var nimbo = nimbo || {};

nimbo.capture = {
  init: function () {
    var that = this;

    that.statusContainer = document.getElementById('status');
    that.runnerContainer = document.getElementById('suite');

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
    this.runnerContainer.appendChild(runner);
  },
  _removeSuite: function () {
    this.runnerContainer.innerHTML = "";
  },
  _onSuiteMessage: function (data) {
    this._setStatus('idle');
    this._removeSuite();
    $.post('/suite_end', data);
  },
  _setStatus: function (status) {
    this._status = status;
    this.statusContainer.innerHTML = status;
  }
};

$(function () { nimbo.capture.init(); });
