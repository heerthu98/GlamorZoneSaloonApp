import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Icon } from 'react-native-elements';
import { Line } from '../components/styles';

export default function ReviewView({ review, user, ratting, createdate, id }) {
  // const handleDelete = () => {
  //     deleteDoc(doc(db, "Reviews", id))
  //     .then(() => {
  //         console.log("Sucessfully Deleted");
  //     }).catch((error) => {
  //         console.log("Error: ", error);
  //     });
  // }
  return (
    <ScrollView>
      <View>
        <View style={styles.viewreview}>
          <Text style={styles.viewname}>{user}</Text>
          <View style={styles.viewstar}>
            {[...Array(ratting)].map((star) => {
              return <Icon name="star" type="ionicon" size={20} color={'#ffc107'} value={ratting} />;
            })}
          </View>
          <Text style={styles.viewcontent}>{review}</Text>
          <Line />
          {/* <Text>{createdate}</Text> */}
          {/* <Button style={styles.deleteButton} title={"Delete"} onPress={(e) => {handleDelete(id)} }/> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewreview: {
    padding: 10,
    marginTop: 5,
    width: '95%',
    justifyContent: 'center',
  },
  viewname: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  viewcontent: {
    textAlign: 'left',
    fontSize: 15,
    paddingLeft: 10,
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
  viewstar: {
    flexDirection: 'row',
    textAlign: 'left',
    paddingLeft: 10,
  },
});
