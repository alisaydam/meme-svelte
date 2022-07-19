import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { compressAccurately } from "image-conversion";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const uploadImage = async (file, path) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  try {
    const img = await compressFile(file);
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, path + img.name + Date.now());
    const uploadTask = await uploadBytesResumable(storageRef, img, metadata);
    console.log(uploadTask);

    const url = await getDownloadURL(uploadTask.task.snapshot.ref);
    return url;
  } catch (error) {
    console.log(error);
  }
};

const compressFile = async (img) => {
  try {
    const data = await compressAccurately(img, {
      size: 80,
      accuracy: 0.9,
      width: 100,
      height: 100,
      orientation: 1,
    });
    img = new File([data], img.name, { lastModified: Date.now() });
    return img;
  } catch (error) {
    return error;
  }
};
