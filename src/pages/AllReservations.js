import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import {
  getAllReservationsAction,
  setAllReservationsShowingReservationIdAction,
  getConstructionsAction
} from '../actions';
import { connect } from 'react-redux'
import {
  ListItem,
  Divider
} from 'react-native-elements';

class AllReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static navigationOptions = {
    title: 'Reservations',
  };

  componentDidMount() {
    this.props.handleGetConstructions();
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
      <ScrollView>
        {allReservations.data.map((item, index) =>
          <View key={index}>
            <ListItem
              key={index}
              title={constructions[item.construction_id - 1]}
              style={{height: 50}}
              chevron
              subtitle={`${item.date} ${item.time_slot} ${item.creater_name} ${item.material}`}
              onPress={() => this.handleSelectReservation(item.reservation_id)}
            />
            <Divider />
          </View>
        )}
      </ScrollView>
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
  allReservations: state.allReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetConstructions: () => dispatch(getConstructionsAction()),
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload)),
  handleSetAllReservationsShowingReservationId: payload => dispatch(setAllReservationsShowingReservationIdAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllReservations)