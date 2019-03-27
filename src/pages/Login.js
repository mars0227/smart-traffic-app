import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { getIdentitiesAction, loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityIndex: 0,
      account: '',
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
        <Text style={styles.title}>Smart Traffic Management</Text>
        <Text style={styles.message}>Sign In</Text>
        <View style={{ flex: 3 }}>
        <TextInput
          placeholder='Account'
          style={styles.input}
          value={account}
          keyboardType='email-address'
          textContentType='username'
          onChangeText={(value) => this.onInputChange('account', value)}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          value={password}
          secureTextEntry={true}
          textContentType='password'
          onChangeText={(value) => this.onInputChange('password', value)}
          />
         </View>
        {login.errMsg
          ? <Text style={styles.errorMessage}>{login.errMsg}</Text>
          : null
        }
        <View style={{ flex: 3 }}>
          <Button color='royalblue' onPress={() => this.props.handleLogin({account, password, identity: identities[identityIndex]})}
            title="Sign in"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
  },
  message: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
  },
  input: {
    height: 30,
    width: 200,
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    height: 20,
    margin: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
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