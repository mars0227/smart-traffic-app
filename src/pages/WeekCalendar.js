import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View
} from 'react-native';
import {
  Text,
  Input,
  Badge,
  Avatar,
  ListItem,
  Button
} from 'react-native-elements';
import { connect } from 'react-redux'
import { getAllReservationsAction } from '../actions';
import KeepInputWithTitle from '../components/KeepInputWithTitle';
import defutlStyle from '../styles';
import List from '../components/List';
import {
  timeSlot,
  weekAbbreviation
} from '../constants';
import { dateCompare } from '../utils/utils';
import moment from 'moment';
import mockData from '../mock';

const DayView = ({ title, subTitle }) => (
  <View style={{ flex: 0.2, alignItems: 'center' }}>
    <Text h4>{title}</Text>
    <Text>{subTitle}</Text>
  </View>
);

class WeekCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekPlus: 0
    }
  }

  componentDidMount() {
    const { allReservations, handleGetAllReservations } = this.props;
    if ( !allReservations.data || allReservations.data.length === 0 ){
      handleGetAllReservations();
    }
  }

  renderTitle = (reservation = {}) => (
    <View style={defutlStyle.twoColumeContainer}>
      {Object.entries(reservation).map(([key, value], index) => {
        const waiting = value.reduce( (pre, cur) => (cur.state === 1 ? pre + 1 : pre),0);
        const accepted = value.reduce( (pre, cur) => (cur.state === 2 ? pre + 1 : pre),0);
        const rejected = value.reduce( (pre, cur) => (cur.state === 3 ? pre + 1 : pre),0);
        return (
          <View key={index} style={{ flexDirection: 'row', margin: 5 }}>
            <Text>{key} </Text>
            {waiting > 0 && <Badge value={waiting} status='warning' />}
            {accepted > 0 && <Badge value={accepted} status='primary' />}
            {rejected > 0 && <Badge value={rejected} status='error' />}
          </View>
        );
      })}
    </View>
  );

  weekArray = from => {
    let fullWeek = [];
    for (let i = 0; i < 7; i++) {
      fullWeek[i] = moment(from, 'D/M/YYYY').add(i, 'days').format('D/M/YYYY');
    }
    return fullWeek;
  }

  filterThisWeek = ({ from, object }) => {
    const fullWeek = this.weekArray(from);

    return fullWeek.map(item => object[item]);
  }

  render() {
    const { weekPlus } = this.state;
    const { allReservations } = this.props;
    const thisWeek = {
      from: moment().add(weekPlus, 'weeks').weekday(0).format('D/M/YYYY'),
      to: moment().add(weekPlus, 'weeks').weekday(6).format('D/M/YYYY'),
    };
    const fullWeek = this.weekArray(thisWeek.from);
    const liteReservations = allReservations.data.map(item => {
      const { reservation_id, date, time_slot, state } = item;
      return { reservation_id, date, time_slot, state };
    });

    const combineReservation = liteReservations.reduce((pre, cur) => {
      if (!pre[cur.date]) pre[cur.date] = [];
      pre[cur.date].push(cur);
      return { ...pre };
    }, {});

    const combineByTime = Object.entries(combineReservation)
      .map(([key, value]) => {
        const newValue = value.reduce((pre, cur) => {
          if (!pre[cur.time_slot]) pre[cur.time_slot] = [];
          pre[cur.time_slot].push(cur);
          return { ...pre };
        }, {});
        return [key, newValue];
      })
      .reduce((pre, [key, value]) => {
        pre[key] = value;
        return { ...pre };
      }, {});

    const thisWeekRes = this.filterThisWeek({ from: thisWeek.from, object: combineByTime });
    const list = fullWeek.map((date, index) => (
      {
        leftAvatar: <DayView title={date.split('/')[0]} subTitle={weekAbbreviation[index]} />,
        title: this.renderTitle(thisWeekRes[index]),
        key: index,
      })
    );

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'royalblue', alignItems: 'center'}}>
          <Button
            icon={{
              name: 'chevron-left',
              color: 'white',
              size: 30
            }}
            buttonStyle={{backgroundColor: 'royalblue'}}
            onPress={() => this.setState({weekPlus: weekPlus - 1})}
          />
          <Text style={{color: 'white', fontSize: 18}}>{`${thisWeek.from} ~ ${thisWeek.to}`}</Text>
          <Button
            icon={{
              name: 'chevron-right',
              color: 'white',
              size: 30
            }}
            buttonStyle={{backgroundColor: 'royalblue'}}
            onPress={() => this.setState({weekPlus: weekPlus + 1})}
          />
        </View>
        <List list={list} handlePress={() => console.warn('onPress')} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Badge status='warning' />
            <Text> Need Review</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Badge status='primary' />
            <Text> Accepted</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Badge status='error' />
            <Text> Rejected</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  allReservations: state.allReservations,
});

const mapDispatchToProps = dispatch => ({
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekCalendar)
