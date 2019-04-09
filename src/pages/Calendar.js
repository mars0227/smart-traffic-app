import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  getConstructionsAction,
  setCalendarLocationAction,
} from '../actions';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements';

class Calendar extends React.Component {
  static navigationOptions = {
    title: 'Locations',
  };

  componentDidMount() {
    const { constructions } = this.props;
    if (constructions.length === 0) this.props.handleGetConstruction();
  }

  handleSelectConstruction = construction => {
    this.props.handleSetCalendarLocation(construction);
    this.props.navigation.navigate('DayCalendar');
  };

  render() {
    const { constructions } = this.props;

    return (
      <View style={styles.container}>
        {constructions.map((item, index) =>
          <ListItem
            key={index}
            title={item}
            style={{ height: 50 }}
            chevron
            onPress={() => this.handleSelectConstruction(item)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  constructions: state.constructions,
});

const mapDispatchToProps = dispatch => ({
  handleGetConstruction: () => dispatch(getConstructionsAction()),
  handleSetCalendarLocation: payload => dispatch(setCalendarLocationAction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)