import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';
import {
  Icon,
  Badge
} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  removeImageAction
} from '../actions';

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      pictureIndex: 0
    }
  }

  setModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible
    });
  }

  handlePressDelete = currentIndex => {
    const { urls } = this.props;
    const imageNum = urls.length;
    const jumpTo = currentIndex === imageNum - 1
      ? currentIndex - 1
      : currentIndex;
    this.setState({
      pictureIndex: jumpTo
    });
    this.props.handleRemoveImage(currentIndex);
  }

  renderFooter = currentIndex => {
    const { deleteButtonDisabled } = this.props;
    console.log('deleteButtonDisabled', deleteButtonDisabled);
    return deleteButtonDisabled
      ? null
      : (<View style={styles.headerContainer}>
        <Icon
          raised
          name='delete'
          onPress={() => this.handlePressDelete(currentIndex)}
        />
      </View>);
  }

  render() {
    const { urls, style } = this.props;
    const { width, height } = style;
    const imageUrls = urls.map(url => ({ url }));
    const { modalVisible, pictureIndex } = this.state;

    return (
      <View style={style}>
        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent={false}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
            saveToLocalByLongPress={false}
            imageUrls={imageUrls}
            index={pictureIndex}
            renderHeader={() => (
              <View style={styles.headerContainer}>
                <Icon
                  raised
                  name='close'
                  onPress={this.setModalVisible}
                />
              </View>
            )}
            renderFooter={(currentIndex) => this.renderFooter(currentIndex)}
          />
        </Modal>
        <TouchableHighlight
          style={style}
          onPress={this.setModalVisible}>
          <View>
            <Image
              style={{width, height, ...styles.image}}
              source={{ uri: urls[0] }}
              resizeMode='contain'
              progressiveRenderingEnabled={true}
            />
            {urls.length > 1 &&
              <Badge
                status="primary"
                containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                value={urls.length}
              />
            }
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
          
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 1
  },
  image: {
    backgroundColor: 'lightgray'
  }
});

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  handleRemoveImage: payload => dispatch(removeImageAction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageView)