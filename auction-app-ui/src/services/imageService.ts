import { storage } from 'firebase-storage/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';

const uploadImage = async (image: File) => {
  const imageRef = ref(storage, `profile-pictures/${image.name! + v4()}`);

  const snapshot = await uploadBytes(imageRef, image);

  const url = await getDownloadURL(snapshot.ref);

  return url;
};

export const imageService = {
  upload: (image: File) => uploadImage(image),
};
