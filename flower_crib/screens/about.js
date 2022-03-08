import { useNavigation } from '@react-navigation/core'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Innercontainer, PageTitle, StyledFormArea, SubTitle,  StyledButton, ButtonText,  Line, WelcomeContainer, Avatar, WelcomeImage, StyledButtonSub} from '../components/styles';
import { KeyboardAvoidingView, StyleSheet, Text, TextLink, TouchableOpacity, View, TextLinkContent , Image} from 'react-native'
import { auth } from '../firebase'
import { Icon } from 'react-native-elements';



const about = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
      }

    return(
        <>
            <StatusBar style="light"/>
            <View style={styles.Innercontainer}>
  
                    <Image style={styles.WelcomeImage} resizeMode='cover' source={require('./../assets/img/img5.jpg')} />
                    <View style={styles.ExtraView}>
                    <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                    <Icon name='md-globe' type='ionicon' color='#cf18e8'size={30}/>
                                    <Text style={styles.TextLinkContent}> Website</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                <Icon name='md-call' type='ionicon' color='#cf18e8'size={30}/>
                                    <Text style={styles.TextLinkContent}>Call</Text>
                                </TouchableOpacity> 
                                <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                <Icon name='md-navigate' type='ionicon' color='#cf18e8'size={30}/>
                                    <Text style={styles.TextLinkContent}> Direction</Text>
                                </TouchableOpacity>  
                                <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                <Icon name='md-share' type='ionicon' color='#cf18e8'size={30}/>
                                    <Text style={styles.TextLinkContent}> Share</Text>
                                </TouchableOpacity>  
                                </View>

                                <View style={styles.StylistContainer}>
                                <Text style={styles.PageTitle} >Our Stylists</Text>
                                <View style={styles.Stylist}> 
                                <View style={styles.StylistPhotos}>   
                                <Image style={styles.StylistImage}  source={require('./../assets/img/stylist1.jpg')} />
                                <Text>   Divya</Text>
                                </View>
                                <View style={styles.StylistPhotos}>    
                                <Image style={styles.StylistImage}  source={require('./../assets/img/stylist2.jpg')} />
                                <Text>   Thushi</Text>
                                </View>
                                </View>
                                </View>

                                <View style={styles.ExtraViewContainer}>
                    <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                    <Text style={styles.TextLinkContent}> About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                    <Text style={styles.TextLinkContent}>Gallery</Text>
                                </TouchableOpacity> 
                                <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                    <Text style={styles.TextLinkContent}> Service</Text>
                                </TouchableOpacity>  
                                <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                                    <Text style={styles.TextLinkContent}> Review</Text>
                                </TouchableOpacity>  
                                </View> 

                                <View style={styles.openingHoursContainer}>
                                <Text style={styles.subTitle} >Opening Hours</Text>
                                <View style={styles.openingHoursSubCont}>

                                <View style={styles.openingHours}>
                                <Icon name='md-timer' type='ionicon' color='#cf18e8' size={20} paddingRight={5}/>
                                <View>
                                <Text style={styles.weekdayOpen} >Monday - Friday</Text>
                                <Text style={styles.hoursOpen} >8.30 AM - 6.00 PM</Text>
                                </View>
                                </View>
                                <View style={styles.openingHours}>
                                <Icon name='md-timer' type='ionicon' color='#cf18e8' size={20} paddingRight={5} />
                                <View>
                                <Text style={styles.weekdayOpen} >Saturday - Sunday</Text>
                                <Text style={styles.hoursOpen} >9.00 AM - 8.00 PM</Text>
                                </View>
                                </View>
                                </View>
                                    </View>  
                                    <View style={styles.Line} />
                                    <View style={styles.openingHoursContainer}>
                                <Text style={styles.subTitle} >Address</Text>
                                <Text style={styles.addressStreet} >GlomorZone, Depot Road, Kilinochchi</Text>
                                <View style={styles.openingHoursSubCont}>
                                </View>
                                </View>


                    <WelcomeContainer >                                     
                        <StyledFormArea>                          
                            <Line />
                            <StyledButtonSub onPress={handleSignOut}>
                                <ButtonText>Book Now</ButtonText>
                            </StyledButtonSub>                           
                        </StyledFormArea>


                    </WelcomeContainer>
                   
            </View>
        </>
    );
};



export default about;

const styles = StyleSheet.create({
    Innercontainer: {
        flex: 1,
        width: '100%',
        
    },

    WelcomeImage: {
        height: '27%',
        minWidth: '100%',
    },

    TextLink: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    TextLinkContent: {
        color: "#cf18e8",
        fontSize: 15,
    },
    ExtraView: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5, 
      backgroundColor: '#dfe2f2', 
    },
    StylistContainer: {
        padding: 4, 
  
    },
    Stylist:{
        display: 'flex',
        flexDirection: 'row',
    },
    StylistPhotos: {
        paddingLeft: 10,
    },
    PageTitle: {
        textAlign:'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5185c2',
        paddingBottom: 5,
       
    },
    StylistImage:{
        width:55,
        height: 55,
        margin: 'auto',
        borderWidth: 2,
        borderColor:'#e5e7eb',
        borderRadius: 3,

    },
    ExtraViewContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20, 
        backgroundColor: '#dfe2f2',  
    },
    openingHoursContainer:{
      
    },
    subTitle:{
        textAlign:'left',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7195bf',
        padding: 5,
    },
    openingHoursSubCont:{
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,

    },
    openingHours:{
        paddingLeft: 20,
        flexDirection: 'row',
            // justifyContent: "space-between",
    },
    weekdayOpen:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#8daacc',
    },
    hoursOpen: {
        fontSize: 15,
        color: '#7195bf',
    },
    Line:{
        justifyContent: 'center',
        alignItems:'center',
        height: 1,
        width: '90%',
        backgroundColor: '#9ca3af',
        marginVertical: 10,
        marginLeft: '5%'
    },
    addressStreet: {
        paddingLeft: 30,
        fontSize: 15,
        color: '#7195bf',
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
    ButtonText: {

    },

  });