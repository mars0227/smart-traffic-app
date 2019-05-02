import { connect } from 'react-redux';
import React from 'react';
import {
  NavigationActions
} from 'react-navigation';
import List from '../components/List';
import i18n from '../constants/i18n';
import { logoutAction } from '../actions';

class Settings extends React.Component {
  static navigationOptions = { title: i18n.t('settings') };

  constructor(props) {
    super(props);
    const { locate } = this.props.login.userInfo;
    this.items = [
//      {
//        key: 0,
//        title: i18n.t('language', { locate }),
//        action: () => props.navigation.navigate('SelectLanguage')
//      },
      {
        key: 0,
        title: i18n.t('logout', { locate }),
        action: () => this.logoutAction()
      }
    ];
  }

  logoutAction = () => {
    const {
      navigation,
      handleLogout
    } = this.props;

    handleLogout();
    navigation.reset([
          NavigationActions.navigate({ routeName: 'Login' }),
      ], 0);
  }

  handleSelect = index => {
    const action = this.items[index].action;
    action();
  }

  render() {
    return (
      <List
        list={this.items}
        chevron
        handlePress={this.handleSelect.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)