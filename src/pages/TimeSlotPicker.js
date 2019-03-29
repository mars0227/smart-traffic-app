import React from 'react';
import { connect } from 'react-redux';
import { selectTimeSlotAction } from '../actions';
import SelectList from '../components/SelectList';

const timeSlot = [
  '8:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00'
];

class TimeSlotPicker extends React.Component {
  static navigationOptions = { title: 'Select Time Slot' };

  handleTImeSlotChange(index) {
    const { handleSelectTimeSlot, navigation } = this.props;
    handleSelectTimeSlot(timeSlot[index]);
    navigation.goBack();
  }

  render() {
    return (
      <SelectList list={timeSlot} onPress={this.handleTImeSlotChange.bind(this)} />
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  handleSelectTimeSlot: timeSlot => dispatch(selectTimeSlotAction(timeSlot))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeSlotPicker)