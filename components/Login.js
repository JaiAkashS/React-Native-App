import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Platform} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
    const [user, setUser] = useState({email:'',password:''});
    const saveId = async(token)=>{
        await AsyncStorage.setItem('token',token);
    }
    const handlelogin = async () => {
    try {
        const res = await axios.post(
            'https://reqres.in/api/login',
            {
                email: user.email,
                password: user.password
            },
            {
                headers: {
                    'x-api-key': 'reqres_f3213dbe8aa844698dbc99f7010dd0a5'
                }
            }
        );

        console.log(res.data);

        if (res.status === 200) {
            
            await saveId(res.data.token)
            navigation.reset({
                index: 0,
                routes: [{ name: 'App' }],
            });
        }

    } catch (err) {
        console.log(err.response?.data);

        if (Platform.OS === 'web') {
            alert("Invalid credentials");
        } else {
            Alert.alert('Error', 'Login failed');
        }
    }
};


return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="you@example.com"
                        value={user.email}
                        onChangeText={(text)=>{setUser({...user,email:text})}}
                        placeholderTextColor="#8A97A8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        value={user.password}
                        onChangeText={(text)=>{setUser({...user,password:text})}}
                        placeholderTextColor="#8A97A8"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handlelogin}>
                    <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton} activeOpacity={0.7}>
                    <Text style={styles.linkText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#F5F7FA',
    },
    card: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 22,
        borderWidth: 1,
        borderColor: '#E6EBF1',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F1B2A',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#526274',
        marginBottom: 18,
    },
    fieldGroup: {
        marginBottom: 14,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#243447',
        marginBottom: 8,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#D5DDE7',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 15,
        color: '#132235',
        backgroundColor: '#FFFFFF',
    },
    primaryButton: {
        height: 46,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C7ED6',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    linkButton: {
        marginTop: 12,
        alignItems: 'center',
    },
    linkText: {
        color: '#1C7ED6',
        fontSize: 14,
        fontWeight: '600',
    },
});