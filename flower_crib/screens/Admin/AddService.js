import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Icon } from 'react-native-elements';

export default function AddService({ category, time, price, id }) {
  const handleDelete = () => {
    deleteDoc(doc(db, 'hairstyle', id))
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.log('Error removing document: ', error);
      });
  };

  return (
    <View style={styles.servicesSubContDrop}>
      <Icon name="md-arrow-forward" type="ionicon" color="#BB6286" size={25} />
      <Text style={styles.subTitle2}>{category}</Text>
      <Text style={styles.subTitle3}>Rs.{price}</Text>
      <Text style={styles.subTitle4}>{time}hr</Text>
      <View style={styles.LeftIcon}>
        <Icon
          name="md-close-circle"
          type="ionicon"
          color="#C11B17"
          size={20}
          onPress={(e) => {
            handleDelete(id);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  servicesSubCont: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 2,
    margin: 10,
    padding: 10,
    shadowColor: '#6e4c73',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  servicesSubContDrop: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 2,
    paddingLeft: 10,
    shadowColor: '#6e4c73',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2.5,
    flexDirection: 'row',
    height: 60,
    width: '90%',
    alignItems: 'center',
    marginLeft: 30,
  },
  subTitle2: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7195bf',
    padding: 3,
    paddingLeft: 6,
    marginLeft: 5,
  },
  subTitle3: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7195bf',
    padding: 3,
    left: 165,
    top: 30,
    position: 'absolute',
    zIndex: 1,
  },
  subTitle4: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7195bf',
    padding: 3,
    left: 240,
    top: 30,
    position: 'absolute',
    zIndex: 1,
  },
  LeftIcon: {
    right: 10,
    top: 20,
    position: 'absolute',
    zIndex: 1,
  },
});
