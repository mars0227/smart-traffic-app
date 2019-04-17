import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import NotificationListener from '../components/NotificationListener';
import ImageIcon from '../components/ImageIcon';
import styles from '../styles';
import WebSocketService from '../components/WebSocketService';

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
      page: 'ManageReservations'
    },
    camera: {
      title: 'Camera',
      name: 'device-camera-video',
      type: 'octicon',
      backgroundColor: 'darksalmon',
      page: 'MonitorView'
    }
  },
  Staff: {
    reservations: {
      title: 'Reservations',
      name: 'th-list',
      type: 'font-awesome',
      backgroundColor: 'royalblue',
      page: 'WeekCalendar'
    },
    camera: {
      title: 'Camera',
      name: 'device-camera-video',
      type: 'octicon',
      backgroundColor: 'darksalmon',
      page: 'MonitorView'
    }
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigatorListener: null
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ menuButton: this.menuButton() });
  }

  componentDidUpdate() {
    const { ok } = this.props.login;
    if (!ok) {
      this.handleLogout();
    }
  }

  handleLogout = () => {
    this.props.navigation.replace('Login');
  }

  menuButton = () => (
    <Icon
      color='white'
      name='more-vert'
      onPress={this.props.navigation.openDrawer}
    />
  );

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Smart Traffic Management',
      headerRight: navigation.getParam('menuButton')
    }
  };

  onFunctionPress = (pageName) => {
    pageName && this.props.navigation.navigate(pageName);
  };

  render() {
    const { identity = 'Manager' } = this.props.login.userInfo;
    const functions = activeFunc[identity];

    return (
      <View style={styles.twoColumeContainer}>
        <NotificationListener />
        <WebSocketService />
        {Object.keys(functions).map(keys => <ImageIcon
          name={functions[keys].name}
          type={functions[keys].type}
          title={functions[keys].title}
          backgroundColor={functions[keys].backgroundColor}
          style={styles.twoColumeElement}
          key={keys}
          onPress={() => this.onFunctionPress(functions[keys].page)} />)}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);