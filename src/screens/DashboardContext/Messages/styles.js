import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headerUnactive: {
    borderRadius: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
  },
  headerActive: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  marginHorizontal: {
    marginHorizontal: 15,
  },
  marginBottomDefault: {
    marginBottom: 15,
  },
  removeBorderRadiusTop: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  removeBorderRadiusBottom: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  conversationTitle: {
    fontSize: 16,
    color: '#757575',
  },
});

export default styles;
