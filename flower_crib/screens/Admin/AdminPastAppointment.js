import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { db } from '../../firebase';

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
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import ViewPastAppointments from './ViewPastAppointments';

const AdminPastAppointment = () => {
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const appointmentsRef = collection(db, 'Booking');
    const q = query(appointmentsRef, orderBy('date', 'asc'));

    onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointments);
      console.log(appointments);
    });
  }, []);

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
          <Text style={styles.PageTitle}>Total Appointments</Text>
        </View>
        <ScrollView>
          {appointments
            .filter((d) => new Date(d.date) - new Date() > 0)
            .map((s) => {
              return (
                <ViewPastAppointments
                  key={s.id}
                  user={s.user}
                  category={s.category}
                  date={s.date}
                  price={s.price}
                  time={s.time}
                />
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default AdminPastAppointment;
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
    left: 100,
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
