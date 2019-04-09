import React from 'react';
import {
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  View
} from 'react-native';
import {
  Text,
  Input
} from 'react-native-elements';
import { connect } from 'react-redux'
import { getAllReservationsAction } from '../actions';
import KeepInputWithTitle from '../components/KeepInputWithTitle';
import defutlStyle from '../styles';
import List from '../components/List';

class WeekCalendar extends React.Component {
  render() {
    const { account, password, identityIndex } = this.state;
    const { identities, login } = this.props;
    return (
      <View style={defutlStyle.container}>
        <Text>hihi</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  allReservations: state.allReservations,
});

const mapDispatchToProps = dispatch => ({
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekCalendar)
