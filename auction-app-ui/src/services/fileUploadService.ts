import { storage } from 'firebase-storage/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

const uploadFile = async (folder: string, file: File) => {
  const fileRef = ref(storage, `${folder}/${file.name! + v4()}`);

  const snapshot = await uploadBytes(fileRef, file);

  const url = await getDownloadURL(snapshot.ref);

  return url;
};

const uploadFiles = async (folder: string, files: File[]) => {
  const uploadPromises = files.map(async (files) => {
    const uploadFiles = await uploadFile(folder, files);

    return uploadFiles;
  });

  const uploadedFiles = await Promise.all(uploadPromises);
  
  return uploadedFiles;
};

export const fileUploadService = {
  upload: (folder: string, image: File) => uploadFile(folder, image),
  uploadFiles: (folder: string, images: File[]) =>
    uploadFiles(folder, images),
};
