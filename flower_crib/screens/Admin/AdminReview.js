import React, { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/core';
import ReviewView from '../ReviewView';
import { useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase';

import { Icon } from 'react-native-elements';
// import { ScrollView } from "react-native-gesture-handler";

export default function CustomerReview() {
  // const navigation = useNavigation();
  const [Reviews, setReviews] = useState([]);
  useEffect(() => {
    const reviewsRef = collection(db, 'Reviews');
    const q = query(reviewsRef, orderBy('createdate', 'desc'));

    onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviews);
      console.log(reviews);
    });
  }, []);
  return (
    <ScrollView>
      <View>
        <Text style={styles.viewTitle}>All Customer Reviews ({Reviews.length})</Text>

        {Reviews.map((s) => {
          return (
            <ReviewView key={s.id} review={s.review} name={s.name} ratting={s.ratting} createdate={s.createdate} />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewTitle: {
    textAlign: 'left',
    width: '70%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5185c2',
    marginTop: 7,
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
