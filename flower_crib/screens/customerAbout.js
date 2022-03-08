import { useNavigation } from '@react-navigation/core';
import React from 'react';
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
} from 'react-native';
import { auth } from '../firebase';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

function CustomerAbout() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <View style={styles.openingHoursContainer}>
        <Text style={styles.subTitle}>Opening Hours</Text>
        <View style={styles.openingHoursSubCont}>
          <View style={styles.openingHours}>
            <Icon name="md-timer" type="ionicon" color="#cf18e8" size={20} paddingRight={5} />
            <View>
              <Text style={styles.weekdayOpen}>Monday - Friday</Text>
              <Text style={styles.hoursOpen}>8.30 AM - 6.00 PM</Text>
            </View>
          </View>
          <View style={styles.openingHours}>
            <Icon name="md-timer" type="ionicon" color="#cf18e8" size={20} paddingRight={5} />
            <View>
              <Text style={styles.weekdayOpen}>Saturday - Sunday</Text>
              <Text style={styles.hoursOpen}>9.00 AM - 8.00 PM</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.Line} />

      <View style={styles.addressContainer}>
        <Text style={styles.subTitle}>Address</Text>
        <Text style={styles.addressStreet}>GlomorZone, Depot Road, Kilinochchi</Text>
        <View style={styles.addressSubContainer}>
          <MapView
            style={{ flex: 1, height: 100, width: 30 }}
            initialRegion={{ latitude: 9.383614, longitude: 440.399293, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          >
            <Marker
              coordinate={{ latitude: 9.383614, longitude: 440.399293 }}
              title="this is a marker"
              description="this is a marker example"
            />
          </MapView>
        </View>
      </View>

      <WelcomeContainer>
        <StyledFormArea>
          <Line />
          <StyledButtonSub onPress={handleSignOut}>
            <ButtonText>Book Now</ButtonText>
          </StyledButtonSub>
        </StyledFormArea>
      </WelcomeContainer>
    </>
  );
}

export default CustomerAbout;

const styles = StyleSheet.create({
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
});
