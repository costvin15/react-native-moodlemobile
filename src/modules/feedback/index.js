import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import {styles} from './styles';
import Provider from './provider';
import {Page} from '../../components';

const Feedback = ({navigation, route}) => {
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const {item, courseid} = route.params;
    Provider.getFeedbackById({...item, courseid}).then(data =>
      setFeedback(data),
    );
  }, [route.params]);

  return (
    <Page
      appbar={{
        title: feedback?.name,
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View style={{...styles.marginHorizontalDefault}}>
        {feedback?.intro && <RenderHTML html={feedback?.intro} />}
        <Button mode="outlined" onPress={() => {}}>
          Pré-visualizar
        </Button>
        <Button
          mode="contained"
          onPress={() => {}}
          style={{...styles.marginVerticalDefault}}>
          Responda as questões
        </Button>
      </View>
    </Page>
  );
};

export default Feedback;
