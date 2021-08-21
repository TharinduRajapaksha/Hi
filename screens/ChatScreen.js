import React, {useLayoutEffect, useState, useCallback, useEffect} from 'react';
import { View, Text } from 'react-native';

//..........firebase authentication..........................................
import { auth, db } from '../firebase';

//..........log out button and dp.............................................
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

//..........chat..............................................................
import { GiftedChat } from 'react-native-gifted-chat';
import { SnapshotViewIOS } from 'react-native';

const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    //chat section connection to firestore database.............................................................

    /*useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])
    */

    useLayoutEffect(() => {
        const unsubscribe = db.collection('Chats').orderBy('createdAt', 'desc').onSnapshot
            (snapshot=>setMessages(snapshot.docs.map(doc=>({

                _id: doc.data()._id,
                createdAt: doc.data().createdAt,
                text: doc.data().text,
                user: doc.data(). user

            }))
        ))
        return unsubscribe;
        
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        }=messages[0]
        db.collection('Chats').add({
            _id,
            createdAt,
            text,
            user
        })


    }, [])

    //sign out symboll........................................................
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style= {{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    /> 
                </View>

                //<Text style= {{ marginLeft: 100 }} source={{ uri: auth?.currentUser?.photoURL}} /> 

                
                
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 30 }} onPress= { signOut}>

                     <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
               
            )
        

        })
        
    }, [])

    //sign out function(copy from firebase) ...........................................................
    const signOut = () =>{
        //alert("Programe came for signout")
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });

    }


    return (
      
        

        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL                
                }}
        />
    )
}

export default ChatScreen
