import { connect } from 'react-redux';
import React from 'react';
import { selectLocationAction } from '../actions';
import SelectList from '../components/SelectList';

class SelectLocation extends React.Component {
  static navigationOptions = { title: 'Locations' };

  handleSelect = index => {
    const {
      constructions,
      handleSelectLocation,
      navigation
    } = this.props;

    handleSelectLocation(constructions[index]);
    navigation.goBack();
  }

  render() {
    const { constructions } = this.props;
    return (
      <SelectList list={constructions} onPress={this.handleSelect.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => ({
  constructions: state.constructions,
});

const mapDispatchToProps = dispatch => ({
  handleSelectLocation: location => dispatch(selectLocationAction(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLocation)