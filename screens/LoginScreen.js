import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //sign in function(copy from firebase).........................................................................................................................
    const signIn = ()=>{
        //alert("Programe came for sign in ")
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
               
                var errorMessage = error.message;
                alert(errorMessage)
                //alert("Programe going out from sign in")
         });
    }

    useEffect(() => { 
        //alert("Programe came direct defaultly")
        const unsubscribe =  auth.onAuthStateChanged(function(user) {

            if (user) {
              navigation.replace('Chat');
            } else {
              // No user is signed in.
              //alert("Programe came direct defaultly but no user ")
              navigation.canGoBack() && navigation.popToTop();
            }
          });
        return unsubscribe
    }, [])


    //page body.........................................................................................................................
    return (
        <View style={styles.container}>
           

            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{type:'materisl',name:'email'}}
                value={email}
                onChangeText={text=>setEmail(text)}
            />

            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{type:'materisl',name:'lock'}}
                value={password}
                onChangeText={text=>setPassword(text)}
                secureTextEntry
            />

            <Button title="sign in" style={styles.button} onPress= { signIn} />
            <Button title="register" style={styles.button} onPress= {()=>navigation.navigate('Register')} />
        </View>
    )
}

export default LoginScreen

//styles.............................................................................................................................
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems:'center',
        padding: 10

    }
})
