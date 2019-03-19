import { ListItem, Text } from 'react-native-elements';
import { View, DatePickerIOS, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { setLicensePlateNumberAction } from '../actions';

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
      <View style={styles.container}>
        <Text>License Plate Number </Text>
        <TextInput
          style={{borderBottomColor: 'gray', borderBottomWidth: 1, height: 20, width: 100}}
          value={ln}
          onChangeText={this.handleInputChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
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