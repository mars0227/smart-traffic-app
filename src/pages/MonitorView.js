import {
  View,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import {
  getMonitorViewAction,
  updateAlertStateAction
} from '../actions';
import { route } from '../apis/api';
import styles from '../styles';
import {
  Text,
  ListItem,
  Divider
} from 'react-native-elements';
import AutoFitImage from '../components/AutoFitImage';
import i18n from '../constants/i18n';

const pictureUrl = route;

class MonitorView extends React.Component {
  componentDidMount() {
    const { login } = this.props;
    const { userId } = login.userInfo;

    this.props.handleGetMonitorView({userId});
  }

  handleSwtich = state => {
    const { userId } = this.props.login.userInfo;
    this.props.handleUpdateAlertState({ alertSwitchState: state, userId });
  }

  render() {
    const {
      carNumber,
      image,
      alertSwitchState
    } = this.props.monitor;

    const uri = `${pictureUrl}/${image}`;

    return (
      <View style={styles.container} >
        <AutoFitImage
          uri={uri}
        />
        <Text h4>{`${i18n.t('carNumber')}: ${carNumber}`}</Text>
        <Divider/>
        <ListItem
          style={{ width: '100%', fontSize: 22 }}
          title={i18n.t('activeAlert')}
          rightElement={<Switch value={alertSwitchState} onValueChange={this.handleSwtich.bind(this)}/>}
        />
        <Divider/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  monitor: state.monitor
});

const mapDispatchToProps = dispatch => ({
  handleGetMonitorView: data => dispatch(getMonitorViewAction(data)),
  handleUpdateAlertState: data => dispatch(updateAlertStateAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorView);