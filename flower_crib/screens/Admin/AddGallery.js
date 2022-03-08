import { View, Text, Button, Alert, StyleSheet, Image, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../firebase';
//import { Timestamp } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import { Timestamp, collection, addDoc } from 'firebase/firestore';

export default function AddGallery() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const handleDocumentSelection = () => {
    DocumentPicker.getDocumentAsync({
      type: 'image/*',
    }).then((res) => {
      setImage(res);
      console.log('image', image);
    });
  };

  const handleUpload = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', (snapshot) => {
      setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000);
    });

    console.log(image);
    return;
    if (!image) {
      alert('Select an image from photo library');
      return;
    }
    const storageRef = ref(storage, `images/${Date.now()}${image.name}`);
    const metadata = {
      contentType: image.mimeType,
    };
    const uploadTask = uploadBytesResumable(storageRef, image.file, metadata);
    console.log(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setImage({
          image: '',
        });

        getDownloadURL(uploadTask.snapshot.ref).then((image) => {
          const articleRef = collection(db, 'Gallery');
          addDoc(articleRef, {
            imageUrl: image,
            createAt: Timestamp.now().toDate(),
          })
            .then(() => {
              Alert.alert('Gallery added Successfully');
              setProgress(0);
            })
            .catch((err) => {
              Alert.alert('Error adding Gallery');
            });
        });
      },
    );
  };

  return (
    <View>
      <View style={styles.addprf}>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Icon name="add-outline" type="ionicon" color="#6d28d9" size={30} />
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('modal has been closed');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.addgallery}>
          <View style={styles.modalView}>
            <Text style={styles.addgallerytitle}>UploadGallery</Text>
            <Pressable style={styles.galleryclose} onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" type="ionicon" color="#6d28d9" size={25} />
            </Pressable>
            {/* <Image source={{ uri: image }} style={{width: 300, height:250}} /> */}
            {progress === 0 ? null : (
              <View style={styles.progressbar}>
                <Text style={{ width: `${progress}%` }}>{`uploading image ${progress}%`}</Text>
              </View>
            )}

            {/* <Button title="Select 📑" onPress={handleDocumentSelection} /> */}
            {/* <Button title="Upload 📤" onPress={handleUpload} /> */}
            <View style={styles.addgallerybtn1}>
              <Button
                name="image"
                color="#6d28d9"
                title="Pick Image in photo library"
                onPress={handleDocumentSelection}
              />
            </View>

            <Button color="#6d28d9" title="Upload" onPress={handleUpload} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  addprf: {
    width: '20%',
    // marginRight: 20,
    marginLeft: 310,
    backgroundColor: '#e5e7eb',
    padding: 20,
    borderRadius: 150,
    marginTop: 20,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addgallerytitle: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5185c2',
    // paddingTop: 10,
    marginTop: -20,
    marginBottom: 10,
  },
  galleryclose: {
    marginTop: -35,
    marginLeft: 220,
  },
  addgallery: {
    flex: 1,
    marginTop: 250,
    justifyContent: 'center',
  },
  addgallerybtn1: {
    marginBottom: 10,
    marginTop: 10,
    // width: '50%',
  },
  addgallerybtn2: {
    marginBottom: 10,
  },
  progressbar: {
    marginTop: 3,
    borderWidth: 1,
    backgroundColor: '#5185c2',
    borderRadius: 10,
  },
});
