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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function LoginScreen({navigation}) {
  const [userName, setUserName] = React.useState('');
  const [passWord, setPassWord] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const text = {
    textPlaceholder: '请输入手机号',
    passWordPlaceholder: '请输入密码',
    passWordAgainPlaceholder: '请再次确认密码',
  };

  // 注册
  const fetchData = async () => {
    try {
      console.log('开始请求...');
      const response = await fetch(
        'http://123.56.171.144:8082/api/qmab/user/register',
        {
          method: 'POST', // 请求类型
          headers: {
            'Content-Type': 'application/json', // 设置请求头
          },
          body: JSON.stringify({
            loginName: userName,
            password: passWord,
            repeatPassword: repeatPassword,
          }),
        },
      ); // 替换为你的接口URL
      console.log('响应状态:', response.status);
      if (!response.ok) {
        throw new Error('HTTP错误，状态码: ' + response.status);
      }
      const json = await response.json(); // 如果状态OK，解析JSON
      console.log('响应数据:', json);
      Alert.alert('请求成功', JSON.stringify(json));
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
      <Image
        source={require('../../static/img/mofang.png')}
        style={styles.teachImg}
      />
      <View style={styles.warp}>
        <Image
          source={require('../../static/img/logintitle.png')}
          style={styles.title}
        />
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
        <TextInput
          style={styles.input}
          placeholder={text.passWordAgainPlaceholder}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />
        <TouchableOpacity style={styles.btnWrap}>
          <LinearGradient
            colors={['#4d54fd', '#3793f9']}
            start={{x: 0.2, y: 0}}
            end={{x: 0.8, y: 1}}
            style={styles.btn}>
            <Text onPress={fetchData} style={styles.btnText}>立即注册</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tipsWrap} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.tips}>
            已有账号？
            <Text style={{color: '#4764fc'}}>去登陆</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
});

export default LoginScreen;
