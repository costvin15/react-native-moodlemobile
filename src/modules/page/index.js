import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RenderHTML from 'react-native-render-html';

import Provider from './provider';
import {Page as RNPage} from '../../components';

const Page = ({navigation, route}) => {
  const [page, setPage] = useState({});

  useEffect(() => {
    Provider.getPage(route?.params?.item, route?.params?.courseid).then(data =>
      setPage(data),
    );
  }, [route]);

  return (
    <RNPage
      appbar={{
        title: 'Page',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <RenderHTML html={page?.content} />
      </View>
    </RNPage>
  );
};

export default Page;
