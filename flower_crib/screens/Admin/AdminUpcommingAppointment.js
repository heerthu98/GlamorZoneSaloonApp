import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useCallback } from 'react';
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
  ScrollView,
} from 'react-native';
import { GoBackLeft } from '../../components/styles';
import { Icon } from 'react-native-elements';

const AdminUpcomingAppointment = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleModal1 = () => {
    setModal1(!modal1);
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
            onPress={() => navigation.replace('AdminCommon')}
          />
        </GoBackLeft>
        <View style={styles.headercontainer}>
          <Image style={styles.GlamorZone} resizeMode="cover" source={require('../../assets/img/img2.jpg')} />
          <Text style={styles.PageTitle}>Pending Appointments</Text>
        </View>
        <ScrollView>
          <View style={styles.ExtraViewSelect}>
            <View style={styles.ExtraView}>
              <Text style={styles.PageTitle1}>Customer Name: T.Heerthana </Text>
            </View>
            <View style={styles.ExtraView}>
              {/* <View style={styles.ExtraViewSub}> */}
              <Text style={styles.PageTitle1}>Services</Text>
              <Text style={styles.PageTitle2}>Total: Rs.3500 </Text>
              <Text style={styles.PageTitle3}>Time: 45min </Text>
            </View>
            <View style={styles.Line} />
            <ScrollView>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Layer Cutting</Text>
                <Text style={styles.subTitle3}>Rs.800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Normal Facial</Text>
                <Text style={styles.subTitle3}>Rs 800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Nail Treatment</Text>
                <Text style={styles.subTitle3}>Rs 800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Nail Treatment</Text>
                <Text style={styles.subTitle3}>Rs 800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.TextLink} onPress={toggleModal}>
              <View style={styles.SetReminder}>
                <Text style={styles.subTitleReminder}>Set Reminder</Text>
              </View>
            </TouchableOpacity>
            {modal && (
              <View>
                <View style={styles.remainderSubContDrop}>
                  <Text style={styles.subRemainderTitle3}>Set Time</Text>
                  <Text style={styles.subRemainderTitle3}>Vibrate</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.ExtraViewSelect}>
            <View style={styles.ExtraView}>
              <Text style={styles.PageTitle1}>Customer Name: T.Heerthana </Text>
            </View>
            <View style={styles.ExtraView}>
              {/* <View style={styles.ExtraViewSub}> */}
              <Text style={styles.PageTitle1}>Services</Text>
              <Text style={styles.PageTitle2}>Total: Rs.3500 </Text>
              <Text style={styles.PageTitle3}>Time: 45min </Text>
            </View>
            <View style={styles.Line} />
            <ScrollView>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Layer Cutting</Text>
                <Text style={styles.subTitle3}>Rs.800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Normal Facial</Text>
                <Text style={styles.subTitle3}>Rs 800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Nail Treatment</Text>
                <Text style={styles.subTitle3}>Rs 800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>Nail Treatment</Text>
                <Text style={styles.subTitle3}>Rs 800</Text>
                <Text style={styles.subTitle4}>15min</Text>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.TextLink} onPress={toggleModal1}>
              <View style={styles.SetReminder}>
                <Text style={styles.subTitleReminder}>Set Reminder</Text>
              </View>
            </TouchableOpacity>
            {modal1 && (
              <View>
                <View style={styles.remainderSubContDrop}>
                  <Text style={styles.subRemainderTitle3}>Set Time</Text>
                  <Text style={styles.subRemainderTitle3}>Vibrate</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AdminUpcomingAppointment;
const styles = StyleSheet.create({
  Innercontainer: {
    flex: 1,
    width: '100%',
  },
  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '28%',
  },
  GlamorZone: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginTop: 10,
  },
  PageTitle: {
    textAlign: 'left',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5185c2',
    paddingBottom: 5,
  },
  ExtraViewSelect: {
    borderRadius: 2,
    paddingLeft: 10,
    shadowColor: '#878383',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    minHeight: '33%',
    width: '90%',
    marginLeft: 15,
    marginTop: 10,
  },
  PageTitle: {
    textAlign: 'left',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#6d28d9',
    padding: 10,
  },
  PageTitle1: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5185c2',
    paddingLeft: 10,
    paddingTop: 20,
  },
  PageTitle2: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E56717',
    paddingBottom: 5,
    left: 100,
    top: 27,
    position: 'absolute',
    zIndex: 1,
  },
  PageTitle3: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E56717',
    paddingBottom: 5,
    left: 210,
    top: 27,
    position: 'absolute',
    zIndex: 1,
  },

  subTitle: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingLeft: 6,
  },
  ExtraView: {
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
  },
  ExtraViewSub: {
    display: 'flex',
    flexDirection: 'row',
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
  TextContent: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingTop: 15,
    paddingLeft: 9,
  },
  subTitle2: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingTop: 15,
    paddingLeft: 9,
  },
  subTitle3: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#C11B17',
    padding: 3,
    left: 185,
    top: 15,
    position: 'absolute',
    zIndex: 1,
  },
  subTitle4: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#C11B17',
    padding: 3,
    left: 250,
    top: 15,
    position: 'absolute',
    zIndex: 1,
  },
  fixedButton: {
    flex: 1,
    // position: 'fixed',
    // bottom: 0,
  },
  SetReminder: {
    backgroundColor: '#E3E4FA',
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  subTitleReminder: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e6d91',
    padding: 10,
    paddingLeft: 9,
  },
  subRemainderTitle3: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7195bf',
    padding: 10,
    paddingLeft: 9,
  },
});
