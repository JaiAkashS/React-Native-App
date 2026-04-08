import { Text, View, FlatList, StyleSheet } from 'react-native';

export default function Table({ data }) {
  return (
    <View style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.id, styles.headerText]}>ID</Text>
        <Text style={[styles.cell, styles.title, styles.headerText]}>Title</Text>
      </View>

      {/* 🔹 Data */}
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.id]}>{item.id}</Text>
            <Text style={[styles.cell, styles.title]} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth:500,
    padding: 10,
    alignSelf:'center'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  header: {
    backgroundColor: '#f1f1f1'
  },
  cell: {
    borderWidth: 1,
    padding: 8
  },
  id: {
    width: 60,
    textAlign: 'center'
  },
  title: {
    flex: 1
  },
  headerText: {
    fontWeight: 'bold'
  }
});