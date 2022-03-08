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
import { GoBackLeft } from '../components/styles';
import { auth } from '../firebase';
import { Icon } from 'react-native-elements';
import CustomerPastAppointment from './CustomerPastAppointment';
import CustomerUpcomingAppointment from './CustomerUpcomingAppointment';

const CustomerAppointment = () => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(1);

  const renderIndex = () => {
    switch (index) {
      case 1:
        return <CustomerUpcomingAppointment />;
      case 2:
        return <CustomerPastAppointment />;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.Innercontainer}>
        <GoBackLeft>
          <Icon
            style={styles.gobackBtn}
            name="arrow-back-outline"
            type="ionicon"
            color="#808080"
            size={26}
            onPress={() => navigation.replace('CustomerCommon')}
          />
        </GoBackLeft>
        <View style={styles.headercontainer}>
          <Image style={styles.GlamorZone} resizeMode="cover" source={require('../assets/img/img2.jpg')} />
          <Text style={styles.PageTitle}>Appointment</Text>

          <View style={styles.ExtraView}>
            <View style={styles.ExtraViewSubCont}>
              <TouchableOpacity
                style={styles.TextLink}
                onPress={() => {
                  setIndex(1);
                }}
              >
                <Text style={styles.TextLinkContent}>Upcoming</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ExtraViewSubCont}>
              <TouchableOpacity
                style={styles.TextLink}
                onPress={() => {
                  setIndex(2);
                }}
              >
                <Text style={styles.TextLinkContent}>Past</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {renderIndex()}
      </View>
    </>
  );
};

export default CustomerAppointment;

const styles = StyleSheet.create({
  Innercontainer: {
    flex: 1,
    width: '100%',
  },

  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '33%',
  },
  GlamorZone: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginTop: 10,
  },
  TextLink: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextLinkContent: {
    color: '#6d28d9',
    fontSize: 15,
  },
  ExtraView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
