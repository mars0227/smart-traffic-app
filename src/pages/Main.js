import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageIcon from '../components/ImageIcon';
import { connect } from 'react-redux'

const activeFunc = {
  Vendor: {
    myReservations: {
      title: 'MyReservations',
      name: 'truck',
      type: 'font-awesome',
      backgroundColor: 'yellowgreen',
      page: 'MyReservations'
    }
  },
  Manager: {
    reservations: {
      title: 'Reservations',
      name: 'th-list',
      type: 'font-awesome',
      backgroundColor: 'royalblue',
      page: 'AllReservations'
    },
    camera: {
      title: 'Camera',
      name: 'device-camera-video',
      type: 'octicon',
      backgroundColor: 'darksalmon',
    }
  }
};

class Main extends React.Component {

  static navigationOptions = {
    title: 'Smart Traffic Management',
  };

  onFunctionPress = (pageName) => {
    pageName && this.props.navigation.navigate(pageName);
  };

  handleLogout = () => {

  };

  render() {
    const { identity } = this.props.login.userInfo;
    const functions = activeFunc[identity];

    return (
      <View style={styles.container}>
        {Object.keys(functions).map(keys => <ImageIcon
          name={functions[keys].name}
          type={functions[keys].type}
          title={functions[keys].title}
          backgroundColor={functions[keys].backgroundColor}
          key={keys}
          onPress={() => this.onFunctionPress(functions[keys].page)} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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