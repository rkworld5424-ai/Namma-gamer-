import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable, StyleSheet, Alert, Linking, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as Clipboard from 'expo-clipboard';
import { VideoView, useVideoPlayer } from 'expo-video';
import { StatusBar } from 'expo-status-bar';

const CYAN='#27E0E9', PURPLE='#A020F0', BG='#080711', PANEL='#131522', MUTED='#A7B1C5';
function VideoPreview({uri}) {
  const player=useVideoPlayer(uri, p=>{p.loop=false;});
  return <VideoView player={player} style={styles.video} nativeControls contentFit="contain"/>;
}
export default function App(){
 const [video,setVideo]=useState(null);
 const [title,setTitle]=useState('');
 const [description,setDescription]=useState('Welcome back to Namma Gamer! 🎮\\nWatch till the end and subscribe for more Kannada gaming videos.');
 const [tags,setTags]=useState('Namma Gamer, gaming, Kannada gaming, gameplay');
 const [kind,setKind]=useState('Gaming');
 async function pickVideo(){
   try {
    const result=await DocumentPicker.getDocumentAsync({type:'video/*',copyToCacheDirectory:true,multiple:false});
    if(!result.canceled && result.assets?.length){
      const f=result.assets[0]; setVideo(f);
      if(!title) setTitle(f.name.replace(/\.[^/.]+$/,'').replace(/[_-]/g,' '));
    }
   } catch(e){Alert.alert('Could not select video','Please try selecting the video again.');}
 }
 async function copyDetails(){
   const details=`Title: ${title}\n\nDescription:\n${description}\n\nTags: ${tags}\nVideo type: ${kind}`;
   await Clipboard.setStringAsync(details);
   Alert.alert('Copied','Your video details are ready to paste into YouTube Studio.');
 }
 async function openStudio(){
   const url='https://studio.youtube.com/';
   try { await Linking.openURL(url); } catch(e){Alert.alert('Could not open YouTube Studio','Open https://studio.youtube.com/ in your browser.');}
 }
 return <SafeAreaView style={styles.safe}><StatusBar style="light"/><ScrollView contentContainerStyle={styles.container}>
   <View style={styles.header}><View style={styles.logo}><Text style={styles.logoText}>NG</Text></View><View><Text style={styles.brand}>NAMMA <Text style={{color:CYAN}}>GAMER</Text></Text><Text style={styles.subbrand}>NATIVE CREATOR STUDIO</Text></View></View>
   <View style={styles.hero}><Text style={styles.eyebrow}>GAMING VIDEO WORKSPACE</Text><Text style={styles.headline}>YOUR NEXT VIDEO.{"\n"}<Text style={{color:CYAN}}>YOUR NEXT LEVEL.</Text></Text><Text style={styles.muted}>Prepare your gameplay video, add details, and continue to YouTube Studio to publish.</Text></View>
   <View style={styles.panel}><Text style={styles.eyebrow}>01 / YOUR VIDEO</Text><Text style={styles.heading}>Upload a gameplay video</Text>
    <Pressable style={styles.pickButton} onPress={pickVideo}><Text style={styles.pickIcon}>⇧</Text><Text style={styles.buttonText}>{video?'Choose a different video':'Select video from your device'}</Text><Text style={styles.small}>MP4, MOV and other supported video formats</Text></Pressable>
    {video && <View style={{marginTop:14}}><VideoPreview uri={video.uri}/><Text style={styles.fileName}>{video.name}</Text><Text style={styles.small}>{video.size ? `${(video.size/1048576).toFixed(1)} MB` : 'Video selected'}</Text></View>}
    <View style={styles.section}><Text style={styles.eyebrow}>02 / VIDEO DETAILS</Text><Text style={styles.heading}>Make it ready to publish</Text></View>
    <Text style={styles.label}>VIDEO TITLE</Text><TextInput style={styles.input} value={title} maxLength={100} onChangeText={setTitle} placeholder="Epic GTA 5 Chase 😱 Kannada Gameplay" placeholderTextColor="#68748A"/>
    <Text style={styles.label}>DESCRIPTION</Text><TextInput style={[styles.input,styles.multiline]} value={description} onChangeText={setDescription} multiline textAlignVertical="top" placeholder="Write your video description..." placeholderTextColor="#68748A"/>
    <Text style={styles.label}>TAGS (SEPARATE WITH COMMAS)</Text><TextInput style={styles.input} value={tags} onChangeText={setTags} placeholder="gaming, gameplay, Kannada gaming" placeholderTextColor="#68748A"/>
    <Text style={styles.label}>VIDEO TYPE</Text><View style={styles.chips}>{['Gaming','YouTube Shorts','Livestream highlight','Walkthrough'].map(x=><Pressable key={x} onPress={()=>setKind(x)} style={[styles.chip,kind===x&&styles.chipSelected]}><Text style={[styles.chipText,kind===x&&{color:BG}]}>{x}</Text></Pressable>)}</View>
    <Pressable style={styles.primary} onPress={copyDetails}><Text style={styles.primaryText}>▣  COPY VIDEO DETAILS</Text></Pressable><Pressable style={styles.secondary} onPress={openStudio}><Text style={styles.secondaryText}>▶  CONTINUE TO YOUTUBE STUDIO ↗</Text></Pressable>
    <Text style={styles.disclaimer}>This app selects and previews your video on your device and prepares its metadata. Final upload, thumbnail, audience and visibility settings are completed in YouTube Studio. Direct upload through the YouTube API is not configured in this starter version.</Text>
   </View><Text style={styles.footer}>🎮  BUILT FOR NAMMA GAMER  •  PLAY / RECORD / REPEAT</Text>
 </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({
 safe:{flex:1,backgroundColor:BG},container:{padding:18,paddingBottom:34,maxWidth:720,width:'100%',alignSelf:'center'},
 header:{flexDirection:'row',alignItems:'center',gap:12,paddingVertical:10,borderBottomWidth:1,borderBottomColor:'#2A263A'},
 logo:{width:48,height:48,borderRadius:24,borderWidth:2,borderColor:PURPLE,backgroundColor:'#1C1030',alignItems:'center',justifyContent:'center'},logoText:{fontWeight:'900',fontSize:17,color:CYAN},
 brand:{fontSize:22,fontWeight:'900',letterSpacing:1,color:'white'},subbrand:{fontSize:9,letterSpacing:2,color:'#8C90A8',marginTop:2},
 hero:{paddingVertical:30},eyebrow:{color:CYAN,fontSize:10,fontWeight:'900',letterSpacing:2},headline:{fontSize:35,fontWeight:'900',color:'white',lineHeight:39,marginVertical:12},muted:{color:MUTED,fontSize:14,lineHeight:22},
 panel:{backgroundColor:PANEL,borderWidth:1,borderColor:'#302B45',borderRadius:17,padding:17},heading:{fontSize:23,fontWeight:'900',color:'white',marginTop:8,marginBottom:17},
 pickButton:{backgroundColor:'#0C0C19',borderWidth:1,borderColor:'#5A347C',borderStyle:'dashed',borderRadius:13,padding:20,alignItems:'center',gap:9},pickIcon:{color:CYAN,fontSize:32,fontWeight:'900'},buttonText:{color:'white',fontWeight:'800',textAlign:'center'},small:{color:'#8C96AD',fontSize:11,textAlign:'center',lineHeight:17},video:{width:'100%',height:220,backgroundColor:'#03030A',borderRadius:10},fileName:{color:'white',fontWeight:'700',marginTop:10},
 section:{marginTop:28,marginBottom:4},label:{color:'#C8CEE0',fontSize:10,fontWeight:'900',letterSpacing:1.3,marginTop:16,marginBottom:8},input:{backgroundColor:'#0B0C16',borderColor:'#373148',borderWidth:1,borderRadius:9,paddingHorizontal:13,paddingVertical:13,color:'white',fontSize:14},multiline:{minHeight:110},chips:{flexDirection:'row',flexWrap:'wrap',gap:8},chip:{borderWidth:1,borderColor:'#4A405F',borderRadius:20,paddingVertical:9,paddingHorizontal:12},chipSelected:{backgroundColor:CYAN,borderColor:CYAN},chipText:{color:'#C7C9D9',fontSize:11,fontWeight:'700'},
 primary:{backgroundColor:CYAN,borderRadius:10,padding:15,alignItems:'center',marginTop:22},primaryText:{color:'#071018',fontSize:12,fontWeight:'900',letterSpacing:.4},secondary:{backgroundColor:'#F1F1FA',borderRadius:10,padding:15,alignItems:'center',marginTop:10},secondaryText:{color:'#161321',fontSize:12,fontWeight:'900'},disclaimer:{color:'#7F879D',fontSize:11,lineHeight:18,marginTop:18},footer:{color:'#797B95',fontSize:10,letterSpacing:1,marginTop:20,textAlign:'center'}
});
