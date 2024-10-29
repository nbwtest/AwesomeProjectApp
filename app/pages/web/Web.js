import * as React from 'react';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WebScreen({route}) {
  const {path} = route.params;
  console.log(path);
  const webviewRef = React.useRef(null);

  React.useEffect(() => {
    // 确保 WebView 组件加载完毕后再注入 JavaScript
    const injectCookie = async () => {
      if (webviewRef.current) {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);
        const setCookie = `
        document.cookie = "token=${token}; path=/; domain=172.16.12.107; expires=Fri, 31 Dec 2030 23:59:59 GMT";
      `;
        webviewRef.current.injectJavaScript(setCookie);
      }
    };

    injectCookie();
  }, []);

  return (
    <WebView
      ref={webviewRef}
      source={{uri: `http://172.16.12.107:9016/insure/voice/${path}`}}
      style={{flex: 1}}
      javaScriptEnabled={true}
    />
  );
}
export default WebScreen;
