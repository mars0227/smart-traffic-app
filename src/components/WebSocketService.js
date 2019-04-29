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
const checkHealthAction = payload => genPayload('Health', payload);

class WebSocketService extends React.Component {
  componentDidMount() {
    this.connectWebSocket();
  }

  componentWillUnmount() {
    const { login } = this.props;
    const { userId } = login.userInfo;
    const payload = { userId };
    this.ws.send(unRegisterAction(payload));
  }

  componentDidUpdate(prevProps) {
    const {
      system,
      login,
    } = this.props;
    const { userId } = login.userInfo;
    const payload = { userId };
    const { appState: preAppState } = prevProps.system;
    const { appState } = system;
    if (preAppState !== appState && appState === 'active') {
      console.log('Go to foreground. Checking web socket health.');
      try {
        this.ws.send(checkHealthAction(payload));
        this.checkHealthTimer = setTimeout(this.reConnetWebSocket, 1000);
      } catch (err) {
        console.log('Check WebSocket Health error.', err);
        this.reConnetWebSocket();
      }
    }
  }

  connectWebSocket = () => {
    const { login } = this.props;
    const { userId } = login.userInfo;

    const ws = new WebSocket(`ws://${serverIp}`);
    this.ws = ws;

    ws.onopen = () => {
      const payload = { userId };
      ws.send(registerAction(payload));
      console.log('webSocketOpened');
    };

    ws.onmessage = (e) => {
      console.log(e.data);
      this.handleMessage(e.data);
      console.log('webSocketMessage', e.data);
    };

    ws.onerror = (e) => {
      console.log('webSocketError', e.message);
    };

    ws.onclose = (e) => {
      console.log('webSocketClosed', e.code, e.reason);
    };
  }

  reConnetWebSocket = () => {
    console.log('reconnet websocket');
    this.ws.close();
    this.connectWebSocket();
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
      case 'healthCheck':
        if (this.checkHealthTimer) {
          console.log('clear timer');
          clearTimeout(this.checkHealthTimer);
        }
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