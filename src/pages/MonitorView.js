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

const pictureUrl = route;

class MonitorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchState: false
    }
  }

  componentDidMount() {
    const { login } = this.props;
    const { userId } = login.userInfo;

    this.props.handleGetMonitorView({userId});
  }

  componentDidUpdate(prevProps) {
    const { alertSwitchState: alertSwitchStatePrev } = prevProps.monitor;
    const {
      alertSwitchState: alertSwitchStateNow
    } = this.props.monitor;

    if (alertSwitchStatePrev !== alertSwitchStateNow) {
      const { switchState } = this.state;

      if (alertSwitchStateNow !== switchState) {
        this.setState({
          switchState: alertSwitchStateNow
        });
      }
    }
  }

  handleSwtich = state => {
    this.setState({
      switchState: state
    });
    this.props.handleUpdateAlertState({ alertSwitchState: state });
  }

  render() {
    const {
      carNumber,
      image,
    } = this.props.monitor;
    const { switchState } = this.state;

    const uri = `${pictureUrl}/${image}`;

    return (
      <View style={styles.container} >
        <AutoFitImage
          uri={uri}
        />
        <Text h4>{`car number: ${carNumber}`}</Text>
        <Divider/>
        <ListItem
          style={{ width: '100%', fontSize: 22 }}
          title={'Active Alert'}
          rightElement={<Switch value={switchState} onValueChange={this.handleSwtich.bind(this)}/>}
        />
        <Divider/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
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