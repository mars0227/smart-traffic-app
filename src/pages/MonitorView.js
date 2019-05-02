import {
  View,
  Switch,
  Text
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
  ListItem,
} from 'react-native-elements';
import AutoFitImage from '../components/AutoFitImage';
import i18n from '../constants/i18n';
import Divider from '../components/Divider';

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
        <View style={{ ...styles.fullWidth, backgroundColor: 'whitesmoke', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{margin: 5, fontSize: 17}}>{`${i18n.t('carNumber')}: ${carNumber}`}</Text>
        </View>
        <Divider />
        <ListItem
          style={styles.fullWidth}
          title={i18n.t('activeAlert')}
          rightElement={<Switch value={alertSwitchState} onValueChange={this.handleSwtich.bind(this)}/>}
        />
        <Divider />
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