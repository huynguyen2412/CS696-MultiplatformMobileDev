var RNFS = require('react-native-fs');

// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
export const SaveFile = (fileName, context) => {
  let path = RNFS.DocumentDirectoryPath + fileName;
  return RNFS.writeFile(path, context, 'utf8')
    .then((success) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    })
}

export const DeleteFile = async (fileName) => {
  let path = RNFS.DocumentDirectoryPath + fileName;
  let isExists = await RNFS.exists(path);
  if(isExists){
    return RNFS.unlink(path)
      .then(() => console.log('File deleted.'))
      .catch((err) => console.log(err.message));
  }else
    console.log("No file existing");
}

export const ReadFile = async (fileName) => {
  let path = RNFS.DocumentDirectoryPath + fileName;
  let isExists = await RNFS.exists(path);
  if(isExists){
    let fileContent = await RNFS.readFile(path, 'utf8');
    return fileContent;
  }else
    return -1;
}