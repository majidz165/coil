import { h, Component } from "preact";
import { useRef } from "preact/hooks";
class ClockPicker extends Component {
  constructor(props) {
    super(props);
    this.timepickerRef = useRef(null);
  }

  componentDidMount() {
    this.initDatepicker();
  }

  handleChange = (e) => {
    // Handle change logic here
  };

  initDatepicker = () => {
    // Initialize datepicker logic here
    // $(this.timepickerRef).clockTimePicker();
    console.log(this.timepickerRef.current);
  };

  render() {
    return (
      <div class="clock-picker">
        <input
          className="timepicker"
          type="text"
          ref={this.timepickerRef}
          onBlur={this.handleChange}
        />
      </div>
    );
  }
}

export default ClockPicker;
