import React from 'react';
import { StyleSheet, Button, View, Image } from 'react-native';
import { connect } from 'react-redux'
import {
  getConstructionsAction,
  setReservationAction
} from '../actions';
import { ListItem, Icon, Button as RNEButton } from 'react-native-elements';
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
      buttonDisable: true,
      photos: ''
    }
    this.dataCheck = this.dataCheck.bind(this);
  }

  static navigationOptions = {
    title: 'New Reservation',
  };

  componentDidMount() {
    this.props.handleGetConstruction();
  }

  componentDidUpdate() {
    const { ok } = this.props.createReservation;
    if (ok) {
      this.props.navigation.goBack();
    }
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

  handleTakePicture = () => {
    this.props.navigation.navigate('CameraView');
  }

  render() {
    const { navigation, createReservation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {inputList.map((item, index) =>
            <ListItem
              key={index}
              title={item.title}
              style={{height: 50}}
              chevron
              subtitle={this.getSubtitle(item.title)}
              onPress={() => navigation.navigate(item.page)}
            />
          )}
          <View style={styles.pictureContainer}>
            {createReservation.pictureUri !== '' && (
              <Image
                style={styles.image}
                resizeMode='contain'
                source={{ uri: createReservation.pictureUri }}
              />)
            }
            <RNEButton
              icon={
                <Icon
                  name='photo-camera'
                  size={40} />
              }
              containerStyle={styles.image}
              buttonStyle={{ backgroundColor: 'lightgray', ...styles.image }}
              onPress={this.handleTakePicture}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            color='royalblue'
            onPress={() => this.dataCheck()}
            title="Submit"
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  list: {
    flex: 5
  },
  button: {
    flex: 1
  },
  image: {
    width: 120,
    height: 80
  },
  pictureContainer: {
    flex: 1,
    flexDirection: 'row'
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