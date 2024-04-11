import React from 'react';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import ArrowIcon from '../assets/icon/ArrowIcon';
import { Avatar } from 'react-native-elements';
import { RadioButton } from "react-native-paper";

const DetailProfile = ({ navigation, route }) => {
  const [coverPhoto, setCoverPhoto] = useState(require("../assets/profileTest/wall3.jpg"));
  const defaultAvatar = require('../assets/profileTest/avatar.jpg')
  const [newFirstName, setNewFirstName] = useState('');
  const [newlastName, setNewLastName] = useState('');
  const [newBirthday, setNewBirthday] = useState('');
  const [newGender, setNewGender] = useState();
  const [thumbnailAvatar, setThumbnailAvatar] = useState('');

  const { data } = route.params;
  // console.log(data);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ProfileScreen')}>
            <ArrowIcon width={30} height={30} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 13, left: 50 }}>Chỉnh sửa thông tin</Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row' }}>
          <Avatar
            size={70}
            rounded={true}
            source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
          />
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"" + data.firstName}
              onChangeText={(text) => setNewFirstName(text)}
            // value={data.firstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"" + data.lastName}
              onChangeText={(text) => setNewLastName(text)}
            // value={data.lastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <RadioButton.Group
              onValueChange={(newValue) => {
                // Ensure newValue is defined
                if (typeof newValue !== 'undefined') {
                  setNewGender(newValue === "true" ? true : false);
                }
              }}
              value={newGender ? "true" : "false"} // Set value based on boolean newGender
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <RadioButton value="true" />
                </View>
                <Text>Nam</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <RadioButton value="false" />
                </View>
                <Text>Nữ</Text>
              </View>
            </RadioButton.Group>

          </View>
          <TouchableOpacity style={{
            width: 300,
            height: 30,
            borderRadius: 20,
            backgroundColor: '#009bf8',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginLeft: -15
          }}>
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>Chỉnh sửa</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    marginTop: 20,
    marginLeft: 20
  },
  profileText: {
    fontSize: 15,
    paddingTop: 20,
    marginLeft: 10
  },

});

export default DetailProfile;