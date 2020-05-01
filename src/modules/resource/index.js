import React, {useState, useEffect} from 'react';
import Provider from './provider';
import {View, Text} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {Button} from 'react-native-paper';
import Share from 'react-native-share';

import {Page} from '../../components';

export const Resource = ({navigation, route}) => {
  const [resource, setResource] = useState({});

  useEffect(() => {
    const {instance} = route?.params?.item;
    Provider.getResourceDataByKey({instance}).then(data => {
      setResource(data);
    });
  }, [route]);

  const openFile = ({fileurl, filename}) => {
    (async () => {
      const {data} = await Provider.downloadFile({fileurl, filename});
      await Share.open({url: data});
    })();
  };

  return (
    <Page
      appbar={{
        title: 'Recurso',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <View>
          <RenderHTML html={resource.intro} />
        </View>
        {resource?.contentfiles?.map(file => (
          <>
            <Text>Arquivo: {file.filename}</Text>
            <Button onPress={() => openFile(file)}>Abrir arquivo</Button>
          </>
        ))}
      </View>
    </Page>
  );
};

export default Resource;
