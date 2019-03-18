import React from 'react';
import { StyleSheet, Button, TextInput, StatusBar, DatePickerAndroid, View } from 'react-native';
import { connect } from 'react-redux'
import {
  getConstructionsAction,
  setReservationAction
} from '../actions';
import { ListItem, Input, Text } from 'react-native-elements';
import { isEmpty } from '../utils/utils';

const inputList = [
  {
    title: 'Location',
    page: 'SelectLocation'
  },
  {
    title: 'Date',
    page: 'DatePicker'
  },
  {
    title: 'Time Slot',
    page: 'TimeSlotPicker'
  },
  {
    title: 'License plate number',
    page: 'LicensePlateNumberInput'
  },
  {
    title: 'Materials',
    page: 'MaterialInput'
  },
];

class CreateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisable: true
    }
    this.dataCheck = this.dataCheck.bind(this);
  }

  static navigationOptions = {
    title: 'New Reservation',
  };

  componentDidMount() {
    this.props.handleGetConstruction();
  }

  dataCheck() {
    const {
      location,
      date,
      timeSlot,
      licensePlateNumber,
      material } = this.props.createReservation;
    const { userId: createrId } = this.props.login.userInfo;

    const payload = {
      createrId,
      construction: location,
      date,
      timeSlot,
      licensePlateNumber,
      material
    };

    if (isEmpty(payload)) {
      console.warn('some data is empty!');
    } else {
      this.props.handleCreateReservation(payload);
    }
  }

  getSubtitle = title => {
    const { location, date, timeSlot, licensePlateNumber, material } = this.props.createReservation;
    switch (title) {
      case 'Location':
        return location;
      case 'Date':
        return date;
      case 'Time Slot':
        return timeSlot;
      case 'License plate number':
        return licensePlateNumber;
      case 'Materials':
        return material;
      default:
        return '';
    }
  }

  render() {
    return (
      <View>
        {inputList.map((item, index) =>
          <ListItem
            key={index}
            title={item.title}
            style={{height: 50}}
            chevron
            subtitle={this.getSubtitle(item.title)}
            onPress={() => this.props.navigation.navigate(item.page)}
          />
        )}
        <Button
          color='royalblue'
          onPress={() => this.dataCheck()}
          title="Submit"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  createReservation: state.createReservation
});

const mapDispatchToProps = dispatch => ({
  handleGetConstruction: () => dispatch(getConstructionsAction()),
  handleCreateReservation: payload => dispatch(setReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReservation)