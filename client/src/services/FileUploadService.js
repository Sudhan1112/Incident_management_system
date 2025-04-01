import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export default class FileUploadService {
  static uploadFile(file, progressCallback) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }

      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progressCallback) progressCallback(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}