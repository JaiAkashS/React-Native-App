import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard({navigation}) {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={styles.title}>Job Portal Dashboard</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                    <View style={styles.avatar}>
                    <Text style={styles.avatarText}>TK</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <Text style={styles.subtitle}>Welcome back, Candidate</Text> */}


            <Text style={styles.sectionTitle}>Applied Jobs</Text>

            <View style={styles.jobCard}>
                <Text style={styles.jobTitle}>Frontend Developer</Text>
                <Text style={styles.jobMeta}>Applied on 06 Apr 2026</Text>
            </View>

            <View style={styles.jobCard}>
                <Text style={styles.jobTitle}>React Native Developer</Text>
                <Text style={styles.jobMeta}>Applied on 03 Apr 2026</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#102133',
    },
    subtitle: {
        marginTop: 4,
        marginBottom: 16,
        color: '#5A6B7D',
        fontSize: 14,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C7ED6',
    },
    statLabel: {
        fontSize: 12,
        color: '#5A6B7D',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#102133',
        marginBottom: 10,
    },
    jobCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#102133',
    },
    jobMeta: {
        fontSize: 13,
        color: '#5A6B7D',
        marginTop: 4,
        marginBottom: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E7F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginBottom: 10,
    },
    avatarText: {
        color: '#1C7ED6',
        fontSize: 24,
        fontWeight: '700',
    },
});
