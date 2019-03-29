import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  getMyReservationsAction,
  setMyReservationsShowingReservationIdAction
} from '../actions';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements';

class MyReservationInConstruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleSelectReservation = reservationId => {
    this.props.handleSetMyReservationsShowingReservationId(reservationId);
    this.props.navigation.navigate('Reservation');
  };

  render() {
    const { myReservations, constructions } = this.props;
    const construction = myReservations.filterBy;
    const reservationList = myReservations.data.filter(item =>
      item.construction_id === constructions.indexOf(construction) + 1
    );

    return (
      <View>
        {reservationList.map((item, index) =>
          <ListItem
            key={index}
            title={`${item.reservation_id}`}
            style={{height: 50}}
            chevron
            subtitle={`${item.date} ${item.material}`}
            onPress={() => this.handleSelectReservation(item.reservation_id)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  myReservations: state.myReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetMyReservations: payload => dispatch(getMyReservationsAction(payload)),
  handleSetMyReservationsShowingReservationId: payload => dispatch(setMyReservationsShowingReservationIdAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyReservationInConstruction)