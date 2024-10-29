import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const screenWidth = Dimensions.get('window').width;

function HomeScreen({navigation}) {
  const [userName, setUserName] = React.useState('');
  const [passWord, setPassWord] = React.useState('');
  const text = {
    title: '全民AI播1',
    subTitle: '简单到只需一键',
    teachTitle: '开播教程',
    teachSubTitle: '直播从未如此简单',
    playTip: '开始直播',
    playTitle: '实景开播',
    playSubTitle: '手机实拍背景直播',
    contentTip: '直播内容',
    voiceTitle: '直播互动',
    voiceSubTitle: '直播话术循环播放',
    musicTitle: '背景音乐库',
    musicSubTitle: '让直播锦上添花',
  };

  // 跳转webview
  function goWebView(path) {
    navigation.navigate('Web', {path});
  }

  return (
    <ScrollView style={styles.ScrollView}>
      <LinearGradient
        colors={['#d4e4fc', '#ffffff']}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.warp}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{text.title}</Text>
            <Text style={styles.subTitle}>{text.subTitle}</Text>
          </View>
          <View style={styles.teach}>
            <TouchableOpacity onPress={() => goWebView('course')}>
              <Image
                source={require('../../static/img/banner1.png')}
                style={styles.teachImg}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.playTip}>{text.playTip}</Text>
          <View style={styles.teach}>
            <TouchableOpacity onPress={() => goWebView('select')}>
              <Image
                source={require('../../static/img/banner2.png')}
                style={styles.teachImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentWarp}>
            <Text style={styles.playTip}>{text.contentTip}</Text>
            <View style={styles.flexWarp}>
              <View style={styles.voice}>
                <TouchableOpacity onPress={() => goWebView('library')}>
                  <Image
                    source={require('../../static/img/zhiboyuyin.png')}
                    style={styles.voiceImg}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.voice}>
                <TouchableOpacity onPress={() => goWebView('libraryBgm')}>
                  <Image
                    source={require('../../static/img/beijingyinyue.png')}
                    style={styles.voiceImg}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.contentWarp}>
            <Text style={styles.playTip}>{text.voiceTitle}</Text>
            <View style={styles.flexWarp}>
              <View style={styles.voice}>
                <TouchableOpacity onPress={() => goWebView('libraryWord')}>
                  <Image
                    source={require('../../static/img/wenzichangkong.png')}
                    style={styles.voiceImg}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.voice}>
                <TouchableOpacity onPress={() => goWebView('libraryReply')}>
                  <Image
                    source={require('../../static/img/zhinenghuifu.png')}
                    style={styles.voiceImg}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    // paddingBottom: 50,
  },
  warp: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
  },
  titleBox: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    flex: 3,
    color: '#A15FF3',
  },
  subTitle: {
    fontSize: 12,
    flex: 3,
    marginTop: 15,
    color: '#999999',
    // marginLeft: 20,
  },
  teach: {
    height: 138,
    backgroundColor: '#ccc',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 13,
  },
  teachImg: {
    width: '100%',
    height: 138,
  },
  playTip: {
    marginTop: 13,
    color: '#000000',
    fontSize: 18,
  },
  play: {
    height: 140,
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  playTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  playSubTitle: {
    fontSize: 10,
  },
  contentWarp: {
    marginBottom: 10,
  },
  flexWarp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    width: '100%',
  },
  voice: {
    height: 94,
    width: screenWidth / 2 - 40,
  },
  voiceImg: {
    width: '100%',
    height: 94,
    resizeMode: 'contain', // 确保图片按比例缩放
  },
  voiceTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  voiceSubTitle: {
    fontSize: 10,
  },
  musicTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  musicSubTitle: {
    fontSize: 10,
  },
  music: {
    width: 150,
    height: 140,
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  btn: {
    height: 30,
  },
  tips: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 10,
  },
});

export default HomeScreen;
