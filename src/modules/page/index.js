import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RenderHTML from 'react-native-render-html';

import {styles} from './styles';
import Provider from './provider';
import {Page as RNPage} from '../../components';

const Page = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(null);

  useEffect(() => {
    setTitle(route?.params?.item.name);
    Provider.getPage(route?.params?.item, route?.params?.courseid).then(data =>
      setPage(data.content),
    );
  }, [route]);

  return (
    <RNPage
      appbar={{
        title: title,
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View
        style={{
          ...styles.marginVerticalDefault,
          ...styles.marginHorizontalDefault,
        }}>
        {page !== null && (
          <RenderHTML
            html={page}
            alterChildren={node => {
              if (node.name === 'iframe') {
                delete node.attribs.width;
                delete node.attribs.height;
              }
              return node.children;
            }}
          />
        )}
      </View>
    </RNPage>
  );
};

export default Page;
