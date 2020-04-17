import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {View, Text} from 'react-native';
import RenderHTML from 'react-native-render-html';

const BlogMessages = ({navigation, route}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    Provider.getEntries({id: 221}).then(data => setEntries(data));
  }, [route.params.id]);

  return (
    <Page
      appbar={{
        title: 'Mensagens do blog',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        {entries.map(entry => {
          console.log(entry);
          return (
            <View>
              <Text>{entry.subject}</Text>
              <RenderHTML html={entry.summary} />
            </View>
          );
        })}
      </View>
    </Page>
  );
};

export default BlogMessages;
