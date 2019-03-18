import React from 'react';
import { StyleSheet, Text, Picker, TextInput, StatusBar, KeyboardAvoidingView, View } from 'react-native';
import ImageIcon from '../components/ImageIcon';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux'

const activeFunc = {
  Vendor: {
    myReservations: {
      title: 'My reservations',
      img: '',
      page: 'MyReservations'
    }
  },
  Manager: {
    reservations: {
      title: 'Reservations',
      img: '',
      page: 'AllReservations'
    }
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: 'Client',
      account: '',
      password: '',
    }
  }

  static navigationOptions = {
    title: 'Smart Traffic Management',
  };

  onFunctionPress = (pageName) => {
    this.props.navigation.navigate(pageName);
  };

  handleLogout = () => {

  };

  render() {
    const { identity } = this.props.login;
    const functions = activeFunc[identity];

    return (
      <View style={styles.container}>
        {Object.keys(functions).map(keys => <ImageIcon title={functions[keys].title} key={keys} onPress={() => this.onFunctionPress(functions[keys].page)}/> )}
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
  login: state.login
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)