import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextLink,
  TouchableOpacity,
  View,
  TextLinkContent,
  Image,
} from 'react-native';
import { auth } from '../../firebase';
import { Icon } from 'react-native-elements';
import AdminBasicInfo from './AdminBasicInfo';
import AdminGallery from './AdminGallery';

import AdminReview from './AdminReview';
// import AdminGallery from './AdminGallery';
const AdminCommon = () => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(1);

  const renderIndex = () => {
    switch (index) {
      case 1:
        return <AdminBasicInfo />;
      case 2:
        return <AdminGallery />;
      case 3:
        return <AdminReview />;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.Innercontainer}>
        <Image style={styles.WelcomeImage} resizeMode="cover" source={require('../../assets/img/img8.jpg')} />
        <View style={styles.headercontainer}>
          <Image style={styles.GlamorZone} resizeMode="cover" source={require('../../assets/img/img2.jpg')} />
          <Text style={styles.PageTitle}>GlamorZone</Text>
        </View>
        <View style={styles.ExtraView}>
          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(1);
              }}
            >
              <Text style={styles.TextLinkContent}> Basic Info</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(2);
              }}
            >
              <Text style={styles.TextLinkContent}> Gallery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(3);
              }}
            >
              <Text style={styles.TextLinkContent}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderIndex()}
      </View>
    </>
  );
};

export default AdminCommon;

const styles = StyleSheet.create({
  Innercontainer: {
    flex: 1,
    width: '100%',
  },

  WelcomeImage: {
    height: '35%',
    width: '100%',
  },
  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  GlamorZone: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginTop: -50,
  },
  TextLink: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 20,
    // paddingRight: 20,
  },

  TextLinkContent: {
    color: '#6d28d9',
    fontSize: 15,
  },
  ExtraView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 5,
    // backgroundColor: '#dfe2f2',
  },

  PageTitle: {
    textAlign: 'left',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5185c2',
    paddingBottom: 5,
  },

  ExtraViewSubCont: {
    width: 100,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#6d28d9',
    marginEnd: 10,
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingLeft: 6,
    padding: 3,
  },

  Line: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#9ca3af',
    marginVertical: 10,
    marginLeft: '5%',
  },

  StyledButton: {
    padding: 10,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
});
