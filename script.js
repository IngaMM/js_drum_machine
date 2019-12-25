var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var padList = [{
  letter: "Q",
  sound: "BANG",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  keyCode: 81,
  color: "yellow"
}, {
  letter: "W",
  sound: "BOOM",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  keyCode: 87,
  color: "orange"
}, {
  letter: "E",
  sound: "SLOSH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  keyCode: 69,
  color: "red"
}, {
  letter: "A",
  sound: "VROOM",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  keyCode: 65,
  color: "fuchsia"
}, {
  letter: "S",
  sound: "CLAP",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  keyCode: 83,
  color: "#9933ff"
}, {
  letter: "D",
  sound: "PING",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  keyCode: 68,
  color: "blue"
}, {
  letter: "Z",
  sound: "PLOP",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  keyCode: 90,
  color: "#0099cc"
}, {
  letter: "X",
  sound: "KNOCK",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  keyCode: 88,
  color: "#009933"
}, {
  letter: "C",
  sound: "CHING",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  keyCode: 67,
  color: "brown"
}];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      soundName: "",
      fontColor: "lightgrey"
    };
    _this.playAudioWithButton = _this.playAudioWithButton.bind(_this);
    _this.playAudioWithKey = _this.playAudioWithKey.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.playAudioWithKey);
      document.addEventListener("keyup", this.resetButton);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this.playAudioWithKey);
    }
  }, {
    key: "playAudioWithButton",
    value: function playAudioWithButton(e) {
      var x = document.getElementById(e.target.innerText);
      x.play();
      this.setState({
        soundName: e.target.id,
        fontColor: e.target.style.backgroundColor
      });
    }
  }, {
    key: "playAudioWithKey",
    value: function playAudioWithKey(e) {
      var padListItem = padList.find(function (x) {
        return x.keyCode === e.keyCode;
      });
      var x = document.getElementById(padListItem.letter);
      x.play();
      this.setState({
        soundName: padListItem.sound,
        fontColor: padListItem.color
      });
      var y = document.getElementById(padListItem.sound);
      $("#" + y.id).css({
        "box-shadow": "0 1px #666",
        transform: "translateY(2px)"
      });
    }
  }, {
    key: "resetButton",
    value: function resetButton(e) {
      var padListItem = padList.find(function (x) {
        return x.keyCode === e.keyCode;
      });
      var y = document.getElementById(padListItem.sound);
      $("#" + y.id).css({
        "box-shadow": "0 3px #666",
        transform: "translateY(-2px)"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Display, { text: this.state.soundName, color: this.state.fontColor }),
        React.createElement(Buttons, { onClick: this.playAudioWithButton })
      );
    }
  }]);

  return App;
}(React.Component);

var Display = function Display(props) {
  return React.createElement(
    "div",
    { id: "display", style: { color: props.color } },
    props.text
  );
};

var Buttons = function Buttons(props) {
  return React.createElement(
    "div",
    { id: "buttons" },
    padList.map(function (item, index) {
      return React.createElement(
        "div",
        {
          className: "drum-pad",
          id: item.sound,
          onClick: props.onClick,
          style: { backgroundColor: item.color },
          key: index
        },
        " ",
        item.letter,
        " ",
        React.createElement("audio", { className: "clip", id: item.letter, src: item.url })
      );
    })
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById("drum-machine"));