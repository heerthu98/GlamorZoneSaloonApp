import React, { useState, useEffect } from 'react';
import { collection, orderBy, query, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function ViewGallery() {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const articleRef = collection(db, 'Gallery');
    const q = query(articleRef);
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(articles);
      setArticles(articles);
      // console.log(articles);
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
  // img_grid:{
  //     // margin: '20px auto',
  //     display: 'flex',
  //     flexDirection: 'row',flexWrap: 'wrap',
  //     // gridTempletColumns:'1fr 1fr 1fr',
  //     backgroundColor: 'red',
  //     // gridGap: '40px',
  // },
  // img_wrap: {
  //     // overflow:'hidden',
  //     // height: 0,
  //     // padding: '50% 0',
  //     // position: 'relative',
  //     opacity: 0.8,
  //     backgroundColor: 'blue',
  // }
});
