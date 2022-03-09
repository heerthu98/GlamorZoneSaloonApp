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

import { Icon } from 'react-native-elements';

export default function ViewPastAppointments({ user, date, category, price, time, id }) {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar style="light" />
      <View>
        <ScrollView>
          <View style={styles.ExtraViewSelect}>
            <View style={styles.ExtraView}>
              <Text style={styles.PageTitle1}>Customer Name: {user} </Text>
              <Text style={styles.PageTitle1}>Date: {date}</Text>
            </View>
            <View style={styles.ExtraView}>
              {/* <View style={styles.ExtraViewSub}> */}
              <Text style={styles.PageTitle1}>Services</Text>
              <Text style={styles.PageTitle2}>Total: Rs.3500 </Text>
            </View>
            <View style={styles.Line} />
            <ScrollView>
              <View style={styles.ExtraViewSub}>
                <Text style={styles.subTitle2}>{category}</Text>
                <Text style={styles.subTitle3}>Rs.{price}</Text>
                <Text style={styles.subTitle4}>{time}</Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

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
    paddingBottom: 15,
    paddingTop: 5,
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
    paddingTop: 10,
  },
  PageTitle2: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E56717',
    paddingBottom: 5,
    left: 180,
    top: 17,
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
    top: 17,
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
