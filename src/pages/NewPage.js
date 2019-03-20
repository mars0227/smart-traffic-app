import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static navigationOptions = {
    title: 'new title',
  };

  onInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
    {/*console.warn('id', this.state.identity);*/ }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>new page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state) => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  handleLogin: payload => dispatch(loginAction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)