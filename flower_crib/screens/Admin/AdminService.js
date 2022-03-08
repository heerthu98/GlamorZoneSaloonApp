import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';

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
  Picker,
} from 'react-native';
import { GoBackLeft } from '../../components/styles';
import { auth, db } from '../../firebase';
import { addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import ImgToBase64 from 'react-native-image-base64';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AddService from './AddService';
import AddMakeup from './AddMakeup';
import AddOthers from './AddOthers';

const AdminService = (props) => {
  const navigation = useNavigation();

  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [makeupcategory, setMakeupCategory] = useState('');
  const [makeupprice, setMakeupPrice] = useState('');
  const [makeuptime, setMakeupTime] = useState('');

  const [serviceList, setServiceList] = useState([]);
  const [serviceMakupList, setMakeupServiceList] = useState([]);
  const [serviceOthersList, setOthersServiceList] = useState([]);

  // const addSrevice = useCallback(async (e) => {
  //   e.preventDefault();
  //   const { serviceName, servicePrice } = e.target.elements;
  //   try {
  //     db.ref(`service/${(serviceName.value, servicePrice.value)}`).set({
  //       serviceName: serviceName.value,
  //       servicePrice: servicePrice.value,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

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

  // useEffect(() => {
  //   db.ref('/Service/Hairstyle').on('value', (snapshot) => {
  //     setServiceList(snapshot.val());
  //   });
  // }, []);

  // function writeService() {
  //   db.ref('Service/Hairstyle/' + service).set({ price, time });
  // }

  const writeService = () => {
    const serviceRef = collection(db, 'hairstyle');
    addDoc(serviceRef, {
      category: category,
      time: time,
      price: price,
    })
      .then(() => {
        console.log('Document successfully written!');
        setCategory('');
        setTime('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const writeMakeupService = () => {
    const serviceMakeupRef = collection(db, 'MakeUp');
    addDoc(serviceMakeupRef, {
      category: category,
      time: time,
      price: price,
    })
      .then(() => {
        console.log('Document successfully written!');
        setCategory('');
        setTime('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const writeOthersService = () => {
    const serviceOthersRef = collection(db, 'Others');
    addDoc(serviceOthersRef, {
      category: category,
      time: time,
      price: price,
    })
      .then(() => {
        console.log('Document successfully written!');
        setCategory('');
        setTime('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  // const writeService = () => {
  //   const serviceRef = collection(db, 'Services');
  //   addDoc(serviceRef, {
  //     category: category,
  //     time: time,
  //     price: price,
  //   })
  //     .then(() => {
  //       console.log('Document successfully written!');
  //       setCategory('');
  //       setTime('');
  //       setPrice('');
  //     })
  //     .catch((error) => {
  //       console.error('Error writing document: ', error);
  //     });
  // };

  return (
    <>
      <StatusBar style="dark" />
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

      <Image style={styles.WelcomeImage} resizeMode="cover" source={require('../../assets/img/img7.jpg')} />
      <View style={styles.headercontainer}>
        <Image style={styles.GlamorZone} resizeMode="cover" source={require('../../assets/img/img2.jpg')} />
        <Text style={styles.PageTitle}>Our Services</Text>
        {/* <View style={styles.containerAddService}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={() => setSelectedValue()}
          >
            <Picker.Item label="Hair Style" value="Hair Style" />
            <Picker.Item label="Make Up" value="Make Up" />
          </Picker>
          <View style={styles.servicesSubContDrop}>
            <TextInput
              style={styles.inputService}
              placeholder={'Add Service'}
              value={category}
              paddingLeft={10}
              onChangeText={(e) => {
                setCategory(e);
              }}
              // onChangeText={(text) => setService(text)}
            />
            <TextInput
              style={styles.inputServicePrice}
              placeholder={'Price'}
              value={price}
              paddingLeft={10}
              onChangeText={(e) => {
                setPrice(e);
              }}
              // onChangeText={(text) => setPrice(text)}
            />
            <TextInput
              style={styles.inputServiceTime}
              placeholder={'Time'}
              value={time}
              paddingLeft={10}
              onChangeText={(e) => {
                setTime(e);
              }}
              // onChangeText={(text) => setTime(text)}
            />
            <View style={styles.LeftIcon}>
              <Icon name="md-add-circle" type="ionicon" color="#6d28d9" size={20} onPress={writeService} />
            </View>
          </View>
        </View> */}
      </View>

      <ScrollView>
        <View style={styles.servicesContainerMain}>
          <View style={styles.servicesSubCont}>
            <TouchableOpacity style={styles.TextLink} onPress={toggleModal}>
              <View style={styles.service}>
                <Image
                  style={styles.serviceImg}
                  resizeMode="cover"
                  source={require('../../assets/img/hairservice.png')}
                  backgroundColor={'#E38AAE'}
                />
                <Text style={styles.subTitle}>Hair Style</Text>
                <Icon name="md-arrow-down" type="ionicon" color="#6d28d9" size={25} paddingLeft={120} />
              </View>
            </TouchableOpacity>
          </View>

          {modal && (
            <View>
              <View style={styles.servicesSubContDrop}>
                <TextInput
                  style={styles.inputService}
                  placeholder={'Add Service'}
                  value={category}
                  paddingLeft={10}
                  onChangeText={(e) => {
                    setCategory(e);
                  }}
                  // onChangeText={(text) => setService(text)}
                />
                <TextInput
                  style={styles.inputServicePrice}
                  placeholder={'Price'}
                  value={price}
                  paddingLeft={10}
                  onChangeText={(e) => {
                    setPrice(e);
                  }}
                  // onChangeText={(text) => setPrice(text)}
                />
                <TextInput
                  style={styles.inputServiceTime}
                  placeholder={'Time'}
                  value={time}
                  paddingLeft={10}
                  onChangeText={(e) => {
                    setTime(e);
                  }}
                  // onChangeText={(text) => setTime(text)}
                />
                <View style={styles.LeftIcon}>
                  <Icon name="md-add-circle" type="ionicon" color="#6d28d9" size={20} onPress={writeService} />
                </View>
              </View>

              {/* {Object.keys(serviceList).map((key, index, time) => {
                return (
                  <View style={styles.servicesSubContDrop} key={(index, time)}>
                    <Icon name="md-arrow-forward" type="ionicon" color="#BB6286" size={25} />
                    <TextInput style={styles.subTitle2}>{key}</TextInput>
                    <TextInput style={styles.subTitle3}>Rs.{serviceList[key]}</TextInput>
                    <TextInput style={styles.subTitle4}>{serviceList[time]}min</TextInput>
                    <View style={styles.LeftIcon}>
                      <Icon name="md-close-circle" type="ionicon" color="#C11B17" size={20} onPress={() => {}} />
                    </View>
                  </View>
                );
              })} */}

              {/* {serviceList.map((s) => {
                return (
                  <View style={styles.servicesSubContDrop} key={s.id}>
                    <Icon name="md-arrow-forward" type="ionicon" color="#BB6286" size={25} />
                    <TextInput style={styles.subTitle2} service={s.category}>
                      {service}
                    </TextInput>
                    <TextInput style={styles.subTitle3} price={s.price}>
                      Rs.{price}
                    </TextInput>
                    <TextInput style={styles.subTitle3} time={s.time}>
                      {time}
                    </TextInput>
                    <View style={styles.LeftIcon}>
                      <Icon name="md-close-circle" type="ionicon" color="#C11B17" size={20} onPress={() => {}} />
                    </View>
                  </View>
                );
              })} */}
              {serviceList.map((s) => {
                return <AddService key={s.id} category={s.category} time={s.time} price={s.price} id={s.id} />;
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
                    source={require('../../assets/img/makeup.png')}
                    backgroundColor={'#E3A735'}
                  />
                  <Text style={styles.subTitle}>MakeUp</Text>

                  <Icon name="md-arrow-down" type="ionicon" color="#6d28d9" size={25} paddingLeft={135} />
                </View>
              </TouchableOpacity>
            </View>
            {modal1 && (
              <View>
                <View style={styles.servicesSubContDrop}>
                  <TextInput
                    style={styles.inputService}
                    placeholder={'Add Service'}
                    value={category}
                    paddingLeft={10}
                    onChangeText={(e) => {
                      setCategory(e);
                    }}
                    // onChangeText={(text) => setService(text)}
                  />
                  <TextInput
                    style={styles.inputServicePrice}
                    placeholder={'Price'}
                    value={price}
                    paddingLeft={10}
                    onChangeText={(e) => {
                      setPrice(e);
                    }}
                    // onChangeText={(text) => setPrice(text)}
                  />
                  <TextInput
                    style={styles.inputServiceTime}
                    placeholder={'Time'}
                    value={time}
                    paddingLeft={10}
                    onChangeText={(e) => {
                      setTime(e);
                    }}
                    // onChangeText={(text) => setTime(text)}
                  />
                  <View style={styles.LeftIcon}>
                    <Icon name="md-add-circle" type="ionicon" color="#6d28d9" size={20} onPress={writeMakeupService} />
                  </View>
                </View>

                {serviceMakupList.map((s) => {
                  return <AddMakeup key={s.id} category={s.category} time={s.time} price={s.price} id={s.id} />;
                })}
              </View>
            )}
          </View>

          <View style={styles.servicesContainer}>
            <View style={styles.servicesSubCont}>
              <TouchableOpacity style={styles.TextLink} onPress={toggleModal2}>
                <View style={styles.service}>
                  <Image
                    style={styles.serviceImg}
                    resizeMode="cover"
                    source={require('../../assets/img/facial.png')}
                    backgroundColor={'#438D80'}
                  />
                  <Text style={styles.subTitle}>Other Services</Text>

                  <Icon name="md-arrow-down" type="ionicon" color="#6d28d9" size={25} paddingLeft={80} />
                </View>
              </TouchableOpacity>
            </View>
            {modal2 && (
              <View>
                <View style={styles.servicesSubContDrop}>
                  <TextInput
                    style={styles.inputService}
                    placeholder={'Add Service'}
                    value={category}
                    paddingLeft={10}
                    onChangeText={(e) => {
                      setCategory(e);
                    }}
                    // onChangeText={(text) => setService(text)}
                  />
                  <TextInput
                    style={styles.inputServicePrice}
                    placeholder={'Price'}
                    value={price}
                    paddingLeft={10}
                    onChangeText={(e) => {
                      setPrice(e);
                    }}
                    // onChangeText={(text) => setPrice(text)}
                  />
                  <TextInput
                    style={styles.inputServiceTime}
                    placeholder={'Time'}
                    value={time}
                    paddingLeft={10}
                    onChangeText={(e) => {
                      setTime(e);
                    }}
                    // onChangeText={(text) => setTime(text)}
                  />
                  <View style={styles.LeftIcon}>
                    <Icon name="md-add-circle" type="ionicon" color="#6d28d9" size={20} onPress={writeOthersService} />
                  </View>
                </View>

                {serviceOthersList.map((s) => {
                  return <AddOthers key={s.id} category={s.category} time={s.time} price={s.price} id={s.id} />;
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AdminService;

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
    height: '35%',
    width: '100%',
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
    elevation: 2.5,
    flexDirection: 'row',
    height: 60,
    width: '90%',
    alignItems: 'center',
    marginLeft: 30,
  },
  inputService: {
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFF',
    marginTop: 7,
    fontSize: 15,
    width: 140,
    marginRight: 10,
  },
  inputServicePrice: {
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFF',
    marginTop: 7,
    fontSize: 15,
    width: 60,
    marginRight: 10,
  },
  inputServiceTime: {
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFF',
    marginTop: 7,
    fontSize: 15,
    width: 60,
    marginRight: 10,
  },
  LeftIcon: {
    right: 10,
    top: 20,
    position: 'absolute',
    zIndex: 1,
  },
  LeftIcon1: {
    right: -105,
    top: 20,
    position: 'absolute',
    zIndex: 1,
  },
  containerAddService: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});
