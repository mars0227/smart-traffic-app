import { View, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { selectTimeSlotAction } from '../actions';

const timeSlot = [
  '8:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00'
];

class TimeSlotPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlotIndex: 0
    };

    this.setDate = this.handleTImeSlotChange.bind(this);
  }

  handleTImeSlotChange(index) {
    this.setState({ timeSlotIndex: index });
    this.props.handleSelectTimeSlot(timeSlot[index]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          mode='dropdown'
          selectedValue={timeSlot[this.state.timeSlotIndex]}
          onValueChange={(itemValue, itemIndex) =>
            this.handleTImeSlotChange(itemIndex)
          }
        >
          {timeSlot.map((item, index) =>
            <Picker.Item label={item} value={item} key={index} />
          )}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  createReservation: state.createReservation
});

const mapDispatchToProps = dispatch => ({
  handleSelectTimeSlot: timeSlot => dispatch(selectTimeSlotAction(timeSlot))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeSlotPicker)