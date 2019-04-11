import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { updatePictureUriAction } from '../actions';
import {
  Camera,
  Permissions
} from 'expo';
import { Icon } from 'react-native-elements';
import LoadingOverlay from '../components/LoadingOverlay';

class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      size: 'Low',
      hasCameraPermission: null,
      takePictureButtonDisabled: false
    };
    this.takePicture = this.takePicture.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleTakePictureFailed = (err) => {
    console.warn('take picture error', err);
  }

  handleMinimizePictureSize = async () => {
    try {
      const re = await this.camera.getSupportedRatiosAsync();
      console.warn('support ratios', re);
      if (Platform.OS === 'ios'){
        const result = await this.camera.getAvailablePictureSizesAsync();
        console.warn('picture support size', result);
      } else {
        const result = await this.camera.getAvailablePictureSizesAsync(tihs.state.ratios);
        console.warn('picture support size', result, 'of ratios', this.state.ratios);
      }
    } catch (err) {
      console.warn('get camera support size error', err);
    }
//    if (result.includes('352x288')){
//      this.setState({
//        size: '352x288'
//      });
//    } else {
//      this.setState({
//        size: 'Low'
//      });
//    }
  }

  takePicture = async () => {
    if (this.camera) {
      try {
        this.setState({ takePictureButtonDisabled: true });
        const result = await this.camera.takePictureAsync();
        this.camera.pausePreview();
        this.props.handleUpdatePictureUri(result.uri);
        this.props.navigation.goBack();
      } catch (err) {
        this.handleTakePictureFailed(err);
        this.setState({ takePictureButtonDisabled: false })
        console.warn('take picture error', err);
      }
    }
  }

  render() {
    const { type, size, takePictureButtonDisabled } = this.state;
    return (
      <View style={styles.container} >
        <Camera
          style={{ flex: 1 }}
          type={type}
          pictureSize={size}
          onCameraReady={this.handleMinimizePictureSize}
          ref={ref => { this.camera = ref; }}
          onMountError={err => console.warn('onMountError', err)}
        >
          {takePictureButtonDisabled ? (
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'center' }}>
              <LoadingOverlay />
            </View>)
           :
          (
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
              disabled={this.state.takePictureButtonDisabled}
              onPress={this.takePicture} />
          </View>)}
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