import React from 'react';
import {
  View
} from 'react-native';
import {
  Text,
  Badge,
  Button,
  Icon
} from 'react-native-elements';
import { connect } from 'react-redux'
import {
  getAllReservationsAction,
  setPartialReservationsAction
} from '../actions';
import defaultStyle from '../styles';
import List from '../components/List';
import { weekAbbreviation } from '../constants';
import moment from 'moment';
import i18n from '../constants/i18n';

const DayView = ({ title, subTitle }) => (
  <View style={{ flex: 0.2, alignItems: 'center' }}>
    <Text h4>{title}</Text>
    <Text>{subTitle}</Text>
  </View>
);

const BadgeInfo = () => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ee',
    ...defaultStyle.iPhoneXFooterPaddind
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Badge status='warning' />
      <Text>{` ${i18n.t('needReview')}`}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Badge status='primary' />
      <Text>{` ${i18n.t('accepted')}`}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Badge badgeStyle={{backgroundColor: 'lightgray'}} />
      <Text>{` ${i18n.t('refused')}/${i18n.t('canceled')}`}</Text>
    </View>
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
    const {
      allReservations,
      handleGetAllReservations
    } = this.props;

    if (!allReservations.data || allReservations.data.length === 0) {
      handleGetAllReservations();
    }
  }

  componentDidUpdate(prevProps) {
    const { system, handleGetAllReservations } = this.props;
    const { appState: preAppState } = prevProps.system;
    const { appState } = system;
    if (preAppState !== appState && appState === 'active') {
      console.log('go to foreground, update weebCalendar');
      handleGetAllReservations();
    }
  }

  renderTitle = (reservations = {}) => (
    <View style={defaultStyle.twoColumeContainer}>
      {Object.entries(reservations).map(([key, value], index) => {
        const waiting = value.reduce( (pre, cur) => (cur.state === 1 ? pre + 1 : pre),0);
        const accepted = value.reduce( (pre, cur) => (cur.state === 2 ? pre + 1 : pre),0);
        const rejected = value.reduce( (pre, cur) => (cur.state === 3 || cur.state === 4 ? pre + 1 : pre),0);
        return (
          <View key={index} style={{ flexDirection: 'row', margin: 5 }}>
            <Text>{key} </Text>
            {waiting > 0 && <Badge value={waiting} status='warning' />}
            {accepted > 0 && <Badge value={accepted} status='primary' />}
            {rejected > 0 && <Badge value={rejected} badgeStyle={{backgroundColor: 'lightgray'}} />}
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

  handlePartialReservationsPress = payload => {
    if (payload && payload.length > 0) {
      this.props.handleSetPartialReservations(payload);
      this.props.navigation.navigate('PartialReservations');
    }
  }

  render() {
    const { weekPlus } = this.state;
    const { allReservations, login } = this.props;
    const { identity = 'Manager' } = login.userInfo;
    const reservationArray = identity === 'Manager'
      ? allReservations.data
      : allReservations.data.filter(reservation => reservation.state === 2);

    const thisWeek = {
      from: moment().add(weekPlus, 'weeks').weekday(0).format('D/M/YYYY'),
      to: moment().add(weekPlus, 'weeks').weekday(6).format('D/M/YYYY'),
    };
    const fullWeek = this.weekArray(thisWeek.from);

    const combinedReservationsByDay = reservationArray.reduce((pre, cur) => {
      if (!pre[cur.date]) pre[cur.date] = [];
      pre[cur.date].push(cur);
      return { ...pre };
    }, {});

    const reservationsOfThisWeek = this.filterThisWeek({ from: thisWeek.from, object: combinedReservationsByDay });

    const combinedReservationsByTime = reservationsOfThisWeek
      .map((reservations = []) => (
        reservations.reduce((pre, cur) => {
          if (!pre[cur.time_slot]) pre[cur.time_slot] = [];
          pre[cur.time_slot].push(cur);
          return { ...pre };
        }, {}))
      );

    const list = combinedReservationsByTime.map((reservations, index) => (
      {
        leftAvatar: <DayView title={fullWeek[index].split('/')[0]} subTitle={weekAbbreviation[index]} />,
        title: this.renderTitle(reservations),
        key: index,
      }
    ));

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'royalblue', alignItems: 'center' }}>
          <Button
            icon={{
              name: 'chevron-left',
              color: 'white',
              size: 30
            }}
            buttonStyle={{backgroundColor: 'royalblue'}}
            onPress={() => this.setState({weekPlus: weekPlus - 1})}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='calendar' type='octicon' color='#ffffff'/>
            <Text style={{color: 'white', fontSize: 16}}>  {`${thisWeek.from} ~ ${thisWeek.to}`}</Text>
          </View>
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
        <List list={list} handlePress={(key) => { this.handlePartialReservationsPress(reservationsOfThisWeek[key]) }} />
        <BadgeInfo />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  allReservations: state.allReservations,
  system: state.system
});

const mapDispatchToProps = dispatch => ({
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload)),
  handleSetPartialReservations: payload => dispatch(setPartialReservationsAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekCalendar);