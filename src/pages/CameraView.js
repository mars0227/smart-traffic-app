import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { updatePictureUriAction } from '../actions';
import { Camera } from 'expo';
import { Icon } from 'react-native-elements';
import NotificationListener from '../components/NotificationListener';

class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      size: 'Low'
    };
    this.takePicture = this.takePicture.bind(this);
  }

  handleTakePictureFailed = (err) => {
    console.warn('take picture error', err);
  }

  handleMinimizePictureSize = async () => {
    const result = await this.camera.getAvailablePictureSizesAsync();
    console.warn('picture support size', result);
    if (result.includes('352x288')){
      this.setState({
        size: '352x288'
      });
    } else {
      this.setState({
        size: 'Low'
      });
    }
  }

  takePicture = async () => {
    if (this.camera) {
      try {
        const result = await this.camera.takePictureAsync();
        this.props.handleUpdatePictureUri(result.uri);
        this.props.navigation.goBack();
      } catch (err) {
        this.handleTakePictureFailed(err);
      }
    }
  }

  render() {
    const { type, size } = this.state;
    return (
      <View style={styles.container} >
        <NotificationListener />
        <Camera
          style={{ flex: 1 }}
          type={type}
          pictureSize={size}
          onCameraReady={this.handleMinimizePictureSize}
          ref={ref => { this.camera = ref; }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
            <Icon
              name='photo-camera'
              reverse
              onPress={this.takePicture} />
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  handleUpdatePictureUri: data => dispatch(updatePictureUriAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraView);