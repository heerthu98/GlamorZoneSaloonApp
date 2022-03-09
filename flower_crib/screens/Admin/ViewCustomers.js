import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Button, Text, TextInput, View, ScrollView, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/core';

import { useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import TotalCustomers from './TotalCustomers';
import { GoBackLeft } from '../../components/styles';

import { Icon } from 'react-native-elements';
// import { ScrollView } from "react-native-gesture-handler";

export default function ViewCustomers() {
  const navigation = useNavigation();

  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const customersRef = collection(db, 'UserLogin');
    const q = query(customersRef, orderBy('date', 'asc'));

    onSnapshot(q, (snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customers);
      console.log(customers);
    });
  }, []);
  return (
    <ScrollView>
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
          <Text style={styles.PageTitle}>Total Customers</Text>
        </View>
        <ScrollView>
          {/* <Text style={styles.viewTitle}>All Review ({customers.length})</Text> */}
          {customers.map((s) => {
            return (
              <TotalCustomers key={s.id} fullname={s.fullname} date={s.date} phoneno={s.phoneno} address={s.address} />
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
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
    marginTop: 5,
    marginBottom: -30,
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
    fontSize: 23,
    fontWeight: 'bold',
    color: '#6d28d9',
    padding: 5,
  },
  viewTitle: {
    textAlign: 'left',
    width: '70%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5185c2',
    marginTop: 10,
    marginLeft: 8,
    // backgroundColor: 'blue',
    paddingLeft: 10,
    // paddingBottom: 2,
  },
  viewCount: {
    textAlign: 'left',
    fontSize: 15,
    paddingLeft: 15,
  },
});
