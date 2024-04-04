import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import ArrowIcon from '../assets/icon/ArrowIcon';
import PhoneInput from 'react-native-phone-input';
import { CheckBox } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Authentication = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  //  const [phoneNumber, setPhoneNumber] = useState('0929635572');
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [failureModalVisible, setFailureModalVisible] = useState(false);

  const isCodeComplete = verificationCode.replace(/\s/g, '').length === 6;

  const handleSubmit = async () => {
    try {
      const requestBody = {
        phone: phoneNumber,
        otp: verificationCode
      };

      const response = await fetch('http://localhost:8080/api/v1/verification/otp/sms/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Lỗi');
      }
      const data = await response.json();
      const token = data.accessToken;
      navigation.navigate('Register', { accessToken: token });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setFailureModalVisible(true); // Hiển thị modal thông báo thất bại
    }
  };



  const handleCloseModal = () => {
    setFailureModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 5 }}>
        <ArrowIcon width={40} height={40} color="#1a1a1a" />
      </View>

      <View>
        <Text style={styles.font}>Nhập mã xác thực</Text>
      </View>

      <View>
        <Text style={{ color: '#868c92', fontSize: 13, textAlign: 'center', marginTop: 50 }}>Nhập 6 dãy số được gửi đến số điện thoại </Text>
        <Text style={{ color: '#000', fontSize: 15, textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>(+VietNam) {phoneNumber}</Text>
      </View>

      <View style={styles.phoneInputContainer}>
        <TextInput
          style={styles.input}
          value={verificationCode}
          onChangeText={value => setVerificationCode(value.replace(/\s/g, ''))} // Loại bỏ dấu cách
          keyboardType="numeric"
          maxLength={6}
        />
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isCodeComplete ? '#1c70be' : '#d3d6db' }]}
          onPress={async () => {
            handleSubmit();
          }}
          disabled={!isCodeComplete}
        >
          <Text style={{ color: isCodeComplete ? '#fff' : '#abaeb3', textAlign: 'center' }}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginLeft: 80, marginTop: 20 }}>
        <Text>Bạn không nhận được mã?</Text>
        <TouchableOpacity>
          <Text style={{ color: '#0867ef' }}> Gửi lại</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginLeft: 70, marginTop: 250 }}>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff', backgroundColor: '#0867ef', borderRadius: 100, width: 17, height: 17, textAlign: 'center', justifyContent: 'center' }}>?</Text>
          <Text style={{ color: '#0867ef', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}> Tôi cần hỗ trợ thêm về mã xác thực</Text>
        </TouchableOpacity>
      </View>
     

      {/* FAIL OTP */}
      <Modal animationType="fade" transparent={true} visible={failureModalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Nhập OTP thất bại</Text>
            <View style={styles.separator} />
            <Text style={{ fontSize: 13 }}>Có thể bạn đã gặp phải một số trường hợp:</Text>
            <br></br>
            <Text>•	Mã OTP không đúng</Text>
            <Text>• Mã OTP đã hết hiệu lực</Text>
            <TouchableOpacity onPress={() => handleCloseModal()}>
              <Text style={{ color: '#0867ef', textAlign: 'center', fontSize: 15, marginTop: 15 }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
  },
  font: {
    top: 40,
    fontSize: 25,
    color: '#1a1a1a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phoneInputContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 30,
    marginLeft: 35,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 45,
    marginTop: -20
  },
  input: {
    height: 45,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 4
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent2: {
    width: 250,
    height: 200,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 10,
    height: 10
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    marginVertical: 10,
    marginTop: 20
  },
});

export default Authentication;
