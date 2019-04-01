import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { getMonitorViewAction } from '../actions';
import { route } from '../apis/api';
import styles from '../styles';
import { Text } from 'react-native-elements';
import AutoFitImage from '../components/AutoFitImage';

const pictureUrl = route;

class MonitorView extends React.Component {
  componentDidMount() {
    this.props.handleGetMonitorView();
  }

  render() {
    const {
      carNumber, image
    } = this.props.monitor;
    const uri = `${pictureUrl}/${image}`;

    return (
      <View style={styles.container} >
        <AutoFitImage
          uri={uri}
        />
        <Text h4>{`car number: ${carNumber}`}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  monitor: state.monitor
});

const mapDispatchToProps = dispatch => ({
  handleGetMonitorView: data => dispatch(getMonitorViewAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorView);