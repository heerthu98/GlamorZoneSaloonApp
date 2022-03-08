import React, { useState, useEffect } from 'react';
import { collection, orderBy, query, onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function CustomerGallery() {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const articleRef = collection(db, 'Gallery');
    const q = query(articleRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {articles.length === 0 ? (
        <Text>No Gallery found!</Text>
      ) : (
        articles.map(({ id, createdAt, imageUrl }) => (
          <View key={id}>
            <Image
              style={{ height: deviceHeight / 3, width: deviceWidth / 3 - 6, borderRadius: 10, margin: 2 }}
              source={{ uri: imageUrl }}
            />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  CustomerGallery: {
    width: '100%',
  },
});
