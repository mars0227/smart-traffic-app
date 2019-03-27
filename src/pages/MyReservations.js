import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import {
  getMyReservationsAction,
  getConstructionsAction,
  setMyReservationFilterAction,
  cleanCreateReservationAction
} from '../actions';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements';
import NotificationListener from '../components/NotificationListener';

class MyReservations extends React.Component {
  static navigationOptions = {
    title: 'My Reservations',
  };

  componentDidMount() {
    const { userId } = this.props.login.userInfo;
    this.props.handleGetMyReservations({ userId });
    const { constructions } = this.props;
    if (constructions.length === 0) this.props.handleGetConstruction();
  }

  componentDidUpdate() {
    const { createReservation } = this.props;
    const { userId } = this.props.login.userInfo;

    if (createReservation.ok) {
      this.props.handleGetMyReservations({ userId });
      this.props.handleCleanCreateReservation();
    }
  }

  handleCreateReservation = () => {
    this.props.navigation.navigate('CreateReservation');
  }

  handleSelectConstruction = construction => {
    this.props.handleSetMyReservationFilter(construction);
    this.props.navigation.navigate('MyReservationInConstruction');
  };

  render() {
    const { myReservations, constructions } = this.props;
    const locationList = myReservations.data.map(item => item.construction_id).reduce(
      (array, id) => array.includes(id) ?  array : [...array, id], []);

    return (
      <View style={styles.container}>
        <NotificationListener />
        {locationList.map((item, index) =>
          <ListItem
            key={index}
            title={constructions[item - 1]}
            style={{ height: 50 }}
            chevron
            onPress={() => this.handleSelectConstruction(constructions[item - 1])}
          />
        )}
        <ActionButton
          buttonColor='royalblue'
          onPress={this.handleCreateReservation}
          verticalOrientation='up'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  myReservations: state.myReservations,
  constructions: state.constructions,
  createReservation: state.createReservation
});

const mapDispatchToProps = dispatch => ({
  handleGetMyReservations: payload => dispatch(getMyReservationsAction(payload)),
  handleGetConstruction: () => dispatch(getConstructionsAction()),
  handleSetMyReservationFilter: payload => dispatch(setMyReservationFilterAction(payload)),
  handleCleanCreateReservation: () => dispatch(cleanCreateReservationAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyReservations)