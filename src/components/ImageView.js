import React from 'react';
import { View, Modal, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  setModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible
    });
  }

  render() {
    const { uri, style } = this.props;
    const { width, height } = style;
    return (
      <View style={style}>
        <Modal
          animationType='slide'
          visible={this.state.modalVisible}
          transparent={false}>
          <ImageViewer
            saveToLocalByLongPress={false}
            imageUrls={[{ url: uri }]}
            renderIndicator={() => { }}
            renderHeader={() => (
              <View style={styles.headerContainer}>
                <Icon
                  raised
                  name='close'
                  onPress={this.setModalVisible}
                />
              </View>
            )}
            onClick={this.setModalVisible}
          />
        </Modal>
        <TouchableHighlight
          style={style}
          onPress={this.setModalVisible}>
          <Image
            style={{width, height, ...styles.image}}
            source={{ uri }}
            resizeMode='contain'
            progressiveRenderingEnabled={true}
          />
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