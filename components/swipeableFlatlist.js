import React from 'react';
import {Header, Icon,Badge,ListItem} from 'react-native-elements';
import { View,Text ,StyleSheet,Animated,Dimensions,TouchableHighlight} from 'react-native';
import db from '../config'
import firebase from 'firebase';
import {SwipeListView} from 'react-native-swipe-list-view'

export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allNotifications:this.props.allNotifications
        }
    }
    updateMarkAsRead=(notification)=>{
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notification_status":"read"
        })
    }
    onSwipeValueChange = swipeData =>{
        var allNotifications = this.state.allNotifications
        const {key,value}=swipeData
     if (value<-Dimensions.get('window').width){
         const newData = [...allNotifications];
         const previousIndex = allNotifications.findIndex(item => item.key===key)
         this.updateMarkAsRead(allNotifications[previousIndex]);
         newData.splice(previousIndex,1);
        this.setState({allNotifications:newData})

     }
   
    }
    renderItem = data=>(
       // <Animated.view>
            <ListItem
            leftElement ={<Icon name = "book" type = "font-awesome" color = "#696969"/>} 
            title={data.item.book_name}
            titleStyle ={{color:'black',fontWeight:'bold'}}
            subtitle = {data.item.message}  
            bottomDivider/>

     //   </Animated.view>
        
    )
    renderHiddenItem=()=>(
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightButton,styles.backRightButtonRight]}>
                <Text style = {styles.backTextWhite}></Text>
            </View>
        </View>
    )
     render(){
         return(
             <View style = {styles.container}>
                 <SwipeListView
                 disableRightSwipe
                 data={this.state.allNotifications}
                 renderItem={this.renderItem}
                 renderHiddenItem={this.renderHiddenItem}
                 rightOpenValue = {-Dimensions.get('window').width}
                 previewOpenValue={-40}
                 previewRowKey = {'0'}
                 previewOpenDelay = {3000}
                 onSwipeValueChange ={this.onSwipeValueChange}
                 
                 />
             </View>

         )
     }   
    
    }
    const styles =StyleSheet.create({
        backTextWhite:{
            color:'#ffff',
            fontWeight:'bold',
            fontSize:15
        },
        container:{
         flex:1,
         backgroundColor:'white',


        },
        rowBack:{
            alignItems:'center',
            backgroundColor:'#29b6f6',
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            paddingLeft:15,
        },backRightButtonRight:{
            alignItems:'center',
            bottom:0,
            justifyContent:'center',
            position:'absolute',
            top:0,
            width:100
        },
        backRightButtonRight:{
            backgroundColor:'#29b6f6',
            
        }

       
    })