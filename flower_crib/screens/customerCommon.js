import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Innercontainer,
  PageTitle,
  StyledFormArea,
  SubTitle,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  Avatar,
  WelcomeImage,
  StyledButtonSub,
  GoBackLeft,
  LogOutRightIcon,
} from '../components/styles';

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextLink,
  TouchableOpacity,
  View,
  TextLinkContent,
  Image,
  Linking,
  Button,
} from 'react-native';
import { auth } from '../firebase';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useAuthState } from 'react-firebase-hooks/auth';

import CustomerService from './customerService';
import CustomerAbout from './customerAbout';
import CustomerReview from './CustomerReview';
import CustomerGallery from './customerGallery';

import CustomerPastAppointment from './CustomerPastAppointment';

import { Styles } from '../components/styles';

const CustomerCommon = () => {
  const navigation = useNavigation();

  const [user, loading, error] = useAuthState(auth);
  const [modal, setModal] = useState(false);

  const [index, setIndex] = useState(1);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  const renderIndex = () => {
    switch (index) {
      case 1:
        return <CustomerAbout />;
      case 2:
        return <CustomerService />;
      case 3:
        return <CustomerGallery />;
      case 4:
        return <CustomerPastAppointment />;
      case 5:
        return <CustomerReview />;
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.Innercontainer}>
        <LogOutRightIcon>
          <Icon
            style={styles.LogOutBtn}
            name="log-out"
            type="ionicon"
            color="#6d28d9"
            size={26}
            onPress={handleSignOut}
          />
        </LogOutRightIcon>
        {modal && (
          <View>
            <View style={styles.LogouSubContDrop}>
              <Text style={styles.subTitle2}>Logout</Text>
            </View>
          </View>
        )}
        <Image style={styles.WelcomeImage} resizeMode="cover" source={require('./../assets/img/img5.jpg')} />
        <View style={styles.ExtraView}>
          <View style={styles.ExtraViewSub}>
            <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
              <Icon name="md-globe" type="ionicon" color="#6d28d9" size={30} />
              <Text style={styles.TextLinkContent}>Website</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSub}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                Linking.openURL(`tel:${777209737}`);
              }}
            >
              <Icon name="md-call" type="ionicon" color="#6d28d9" size={30} />
              <Text style={styles.TextLinkContent}>Call</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSub}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                Linking.openURL('https://www.facebook.com/divya.dia.9210');
              }}
            >
              <Icon name="md-logo-facebook" type="ionicon" color="#6d28d9" size={30} />
              <Text style={styles.TextLinkContent}>FaceBook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSub}>
            <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
              <Icon name="md-share" type="ionicon" color="#6d28d9" size={30} />
              <Text style={styles.TextLinkContent}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.StylistContainer}>
          <Text style={styles.PageTitle}>Our Stylists</Text>
          <View style={styles.Stylist}>
            <View style={styles.StylistPhotos}>
              <Image style={styles.StylistImage} source={require('./../assets/img/stylist11.jpg')} />
              <Text> Divya</Text>
            </View>
            <View style={styles.StylistPhotos}>
              <Image style={styles.StylistImage} source={require('./../assets/img/stylist22.jpg')} />
              <Text> Thushi</Text>
            </View>
          </View>
        </View>

        <View style={styles.ExtraView}>
          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(1);
              }}
            >
              <Text style={styles.TextLinkContent}> About</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(2);
              }}
            >
              <Text style={styles.TextLinkContent}> Service</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(3);
              }}
            >
              <Text style={styles.TextLinkContent}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(4);
              }}
            >
              <Text style={styles.TextLinkContent}> History</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ExtraViewSubCont}>
            <TouchableOpacity
              style={styles.TextLink}
              onPress={() => {
                setIndex(5);
              }}
            >
              <Text style={styles.TextLinkContent}> Review</Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderIndex()}
      </View>
    </>
  );
};

export default CustomerCommon;

const styles = StyleSheet.create({
  Innercontainer: {
    flex: 1,
    width: '100%',
  },

  WelcomeImage: {
    height: '27%',
    width: '100%',
  },

  TextLink: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  ExtraViewSub: {
    width: 100,
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
  },
  TextLinkContent: {
    color: '#6d28d9',
    fontSize: 15,
  },
  ExtraView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#dfe2f2',
  },
  StylistContainer: {
    padding: 4,
    backgroundColor: '#f2f2f2',
  },
  Stylist: {
    display: 'flex',
    flexDirection: 'row',
  },
  StylistPhotos: {
    paddingLeft: 10,
  },
  PageTitle: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5185c2',
    paddingBottom: 5,
  },
  StylistImage: {
    width: 55,
    height: 55,
    margin: 'auto',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 3,
  },

  ExtraViewSubCont: {
    width: 75,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openingHoursContainer: {},
  subTitle: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingLeft: 6,
    padding: 3,
  },
  openingHoursSubCont: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  openingHours: {
    paddingLeft: 20,
    flexDirection: 'row',
    // justifyContent: "space-between",
  },
  weekdayOpen: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8daacc',
  },
  hoursOpen: {
    fontSize: 15,
    color: '#7195bf',
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
  addressStreet: {
    paddingLeft: 30,
    fontSize: 15,
    color: '#7195bf',
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
  addressContainer: {
    marginTop: -5,
  },
  addressSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  LogouSubContDrop: {
    display: 'flex',
    flexDirection: 'row',
    // borderRadius: 2,
    // paddingLeft: 10,
    // shadowColor: '#6e4c73',
    // shadowOffset: { width: -2, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 2.5,
    // flexDirection: 'row',
    height: 45,
    width: '40%',
    alignItems: 'center',
    marginLeft: 20,
  },
  subTitle2: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7195bf',
    padding: 3,
    paddingLeft: 6,
    marginLeft: 5,
    marginBottom: 5,
  },
});
