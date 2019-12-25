const padList = [
  {
    letter: "Q",
    sound: "BANG",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    keyCode: 81,
    color: "yellow"
  },
  {
    letter: "W",
    sound: "BOOM",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyCode: 87,
    color: "orange"
  },
  {
    letter: "E",
    sound: "SLOSH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    keyCode: 69,
    color: "red"
  },
  {
    letter: "A",
    sound: "VROOM",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyCode: 65,
    color: "fuchsia"
  },
  {
    letter: "S",
    sound: "CLAP",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    keyCode: 83,
    color: "#9933ff"
  },
  {
    letter: "D",
    sound: "PING",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyCode: 68,
    color: "blue"
  },
  {
    letter: "Z",
    sound: "PLOP",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyCode: 90,
    color: "#0099cc"
  },
  {
    letter: "X",
    sound: "KNOCK",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    keyCode: 88,
    color: "#009933"
  },
  {
    letter: "C",
    sound: "CHING",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyCode: 67,
    color: "brown"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundName: "",
      fontColor: "lightgrey"
    };
    this.playAudioWithButton = this.playAudioWithButton.bind(this);
    this.playAudioWithKey = this.playAudioWithKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.playAudioWithKey);
    document.addEventListener("keyup", this.resetButton);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.playAudioWithKey);
  }

  playAudioWithButton(e) {
    var x = document.getElementById(e.target.innerText);
    x.play();
    this.setState({
      soundName: e.target.id,
      fontColor: e.target.style.backgroundColor
    });
  }

  playAudioWithKey(e) {
    var padListItem = padList.find(x => x.keyCode === e.keyCode);
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

  resetButton(e) {
    var padListItem = padList.find(x => x.keyCode === e.keyCode);
    var y = document.getElementById(padListItem.sound);
    $("#" + y.id).css({
      "box-shadow": "0 3px #666",
      transform: "translateY(-2px)"
    });
  }

  render() {
    return (
      <div>
        <Display text={this.state.soundName} color={this.state.fontColor} />
        <Buttons onClick={this.playAudioWithButton} />
      </div>
    );
  }
}

const Display = props => {
  return (
    <div id="display" style={{ color: props.color }}>
      {props.text}
    </div>
  );
};

const Buttons = props => {
  return (
    <div id="buttons">
      {padList.map((item, index) => (
        <div
          className="drum-pad"
          id={item.sound}
          onClick={props.onClick}
          style={{ backgroundColor: item.color }}
          key={index}
        >
          {" "}
          {item.letter}{" "}
          <audio className="clip" id={item.letter} src={item.url}></audio>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("drum-machine"));
