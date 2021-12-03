 
 ​/* 
 ​ * File: WebVideoPlayer.tsx 
 ​ * Project: THE NEW FLAT RATE 
 ​ * File Created: Thursday, 8th August 2019 6:44:24 pm 
 ​ * Author: Umar Aamer (umaraamer@gmail.com) 
 ​ * ----- 
 ​ * Last Modified: Wednesday, 4th March 2020 2:38:51 am 
 ​ * ----- 
 ​ * Copyright 2019 - 2019 WhileGeek, https://umar.tech 
 ​ */ 
 ​import​ ​React​,​ ​{​useEffect​,​ ​useState​}​ ​from​ ​'react'​; 
 ​import​ ​{​View​}​ ​from​ ​'react-native'​; 
 ​import​ ​{​WebView​}​ ​from​ ​'react-native-webview'​; 
 ​import​ ​{​log​}​ ​from​ ​'../Lib'​; 
 ​import​ ​{​scale​,​ ​vs​}​ ​from​ ​'react-native-size-matters'​; 
 ​import​ ​{​Text​}​ ​from​ ​'./Text'​; 
 ​import​ ​{​Loader​}​ ​from​ ​'./Loader'​; 
 ​import​ ​{​DropDownHolder​}​ ​from​ ​'./DropDownHolder'​; 
 ​import​ ​{​useScreenOrientation​}​ ​from​ ​'../Hooks'​; 
 ​import​ ​{​Colors​}​ ​from​ ​'../Themes/Colors'​; 
  
 ​interface​ ​IWebPlayerProps​ ​{ 
 ​  ​url​: ​string​;​ ​// url or id 
 ​  ​style​?: ​object​; 
 ​} 
  
 ​export​ ​default​ ​function​ ​WebVideoPlayer​(​props​: ​IWebPlayerProps​)​ ​{ 
 ​  ​const​ ​[​videoUrl​,​ ​setVideoUrl​]​ ​=​ ​useState​(​props​.​url​)​; 
  
 ​  ​const​ ​alert​ ​=​ ​DropDownHolder​.​getDropDown​(​)​; 
  
 ​  ​useEffect​(​(​)​ ​=>​ ​{ 
 ​    ​const​ ​{​url​}​ ​=​ ​props​; 
 ​    ​log​(​'got youtube id: '​,​ ​url​)​; 
  
 ​    ​try​ ​{ 
 ​      ​// ? Check if this is Youtube Video 
 ​      ​const​ ​youtubeId​ ​=​ ​url​.​split​(​'v='​)​[​1​]​; 
  
 ​      ​if​ ​(​!​youtubeId​)​ ​{ 
 ​        ​throw​ ​youtubeId​; 
 ​      ​} 
  
 ​      ​setVideoUrl​( 
 ​        ​`https://www.youtube.com/embed/​${​youtubeId​}​?autoplay=0&showinfo=0&controls=1&fullscreen=1`​, 
 ​      ​)​; 
 ​    ​}​ ​catch​ ​(​e​)​ ​{ 
 ​      ​// ? Check if this is Vimeo Video 
  
 ​      ​let​ ​vimeoId​ ​=​ ​''​; 
  
 ​      ​try​ ​{ 
 ​        ​vimeoId​ ​=​ ​url​.​substring​(​url​.​lastIndexOf​(​'/'​)​ ​+​ ​1​)​; 
  
 ​        ​// https://vimeo.com/210599507 
 ​        ​setVideoUrl​(​`https://player.vimeo.com/video/​${​vimeoId​}​`​)​; 
 ​      ​}​ ​catch​ ​(​e2​)​ ​{ 
 ​        ​alert​.​alertWithType​( 
 ​          ​'error'​, 
 ​          ​'Error'​, 
 ​          ​'Something went wrong while fetching video.'​, 
 ​        ​)​; 
 ​      ​} 
 ​    ​} 
 ​  ​}​,​ ​[​]​)​; 
  
 ​  ​const​ ​{​width​,​ height​}​ ​=​ ​useScreenOrientation​(​)​; 
  
 ​  ​// const [loading, setLoading] = useState(true) 
  
 ​  ​return​ ​( 
 ​    ​<​View​ ​style​=​{​{​flex​: ​1​,​ ​overflow​: ​'hidden'​}​}​> 
 ​      ​{​/* <TextInput value={videoUrl} /> */​} 
 ​      ​<​WebView 
 ​        ​style​=​{​{ 
 ​          ​// flex: 1, 
 ​          ​height​: ​vs​(​height​ ​/​ ​1.7​)​, 
 ​          width​, 
 ​          ​// marginVertical: 10, 
 ​          ​// width: null, 
 ​          ​// opacity: 0.99, 
 ​          ​backgroundColor​: ​Colors​.​white​, 
 ​          ...​props​.​style​, 
 ​        ​}​} 
 ​        ​startInLoadingState​=​{​true​} 
 ​        ​renderLoading​=​{​(​)​ ​=>​ ​<​Loader​ ​inModal​=​{​false​}​ ​/​>​} 
 ​        ​allowsFullscreenVideo​=​{​true​} 
 ​        ​allowsInlineMediaPlayback​=​{​true​} 
 ​        ​javaScriptEnabled​=​{​true​} 
 ​        ​// onLoadEnd={() => setLoading(false)} 
  
 ​        ​source​=​{​{ 
 ​          ​uri​: ​videoUrl​, 
 ​        ​}​} 
 ​      ​/​> 
 ​    ​<​/​View​> 
 ​  ​)​; 
 ​}
