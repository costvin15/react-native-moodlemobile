import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Timeline} from '../../../blocks';
import Provider from './provider';

const Dashboard = ({navigation}) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    Provider.getDashboardBlocks().then(data => setBlocks(data));
  }, []);

  return (
    <SafeAreaView>
      {blocks.map((Block, index) => (
        <Block key={index} />
      ))}
    </SafeAreaView>
  );
};

export default Dashboard;
