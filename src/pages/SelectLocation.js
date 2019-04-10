import { connect } from 'react-redux';
import React from 'react';
import {
  getConstructionsAction,
  selectLocationAction
} from '../actions';
import SelectList from '../components/SelectList';

class SelectLocation extends React.Component {
  static navigationOptions = { title: 'Locations' };

  componentDidMount() {
    const { constructions, handleGetConstruction } = this.props;
    if (!constructions || constructions.length === 0) handleGetConstruction();
  }

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
    const { constructions = [] } = this.props;
    return (
      <SelectList list={constructions} onPress={this.handleSelect.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => ({
  constructions: state.constructions,
});

const mapDispatchToProps = dispatch => ({
  handleGetConstruction: () => dispatch(getConstructionsAction()),
  handleSelectLocation: location => dispatch(selectLocationAction(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLocation)