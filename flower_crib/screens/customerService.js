import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Innercontainer,
  PageTitle,
  StyledFormArea,
  SubTitle,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  Avatar,
  WelcomeImage,
  StyledButtonSub,
} from '../components/styles';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TextLink,
  TouchableOpacity,
  View,
  TextLinkContent,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { db } from '../firebase';
import { addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import ImgToBase64 from 'react-native-image-base64';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Button } from 'react-native-elements/dist/buttons/Button';
import ViewService from './CustomerViewServices';
import ViewMakeup from './CustomerViewMakeup';
import ViewOtherService from './CustomerViewOthersService';

const CustomerService = (props) => {
  const navigation = useNavigation();

  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [serviceMakupList, setMakeupServiceList] = useState([]);
  const [serviceOthersList, setOthersServiceList] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  useEffect(() => {
    const serviceRef = collection(db, 'hairstyle');
    const q = query(serviceRef, orderBy('category', 'asc'));

    onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServiceList(services);
      console.log(services);
    });
  }, []);

  useEffect(() => {
    const serviceMakeupRef = collection(db, 'MakeUp');
    const q = query(serviceMakeupRef, orderBy('category', 'asc'));

    onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMakeupServiceList(services);
      console.log(services);
    });
  }, []);

  useEffect(() => {
    const serviceOthersRef = collection(db, 'Others');
    const q = query(serviceOthersRef, orderBy('category', 'asc'));

    onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOthersServiceList(services);
      console.log(services);
    });
  }, []);

  return (
    <>
      <View style={styles.servicesContainerMain}>
        <ScrollView>
          <View style={styles.servicesSubCont}>
            <TouchableOpacity style={styles.TextLink} onPress={toggleModal}>
              <View style={styles.service}>
                <Image
                  style={styles.serviceImg}
                  resizeMode="cover"
                  source={require('../assets/img/hairservice.png')}
                  backgroundColor={'#E38AAE'}
                />
                <Text style={styles.subTitle}>Hair Style</Text>
                <Icon name="md-arrow-down" type="ionicon" color="#6d28d9" size={25} paddingLeft={120} />
              </View>
            </TouchableOpacity>
          </View>

          {modal && (
            <View>
              {serviceList.map((s) => {
                return <ViewService key={s.id} category={s.category} time={s.time} price={s.price} id={s.id} />;
              })}
            </View>
          )}

          <View style={styles.servicesContainer}>
            <View style={styles.servicesSubCont}>
              <TouchableOpacity style={styles.TextLink} onPress={toggleModal1}>
                <View style={styles.service}>
                  <Image
                    style={styles.serviceImg}
                    resizeMode="cover"
                    source={require('../assets/img/makeup.png')}
                    backgroundColor={'#E3A735'}
                  />
                  <Text style={styles.subTitle}>MakeUp</Text>
                  <Icon name="md-arrow-down" type="ionicon" color="#6d28d9" size={25} paddingLeft={135} />
                </View>
              </TouchableOpacity>
            </View>

            {modal1 && (
              <View>
                {serviceMakupList.map((s) => {
                  return <ViewMakeup key={s.id} category={s.category} time={s.time} price={s.price} id={s.id} />;
                })}
              </View>
            )}
            {/* <View style={styles.servicesSubContDrop}>
              <Icon name="md-arrow-forward" type="ionicon" color="#B17503" size={25} paddingLeft={-15} />
              <Text style={styles.subTitle2}>Wedding Makeup</Text>
            </View>
            <View style={styles.servicesSubContDrop}>
              <Icon name="md-arrow-forward" type="ionicon" color="#B17503" size={25} paddingLeft={-15} />
              <Text style={styles.subTitle2}>Registration Makeup</Text>
            </View> */}
          </View>

          <View style={styles.servicesSubCont}>
            <TouchableOpacity style={styles.TextLink} onPress={toggleModal2}>
              <View style={styles.service}>
                <Image
                  style={styles.serviceImg}
                  resizeMode="cover"
                  source={require('../assets/img/facial.png')}
                  backgroundColor={'#438D80'}
                />
                <Text style={styles.subTitle}>Other Services</Text>
                <Icon name="md-arrow-down" type="ionicon" color="#6d28d9" size={25} paddingLeft={80} />
              </View>
            </TouchableOpacity>
          </View>

          {modal2 && (
            <View>
              {serviceOthersList.map((s) => {
                return <ViewOtherService key={s.id} category={s.category} time={s.time} price={s.price} id={s.id} />;
              })}
            </View>
          )}
        </ScrollView>
      </View>
      {/* <View style={styles.BookNowBtnContainer}>
        <View style={styles.BookNowBtn}>
          <Button title={'Book Now'} onPress={() => navigation.replace('SelectedService')} />
        </View>
      </View> */}
    </>
  );
};

export default CustomerService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  dropdown: {
    borderLeftWidth: 2,
    borderLeftColor: '#6d28d9',
    height: 60,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  WelcomeImage: {
    height: '30%',
    minWidth: '100%',
  },
  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe2f2',
  },

  GlamorZone: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginTop: -50,
  },
  PageTitle: {
    textAlign: 'left',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#6d28d9',
    paddingBottom: 5,
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3872b5',
    paddingLeft: 6,
    padding: 3,
    marginLeft: 5,
  },
  subTitle2: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingLeft: 6,
    padding: 3,
    marginLeft: 5,
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

  StyledButton: {
    padding: 10,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  servicesContainerMain: {
    flex: 1,
    width: '100%',
    marginBottom: 0,
  },
  servicesContainer: {
    flex: 1,
    width: '100%',
  },
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
  service: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: '#6d28d9',
    marginTop: 5,
  },
  serviceImg: {
    height: 60,
    width: 60,
    marginRight: 5,
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
    elevation: 5,
    flexDirection: 'row',
    height: 60,
    width: '80%',
    alignItems: 'center',
    marginLeft: 60,
  },

  LeftIcon: {
    right: 15,
    top: 20,
    position: 'absolute',
    zIndex: 1,
  },
  BookNowBtn: {
    margin: 3,
    backgroundColor: '#6d28d9',
    height: 45,
    borderRadius: 5,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookNowBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
