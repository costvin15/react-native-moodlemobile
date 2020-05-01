import i18n from 'react-native-i18n';
import en from './en.json';
import pt_br from './pt-br.json';

i18n.fallbacks = true;
i18n.translations = {
  en,
  'pt-BR': pt_br,
};

export default i18n;
