import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function Dashboard({navigation}) {
    const jobs = [
    {id:1, jobtitle:"Frontend Developer", date:'13-01-2026'},
    {id:2, jobtitle:"React Native Specialist", date:'14-01-2026'},
    {id:3, jobtitle:"Mobile Dev", date:'14-01-2026'},
    {id:4, jobtitle:"JS Frontend Dev", date:'15-01-2026'},
    {id:5, jobtitle:"Flutter Developer", date:'16-01-2026'},
    {id:6, jobtitle:"Backend Developer", date:'17-01-2026'},
    {id:7, jobtitle:"Full Stack Developer", date:'18-01-2026'},
    {id:8, jobtitle:"UI/UX Designer", date:'19-01-2026'},
    {id:9, jobtitle:"DevOps Engineer", date:'20-01-2026'},
    {id:10, jobtitle:"Node.js Developer", date:'21-01-2026'},
    {id:11, jobtitle:"Angular Developer", date:'22-01-2026'},
    {id:12, jobtitle:"iOS Developer", date:'23-01-2026'},
    {id:13, jobtitle:"Android Developer", date:'24-01-2026'},
    {id:14, jobtitle:"QA Tester", date:'25-01-2026'},
    {id:15, jobtitle:"Software Engineer", date:'26-01-2026'},
    {id:16, jobtitle:"Data Analyst", date:'27-01-2026'},
    {id:17, jobtitle:"Machine Learning Engineer", date:'28-01-2026'},
    {id:18, jobtitle:"Cybersecurity Analyst", date:'29-01-2026'},
    {id:19, jobtitle:"Cloud Engineer", date:'30-01-2026'},
    {id:20, jobtitle:"Technical Support Engineer", date:'31-01-2026'},
    {id:21, jobtitle:"Product Manager", date:'01-02-2026'},
    {id:22, jobtitle:"Scrum Master", date:'02-02-2026'},
    {id:23, jobtitle:"Game Developer", date:'03-02-2026'},
    {id:24, jobtitle:"Blockchain Developer", date:'04-02-2026'},
    {id:25, jobtitle:"Embedded Systems Engineer", date:'05-02-2026'}
];
    useEffect(()=>{
        const getData = async()=>{
        const data = await AsyncStorage.getItem('token');
            if(data !== null){
                console.log(data)
            }
        }
        getData()
    },[])
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={styles.title}>Job Portal Dashboard</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                    <View style={styles.avatar}>
                    <Text style={styles.avatarText}>JD</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <Text style={styles.subtitle}>Welcome back, Candidate</Text> */}


            <Text style={styles.sectionTitle}>Applied Jobs</Text>
            <FlatList
                data={jobs}
                renderItem={({item})=>(
                    <View style={styles.jobCard}>
                        <Text style={styles.jobTitle}>{item.jobtitle}</Text>
                        <Text style={styles.jobMeta}>{`Applied on ${item.date}`}</Text>
                    </View>
                )}  
            />
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
    },
    avatarText: {
        color: '#1C7ED6',
        fontSize: 24,
        fontWeight: '700',
    },
});
