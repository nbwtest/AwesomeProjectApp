import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  NativeModules,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}) {
  if (__DEV__) {
    console.log('开发模式已启用');
  } else {
    console.log('生产模式已启用');
  }
  const [userName, setUserName] = React.useState('');
  const [passWord, setPassWord] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  // React.useEffect(() => {
  //   console.log(11, AsyncStorage.getItem('userToken'));
  // }, []);

  const text = {
    title: '全民AI播',
    subTitle: '简单到只需一键',
    textPlaceholder: '请输入手机号',
    passWordPlaceholder: '请输入密码',
    tips: '还没注册？去注册',
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const openFloatingWindow = () => {
    NativeModules.FloatingWindow.startFloatingWindow();
  };

  // 登陆
  const fetchData = async () => {
    console.log(1111);
    try {
      console.log('开始请求...');
      const response = await fetch(
        'http://123.56.171.144:8082/api/qmab/user/login',
        {
          method: 'POST', // 请求类型
          headers: {
            'Content-Type': 'application/json', // 设置请求头
          },
          body: JSON.stringify({
            loginName: userName,
            password: passWord,
          }),
        },
      ); // 替换为你的接口URL
      console.log('响应状态:', response.status);
      if (!response.ok) {
        throw new Error('HTTP错误，状态码: ' + response.status);
      }
      const json = await response.json(); // 如果状态OK，解析JSON
      await AsyncStorage.setItem('userToken', json.data.token);
      console.log('响应数据:', json);
      navigation.navigate('Home');
      // Alert.alert('请求成功', JSON.stringify(json));
    } catch (error) {
      console.error('请求失败:', error.message);
      // Alert.alert('请求失败', error.message);
    } finally {
      console.log('请求完成');
      // setLoading(false); // 请求完成后取消loading状态
    }
  };

  return (
    <LinearGradient
      colors={['#d4e4fc', '#ffffff']}
      style={{flex: 1}}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <Text>{__DEV__}</Text>
      <TouchableOpacity onPress={openFloatingWindow}>
        <Image
          source={require('../../static/img/mofang.png')}
          style={styles.teachImg}
        />
      </TouchableOpacity>
      {/* <Image
        source={require('../../static/img/mofang.png')}
        style={styles.teachImg}
        onPress={getToken}
      /> */}
      <View style={styles.warp}>
        <Image
          source={require('../../static/img/logintitle.png')}
          style={styles.title}
        />
        {/* <Text style={styles.title}>{text.title}</Text>
        <Text style={styles.subTitle}>{text.subTitle}</Text> */}
        <TextInput
          style={styles.input}
          placeholder={text.textPlaceholder}
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder={text.passWordPlaceholder}
          value={passWord}
          onChangeText={setPassWord}
        />
        <TouchableOpacity>
          <Text onPress={toggleModal} style={styles.forget}>
            忘记密码
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrap}>
          <LinearGradient
            colors={['#4d54fd', '#3793f9']}
            start={{x: 0.2, y: 0}}
            end={{x: 0.8, y: 1}}
            style={styles.btn}>
            <Text onPress={fetchData} style={styles.btnText}>
              登陆
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tipsWrap}
          onPress={() => navigation.navigate('Sign')}>
          <Text style={styles.tips}>
            还没注册？
            <Text style={{color: '#4764fc'}}>去注册</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} style={styles.modalWarp}>
        <LinearGradient
          style={styles.modalContent}
          colors={['#d4e4fc', '#ffffff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Text style={styles.modalTitle}>重置密码</Text>
          <Text style={styles.modalSubTitle}>请联系售卖人员重置密码</Text>
          <TouchableOpacity style={styles.modalBtnWrap}>
            <LinearGradient
              colors={['#4d54fd', '#3793f9']}
              start={{x: 0.2, y: 0}}
              end={{x: 0.8, y: 1}}
              style={styles.modalBtn}>
              <Text style={styles.modalBtnText} onPress={toggleModal}>知道了</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  warp: {
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    position: 'relative',
  },
  teachImg: {
    width: 281,
    height: 260,
    position: 'absolute',
    top: 0,
    right: -100,
  },
  title: {
    marginTop: 50,
    width: 190,
    height: 148,
  },
  input: {
    paddingHorizontal: 8,
    marginTop: 24,
    height: 48,
    borderRadius: 20,
    opacity: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    color: '#cccccc',
    fontSize: 12,
    paddingLeft: 10,
  },
  btnWrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
  },
  btn: {
    height: 48,
    borderRadius: 10,
    opacity: 1,
    width: 312,
  },
  btnText: {
    textAlign: 'center',
    lineHeight: 34,
    color: '#ffffff',
    fontSize: 16,
  },
  forget: {
    marginTop: 12,
    color: '#0741f0',
    fontSize: 12,
    textAlign: 'right',
  },
  tipsWrap: {
    marginTop: 56,
  },
  tips: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#999999',
  },
  modalWarp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 312,
    height: 212,
    borderRadius: 15,
  },
  modalTitle: {
    marginTop: 18,
    color: '#0f194d',
    fontSize: 18,
    textAlign: 'center',
  },
  modalSubTitle: {
    marginTop: 36,
    color: '#0f194d99',
    fontSize: 14,
    textAlign: 'center',
  },
  modalBtnWrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
  },
  modalBtn: {
    height: 48,
    borderRadius: 10,
    opacity: 1,
    width: 250,
  },
  modalBtnText: {
    textAlign: 'center',
    lineHeight: 34,
    color: '#ffffff',
    fontSize: 14,
  },
});

export default LoginScreen;
