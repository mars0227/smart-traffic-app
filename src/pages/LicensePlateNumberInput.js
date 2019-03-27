import { KeyboardAvoidingView, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { setLicensePlateNumberAction } from '../actions';
import NewTextInput from '../components/NewTextInput';
import NotificationListener from '../components/NotificationListener';

class LicensePlateNumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ln: ''
    };
    this.handleDone = this.handleDone.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doneButton = this.doneButton.bind(this);
  }

  componentDidMount() {
    const { licensePlateNumber } = this.props.createReservation;
    this.setState({
      ln: licensePlateNumber
    })
    this.props.navigation.setParams({doneButton: this.doneButton()});
  }

  handleDone() {
    const { ln } = this.state;
    this.props.handleSetLicensePlateNumber(ln);
    this.props.navigation.navigate('CreateReservation');
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: navigation.getParam('doneButton')
    }
  };

  doneButton = () => (
    <Button
      onPress={this.handleDone}
      title="Done"
      color="blue"
    />
  );

  handleInputChange(text) {
    this.setState({
      ln: text
    });
  };

  render() {
    const { ln } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='position'>
        <NotificationListener />
        <NewTextInput
          title={'License Plate Number '}
          value={ln}
          handleInputChange={this.handleInputChange}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  createReservation: state.createReservation
});

const mapDispatchToProps = dispatch => ({
  handleSetLicensePlateNumber: data => dispatch(setLicensePlateNumberAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicensePlateNumberInput);