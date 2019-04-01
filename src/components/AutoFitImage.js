import React from 'react';
import { Image as RNEImage } from 'react-native-elements';
import LoadingIcon from './LoadingIcon';
import { Dimensions, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    }
  }

  componentDidUpdate() {
    Image.getSize(this.props.uri, (width, height) => {
        if (this.props.width && !this.props.height) {
            this.setState({
                width: this.props.width,
                height: height * (this.props.width / width)
            });
        } else if (!this.props.width && this.props.height) {
            this.setState({
                width: width * (this.props.height / height),
                height: this.props.height
            });
        } else {
          this.setState({
            width: windowWidth,
            height: height * (windowWidth / width)
          });
        }
    });
  }

  render() {
    const { uri, style } = this.props;
    const { height, width } = this.state;
    return (
      <RNEImage
        style={{...style, height, width }}
        source={{ uri }}
        resizeMode='contain'
        PlaceholderContent={
          <LoadingIcon />
        }
      />
    )
  }
};