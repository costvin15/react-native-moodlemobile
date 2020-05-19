import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

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
      <View />
    </Page>
  );
};

export default Feedback;
