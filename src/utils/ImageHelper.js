// import RNFetchBlob from 'rn-fetch-blob'
// import _ from 'lodash'

// const imagePathToBase64 = async (imagePath) => {

//   try {
//     const path = _.startsWith(imagePath, 'file://') ? imagePath.substring(7) : imagePath
//     const base64code = await RNFetchBlob.fs.readFile(path, 'base64')

//     return Promise.resolve({
//       base64: `data:image/jpeg;base64,${base64code}`,
//     })
//   } catch (error) {
//     return Promise.reject(null)
//   }
// }

// const getSizeOfImage = async imagePath => {
//   try {
//     const path = _.startsWith(imagePath, 'file://') ? imagePath.substring(7) : imagePath
//     const stats = await RNFetchBlob.fs.stat(path)

//     return Promise.resolve({
//       bytes: stats.size
//     })
//   } catch (error) {
//     return Promise.reject(null)
//   }
// }

// export default {
//   imagePathToBase64,
//   getSizeOfImage
// }
