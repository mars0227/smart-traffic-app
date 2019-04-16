import React from 'react';
import { connect } from 'react-redux';
import { serverIp } from '../apis/api';

export default websocketService = () => {
  let ws = new WebSocket(`ws://${serverIp}`);
/*
  ws.onopen = () => {
    // connection opened
    ws.send('something'); // send a message
  };
*/
  ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };
}