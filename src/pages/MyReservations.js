import React from 'react';
import { StyleSheet, Text, Picker, TextInput, StatusBar, Button, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import {
  getMyReservationsAction,
  getConstructionsAction,
  setMyReservationFilterAction
} from '../actions';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements';

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
  identity: state.identity,
  login: state.login,
  myReservations: state.myReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetMyReservations: payload => dispatch(getMyReservationsAction(payload)),
  handleGetConstruction: () => dispatch(getConstructionsAction()),
  handleSetMyReservationFilter: payload => dispatch(setMyReservationFilterAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyReservations)