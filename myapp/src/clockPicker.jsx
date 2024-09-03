import { h, Component } from "preact";
import { createRef } from "preact";
class ClockPicker extends Component {
  constructor(props) {
    super(props);
    this.timepickerRef = createRef();;
  }

  componentDidMount() {
    this.initDatepicker();
  }



  initDatepicker = () => {
    // Initialize datepicker logic here
    $(this.timepickerRef.current).clockTimePicker();
  };

  render() {
    return (
      <input
        name={this.props.name}
        className="w-full border border-gray-200"
        type="text"
        ref={this.timepickerRef}

      />
    );
  }
}

export default ClockPicker;
