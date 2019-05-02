import { connect } from 'react-redux';
import React from 'react';
import { Icon } from 'react-native-elements';
import {
  changeLanguageAction
} from '../actions';
import List from '../components/List';

class SelectLanguage extends React.Component {
  static navigationOptions = { title: 'Select Language' };

  handleSelect = (index, items) => {
    const {
      navigation,
      handleChangeLanguage
    } = this.props;

    handleChangeLanguage(items[index].locale);
    navigation.goBack();
  }

  render() {
    const { locale } = this.props.login.userInfo;
    const items = [
      {
        key: 0,
        title: 'English',
        locale: 'en',
      },
      {
        key: 1,
        title: '繁體中文',
        locale: 'zh'
      }
    ];

    const itemsWithIcon = items.map(item => item.locale === locale
      ? {
        ...item,
        rightIcon: <Icon name='check' />
      }
      : item);

    return (
      <List
        list={itemsWithIcon}
        handlePress={(index) => this.handleSelect(index, items)}
      />
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  handleChangeLanguage: payload => dispatch(changeLanguageAction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLanguage)