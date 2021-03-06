import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import {
  createReservationAction
} from '../actions';
import {
  ListItem,
  Icon,
  Button
} from 'react-native-elements';
import { isEmpty } from '../utils/utils';
import ImageView from '../components/ImageView';
import i18n from '../constants/i18n';

class CreateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisable: true,
      photos: '',
      isLoading: false
    }
    this.dataCheck = this.dataCheck.bind(this);
  }

  static navigationOptions = {
    title: i18n.t('newReservation'),
  };

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
      material,
      pictureUris } = this.props.createReservation;
    const { userId: createrId } = this.props.login.userInfo;

    const payload = {
      createrId,
      construction: location,
      date,
      timeSlot,
      licensePlateNumber,
      material,
      file: pictureUris.map( uri => ({
        uri,
        type: 'image/jpeg',
        name: 'reservation.jpg'
      }))
    };

    if (isEmpty(payload)) {
      console.warn('some data is empty!');
    } else {
      this.props.handleCreateReservation(payload);
      this.setState({
        isLoading: true
      })
    }
  }

  handleTakePicture = () => {
    this.props.navigation.navigate('CameraView');
  }

  render() {
    const { navigation, createReservation } = this.props;
    const { location, date, timeSlot, licensePlateNumber, material } = createReservation;
    const inputList = [
      {
        title: i18n.t('location'),
        subtitle: location,
        page: 'SelectLocation'
      },
      {
        title: i18n.t('date'),
        subtitle: date,
        page: 'DatePicker'
      },
      {
        title: i18n.t('timeSlot'),
        subtitle: timeSlot,
        page: 'TimeSlotPicker'
      },
      {
        title: i18n.t('licensePlateNumber'),
        subtitle: licensePlateNumber,
        page: 'LicensePlateNumberInput'
      },
      {
        title: i18n.t('materials'),
        subtitle: material,
        page: 'MaterialInput'
      },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {inputList.map((item, index) =>
            <ListItem
              key={index}
              title={item.title}
              style={styles.listItem}
              subtitleStyle={styles.listItemSubtitle}
              chevron
              subtitle={item.subtitle}
              onPress={() => navigation.navigate(item.page)}
            />
          )}
          <View style={styles.pictureContainer}>
            {createReservation.pictureUris.length !== 0 && (
              <View>
                <ImageView
                  style={styles.image}
                  urls={createReservation.pictureUris}
                />
              </View>
              )
              }
            <Button
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
            title={i18n.t('submit')}
            loading={this.state.isLoading}
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
    height: 80,
    margin: 10
  },
  pictureContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  listItem: {
    height: 50,
    margin: 5
  },
  listItemSubtitle: {
    color: 'slategray'
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  createReservation: state.createReservation
});

const mapDispatchToProps = dispatch => ({
  handleCreateReservation: payload => dispatch(createReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReservation)