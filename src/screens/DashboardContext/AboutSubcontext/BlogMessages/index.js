import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {View, TouchableOpacity} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import {styles} from './styles';

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
        {entries.map((entry, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {}}>
              <View
                style={{
                  ...styles.marginTopDefault,
                  ...styles.marginHorizontalDefault,
                }}>
                <Card>
                  <Card.Title
                    title={entry.subject}
                    left={() => (
                      <Avatar.Image
                        source={{uri: entry.user.profileimageurl}}
                        size={40}
                      />
                    )}
                    subtitle={entry.user.fullname}
                  />
                </Card>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Page>
  );
};

export default BlogMessages;
