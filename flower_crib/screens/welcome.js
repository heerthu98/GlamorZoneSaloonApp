import { useNavigation } from '@react-navigation/core';
import React from 'react';
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
} from '../components/styles';
import { Text } from 'react-native';
import { auth } from '../firebase';

const welcome = () => {
  const navigation = useNavigation();

  // const handleSignOut = () => {
  //     auth
  //       .signOut()
  //       .then(() => {
  //         navigation.replace("Login")
  //       })
  //       .catch(error => alert(error.message))
  //   }

  return (
    <>
      <StatusBar style="light" />
      <Innercontainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/img.jpg')} />
        <WelcomeContainer>
          <PageTitle Welcome={true}>Welcome! Ladies</PageTitle>
          <SubTitle welcome={true}>GlamorZone BeautyCare</SubTitle>
          <SubTitle welcome={true}>robindivya3@gmail.com</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/img/img2.jpg')} />

            <StyledButton onPress={() => navigation.replace('Login')}>
              <ButtonText>User Login</ButtonText>
            </StyledButton>
            <Line />

            <StyledButton google={true} onPress={() => navigation.replace('AdminLogin')}>
              <ButtonText google={true}>Admin Login</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </Innercontainer>
    </>
  );
};

export default welcome;
