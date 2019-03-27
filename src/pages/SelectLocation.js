import { ListItem, Text } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { selectLocationAction } from '../actions';
import NotificationListener from '../components/NotificationListener';

class SelectLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelect = location => {
    this.props.handleSelectLocation(location);
    this.props.navigation.navigate('CreateReservation');
  }

  render() {
    return (
      <View>
        <NotificationListener />
        <Text>Location</Text>
        {
          this.props.constructions.map((item, index) => (
            <ListItem
              key={index}
              title={item}
              onPress={() => this.handleSelect(item)} />
          ))
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  constructions: state.constructions,
  createReservation: state.createReservation
});

const mapDispatchToProps = dispatch => ({
  handleSelectLocation: location => dispatch(selectLocationAction(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLocation)