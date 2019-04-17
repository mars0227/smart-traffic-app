import React from 'react';
import { connect } from 'react-redux';
import { serverIp } from '../apis/api';
import {
  updateReservationByWebSocketAction,
  addReservationByWebSocketAction,
  updateMonitorViewAction
} from '../actions';

const genPayload = (type, data) => (JSON.stringify({ type, data }));

const registerAction = payload => genPayload('Register', payload);
const unRegisterAction = payload => genPayload('Disconnect', payload);

class WebSocketService extends React.Component {
  componentDidMount() {
    const { login } = this.props;
    const { userId } = login.userInfo;

    const ws = new WebSocket(`ws://${serverIp}`);
    this.ws = ws;

    ws.onopen = () => {
      const payload = { userId };
      ws.send(registerAction(payload));
    };

    ws.onmessage = (e) => {
      console.log(e.data);
      this.handleMessage(e.data);
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  }

  componentWillUnmount() {
    const { login } = this.props;
    const { userId } = login.userInfo;
    const payload = { userId };
    this.ws.send(unRegisterAction(payload));
  }

  handleMessage = message => {
    const { type, data } = JSON.parse(message);
    const {
      handleUpdateReservation,
      handleAddReservation,
      handleUpdateMonitorView
    } = this.props;

    switch (type) {
      case 'updateReservation':
        handleUpdateReservation(data);
        return;
      case 'newReservation':
        handleAddReservation(data);
        return;
      case 'updateMonitorView':
        handleUpdateMonitorView(data);
        return;
      default:
        return;
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  notification: state.notification,
  myReservations: state.myReservations,
  system: state.system
});

const mapDispatchToProps = dispatch => ({
  handleUpdateReservation: payload => dispatch(updateReservationByWebSocketAction(payload)),
  handleAddReservation: payload => dispatch(addReservationByWebSocketAction(payload)),
  handleUpdateMonitorView: payload => dispatch(updateMonitorViewAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebSocketService)