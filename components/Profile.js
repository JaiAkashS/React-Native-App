import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>JD</Text>
                </View>

                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.role}>React Native Developer</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>john@example.com</Text>  
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoValue}>+91 98765 43210</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Location</Text>
                    <Text style={styles.infoValue}>Chennai, India</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Experience</Text>
                    <Text style={styles.infoValue}>2 Years</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.editButton,styles.logoutbutton]} activeOpacity={0.8} onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={[styles.editButtonText,{color:'red'}]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 18,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#E7F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
    avatarText: {
        color: '#1C7ED6',
        fontSize: 24,
        fontWeight: '700',
    },
    name: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#102133',
    },
    role: {
        textAlign: 'center',
        color: '#5A6B7D',
        marginTop: 4,
        marginBottom: 18,
    },
    infoRow: {
        borderWidth: 1,
        borderColor: '#E7ECF2',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    infoLabel: {
        color: '#5A6B7D',
        fontSize: 12,
        marginBottom: 3,
    },
    infoValue: {
        color: '#102133',
        fontSize: 14,
        fontWeight: '600',
    },
    editButton: {
        flex:1,
        margin: 6,
        backgroundColor: '#1C7ED6',
        borderRadius: 10,
        paddingVertical: 11,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    logoutbutton:{
        backgroundColor:'white' , 
        borderWidth:1,
        borderColor:'red'
    }
});
