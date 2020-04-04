import React, {createRef} from 'react';

export const navigationRef = createRef();
export const navigate = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
};

export default {navigate};
