import React, {useEffect} from 'react';
import Provider from './provider';

export const Resource = () => {
  useEffect(() => {
    Provider.getResourceDataByKey();
  }, []);
  return <></>;
};

export default Resource;
