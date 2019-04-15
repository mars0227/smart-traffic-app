import React from 'react';
import {
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  View
} from 'react-native';
import {
  Text,
  Input
} from 'react-native-elements';
import { connect } from 'react-redux'
import { getIdentitiesAction, loginAction } from '../actions';
import KeepInputWithTitle from '../components/KeepInputWithTitle';
import defaultStyle from '../styles';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityIndex: 0,
      account: undefined,
      password: '',
      photos: []
    }
  }

  componentDidMount() {
    this.props.handleGetIdentities();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.login.ok) {
      this.props.navigation.replace('Main');
      return false;
    }
    return true;
  }

  onInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  
  render() {
    const { account, password, identityIndex } = this.state;
    const { identities, login } = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.titleContainer}>
          <Text h4 style={defaultStyle.text}>Smart Traffic Management</Text>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.loginBorder}>
            <View style={styles.inputContainer} >
              <KeepInputWithTitle
                placeholder='Account'
                value={account}
                keyboardType='email-address'
                textContentType='username'
                onChangeText={(value) => this.onInputChange('account', value)}
              />
              <Input
                placeholder='Password'
                value={password}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={(value) => this.onInputChange('password', value)}
              />
              {login.errMsg
                ? <Text style={styles.errorMessage}>{login.errMsg}</Text>
                : null
              }
            </View>
            <View style={styles.buttonContainer}>
              <Button
                color='royalblue'
                onPress={() => this.props.handleLogin({ account, password, identity: identities[identityIndex] })}
                title="Sign in"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 2,
  },
  loginBorder: {
    width: 200,
    height: 400,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'space-around'
  },
  inputContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
  }
});

const mapStateToProps = (state) => ({
  identities: state.identities,
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  handleLogin: payload => dispatch(loginAction(payload)),
  handleGetIdentities: () => dispatch(getIdentitiesAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)