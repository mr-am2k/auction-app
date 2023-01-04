import { storage } from 'firebase-storage/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

const uploadImage = async (folder: string, image: File) => {
  const imageRef = ref(storage, `${folder}/${image.name! + v4()}`);

  const snapshot = await uploadBytes(imageRef, image);

  const url = await getDownloadURL(snapshot.ref);

  return url;
};

const uploadImages = async (folder: string, images: File[]) => {
  const uploadPromises = images.map(async (image) => {
    const uploadedImage = await uploadImage(folder, image);

    return uploadedImage;
  });

  const uploadedImages = await Promise.all(uploadPromises);
  
  return uploadedImages;
};

export const imageService = {
  upload: (folder: string, image: File) => uploadImage(folder, image),
  uploadImages: (folder: string, images: File[]) =>
    uploadImages(folder, images),
};
