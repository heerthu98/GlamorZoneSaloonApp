import React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const showImage = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground source={props.route.params.url} style={{ height: deviceHeight, width: deviceWidth }} />
    </View>
  );
};

export default showImage;
