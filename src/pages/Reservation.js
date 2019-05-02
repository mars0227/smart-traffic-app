import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux'
import {
  updateReservationAction
} from '../actions';
import { ListItem } from 'react-native-elements';
import ImageView from '../components/ImageView';
import { route } from '../apis/api';
import styles from '../styles';
import i18n from '../constants/i18n';

const reservationStateMapping = {
  1: 'Created',
  2: 'Accepted',
  3: 'Refused',
  4: 'Canceled'
};

const pictureUrl = route;

class Reservation extends React.Component {
  getButtonTitle = () => {
    const { reservation } = this.props;
    const { state } = reservation.data;

    switch (reservationStateMapping[state]) {
      case 'Accepted':
        return i18n.t('accepted');
      case 'Refused':
        return i18n.t('refused');
      case 'Canceled':
        return i18n.t('canceled');
      default:
        return i18n.t('error');
    }
  }

  handleChangeState = payload => {
    const { reservation, login } = this.props;
    const { userId } = login.userInfo;
    this.props.handleUpdateReservation({
      state: payload,
      reservationId: reservation.data.reservation_id,
      userId
    });  //update state when get update succcess
  }

  accept() {
    this.handleChangeState('Accepted');
  }

  refuse() {
    this.handleChangeState('Refused');
  }

  cancel() {
    this.handleChangeState('Canceled');
  }

  acceptButton = () => (
    <Button
      style={{ flex: 1 }}
      color='royalblue'
      onPress={() => this.accept()}
      title={i18n.t('accept')}
    />
  );

  refuseButton = () => (
    <Button
      style={{ flex: 1 }}
      color='red'
      onPress={() => this.refuse()}
      title={i18n.t('refuse')}
    />
  );

  cancelButton = () => (
    <Button
      color='red'
      onPress={() => this.cancel()}
      title={i18n.t('cancel')}
    />
  );

  statusButton = () => (
    <Button
      disabled
      onPress={() => {}}
      title={this.getButtonTitle()}
    />
  );

  getButton = () => {
    const { reservation, login } = this.props;
    const { identity } = login.userInfo;
    const { state } = reservation.data;

    if (reservationStateMapping[state] === 'Created') {
        return identity === 'Manager'
          ? (<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {this.acceptButton()}
            {this.refuseButton()}
          </View>)
          : this.cancelButton();    
    }
    return this.statusButton();
  }

  getBadge = payload => {
    const { login, allReservations } = this.props;
    const { identity } = login.userInfo;
    if (identity === 'Manager' && payload) {
      const { timeSlot = null, date = null} = payload;

      const filteredArray = allReservations.data.filter(
        reservation =>
          (reservation.date === date
            && reservation.time_slot === timeSlot
            && reservationStateMapping[reservation.state] === 'Accepted')
      );

      return {
        value: filteredArray.length,
        status: 'primary'
      };
    }

    return null;
  }

  getLocation = constructionId => {
    const { constructions } = this.props;
    return constructions[constructionId - 1];
  }

  render() {
    const { reservation } = this.props;
    const {
      date,
      construction_id,
      time_slot: timeSlot,
      license_plate_number: licensePlateNumber,
      material,
      images
    } = reservation.data;
    const imageUrls = images.length > 0 && images.map(fileName => `${pictureUrl}/${fileName}`);
    const badge = this.getBadge({ date, timeSlot });
    const bookedInfo = badge
      ? {
        rightTitle: i18n.t('booked'),
        badge
      }
      : {};

    const inputList = [
      {
        title: i18n.t('location'),
        subtitle: this.getLocation(construction_id)
      },
      {
        title: i18n.t('date'),
        subtitle: date
      },
      {
        title: i18n.t('timeSlot'),
        subtitle: timeSlot,
        ...bookedInfo
      },
      {
        title: i18n.t('licensePlateNumber'),
        subtitle: licensePlateNumber
      },
      {
        title: i18n.t('materials'),
        subtitle: material
      },
    ];

    return (
      <View style={customStyles.container}>
        <View style={customStyles.list} >
          {inputList.map((item, index) =>
            <ListItem
              {...item}
              key={index}
              style={customStyles.listItem}
              subtitle={item.subtitle}
              subtitleStyle={styles.listItemSubtitle}
            />
          )}
          {imageUrls &&
            <ImageView
              deleteButtonDisabled
              style={customStyles.image}
              urls={imageUrls}
            />
          }
        </View>
        <View style={customStyles.button}>
          {this.getButton()}
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
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
  listItem: {
    height: 50,
    margin: 5
  },
  image: {
    width: 120,
    height: 80,
    margin: 5
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  allReservations: state.allReservations,
  reservation: state.reservation,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleUpdateReservation: payload => dispatch(updateReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservation)