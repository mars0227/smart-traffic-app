import React from 'react';
import { StyleSheet, Text, Picker, TextInput, StatusBar, KeyboardAvoidingView, View } from 'react-native';
import {
  getAllReservationsAction,
  setAllReservationsShowingReservationIdAction
} from '../actions';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements';

class AllReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.handleGetAllReservations();
    // TODO: getAllReservation
  }

  handleSelectReservation = reservationId => {
    this.props.handleSetAllReservationsShowingReservationId(reservationId);
    this.props.navigation.navigate('Reservation');
  };

  render() {
    const { allReservations, constructions } = this.props;

    return (
      <View>
        {allReservations.data.map((item, index) =>
          <ListItem
            key={index}
            title={constructions[item.construction_id - 1]}
            style={{height: 50}}
            chevron
            subtitle={`${item.date} ${item.timeSlot} ${item.creater_id} ${item.material}`}
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
  identity: state.identity,
  login: state.login,
  allReservations: state.allReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload)),
  handleSetAllReservationsShowingReservationId: payload => dispatch(setAllReservationsShowingReservationIdAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllReservations)