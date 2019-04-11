import React from 'react';
import {
  Button,
  Overlay
} from 'react-native-elements';

const LoadingOverlay = () => (
  <Overlay
    width='auto'
    height='auto'
    overlayBackgroundColor='rgba(255, 255, 255, .5)'
    isVisible={true}
  >
    <Button
      type='clear'
      loadingProps={{color: 'black', size: 'large'}}
      loading={true}
    />
  </Overlay>
);
            
export default LoadingOverlay;