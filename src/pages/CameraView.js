import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { updatePictureUriAction } from '../actions';
import { Camera } from 'expo';

class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      size: undefined
    };
    this.takePicture = this.takePicture.bind(this);
  }

  handleTakePictureFailed = (err) => {
    console.warn('take picture error', err);
  }

  handleMinimizePictureSize = async () => {
    const result = await this.camera.getAvailablePictureSizesAsync();
    console.log('picture support size', result);
    this.setState({
      size: result[result.length - 1]
    });
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
        <Camera
          style={{ flex: 1 }}
          type={type}
          pictureSize={size}
          ref={ref => { this.camera = ref; }}
          onCameraReady={this.handleMinimizePictureSize}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={this.takePicture}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Flip{' '}
              </Text>
            </TouchableOpacity>
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