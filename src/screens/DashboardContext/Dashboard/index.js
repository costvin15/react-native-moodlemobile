import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import Provider from './provider';

const Dashboard = ({navigation}) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    Provider.getDashboardBlocks().then(data => setBlocks(data));
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={blocks}
        renderItem={({item}) => (
          <item.Block key={item.title} title={item.title} />
        )}
        keyExtractor={data => data.title}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
