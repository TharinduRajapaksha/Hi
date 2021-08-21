import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageUrl] = useState('');


    //register in function(copy from firebase).........................................................................................................................
    const register = ()=>{
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;

            user.updateProfile({
                displayName: name,
                photoURL: imageURL? imageURL:"https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/07/virtual-assistance.png"
            }).then(function() {
                // Update successful.
            }).catch(function(error) {
                // An error happened.
            });
            // ...
            navigation.popToTop();

        })
        .catch((error) => {
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
    }


    //page body........................................................................................................................
    return (
        <View style={styles.container}>
            

            <Input
                placeholder="Enter your name"
                label="Name"
                leftIcon={{type:'materisl',name:'badge'}}
                value={name}
                onChangeText={text=>setName(text)}
            />


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


            <Input
                placeholder="Enter your image Url"
                label="Profile Picture"
                leftIcon={{type:'materisl',name:'face'}}
                value={imageURL}
                onChangeText={text=>setImageUrl(text)}
            />

            
            <Button title="register" onPress={ register} style={ StyleSheet.button}/>
        </View>
    )
}

export default RegisterScreen


//styles.....................................................................................................................................
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems:'center',
        padding: 10,

    }
})
