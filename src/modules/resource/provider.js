import RNFetchBlob from 'rn-fetch-blob';
import Helper from '../../api/helper';

export const getResourceDataByKey = async ({instance}) => {
  const response = await Helper.callMoodleWebService(
    'mod_resource_get_resources_by_courses',
  );
  const resources = response.resources;
  const resource = resources.find(({id}) => id === instance);
  return resource;
};

export const downloadFile = async ({fileurl, filename}) => {
  const token = await Helper.getMoodleUserToken();
  const file = await RNFetchBlob.config({
    fileCache: true,
    path: RNFetchBlob.fs.dirs.CacheDir + '/' + filename,
  }).fetch('GET', fileurl + '?token=' + token);
  return file;
};

export default {getResourceDataByKey, downloadFile};
