import { Text } from 'react-native-elements';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { setMaterialAction } from '../actions';

class MaterialInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: ''
    };
    this.handleDone = this.handleDone.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doneButton = this.doneButton.bind(this);
  }

  componentDidMount() {
    const { material } = this.props.createReservation;
    this.setState({
      material
    })
    this.props.navigation.setParams({doneButton: this.doneButton()});
  }

  handleDone() {
    const { material } = this.state;
    this.props.handleSetMaterial(material);
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
      material: text
    });
  };

  render() {
    const { material } = this.state;
    return (
      <View style={styles.container}>
        <Text>Materials </Text>
        <TextInput
          style={{borderBottomColor: 'gray', borderBottomWidth: 1, height: 20, width: 100}}
          value={material}
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
  handleSetMaterial: data => dispatch(setMaterialAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialInput);