import React from 'react';
import { Button } from 'react-native-elements';

const LoadingIcon = () => (
  <Button
    type='clear'
    loadingProps={{color: 'black', size: 'large'}}
    loading={true}
  />
);
            
export default LoadingIcon;