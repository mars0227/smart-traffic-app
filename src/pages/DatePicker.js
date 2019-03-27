import {
  View,
  DatePickerIOS,
  StyleSheet,
  DatePickerAndroid,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { selectDateAction } from '../actions';
import NotificationListener from '../components/NotificationListener';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    if (Platform.OS !== 'ios') {
      this.showAndroidTimePicker();
    }
  }

  showAndroidTimePicker = async () => {
    const date = await DatePickerAndroid.open();
    const { day, month, year } = date;
    this.props.handleSelectDate(`${day}/${month}/${year}`);
    this.props.navigation.goBack();
  }

  getYearMonthDate = dateObject => `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()}`

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    this.props.handleSelectDate(this.getYearMonthDate(newDate));
  }

  render() {
    return (
      Platform.OS === 'ios'
        ? <View style={styles.container}>
          <NotificationListener />
          <DatePickerIOS
            mode='date'
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
        </View>
        : <NotificationListener />
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
  handleSelectDate: date => dispatch(selectDateAction(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker)