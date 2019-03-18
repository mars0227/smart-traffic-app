import React from 'react';
import {
  StyleSheet,
  Text,
  Picker,
  TextInput,
  Button,
  KeyboardAvoidingView,
  SegmentedControlIOS,
  Platform
} from 'react-native';
import { connect } from 'react-redux'
import { getIdentitiesAction, loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityIndex: 0,
      account: '',
      password: ''
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
      <KeyboardAvoidingView style={styles.container} behavior='position'>
        <Text style={styles.title}>Smart Traffic Management</Text>
        <Text style={styles.message}>Sign In</Text>
        {Platform.OS === 'ios'
          ? <SegmentedControlIOS style={styles.segment}
            values={identities}
            selectedIndex={this.state.identityIndex}
            onChange={(event) => 
              this.setState({ identityIndex: event.nativeEvent.selectedSegmentIndex })
            }
          />
          : <Picker
            mode='dialog'
            selectedValue={identities[this.state.identityIndex]}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ identityIndex: itemIndex })
            }
          >
            {identities.map((id, index) =>
              <Picker.Item label={id} value={id} key={index} />
            )}
          </Picker>}
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
        {login.errMsg
          ? <Text style={styles.errorMessage}>{login.errMsg}</Text>
          : null
        }
        <Button color='royalblue' onPress={() => this.props.handleLogin({account, password, identity: identities[identityIndex]})}
          title="Sign in"
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    height: 20,
    margin: 10,
  },
  message: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
    height: 20,
    margin: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    height: 20,
    margin: 10,
  },
  input: {
    height: 30,
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  signIn: {
    color: 'royalblue',
  },
  segment: {
    marginTop: 30,
    marginBottom: 30
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