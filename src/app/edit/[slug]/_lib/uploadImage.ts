import { app } from "@/utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";

const storage = getStorage(app);

export const uploadImage = (
  file: File | undefined,
  setUrl: (T: string) => void,
  media: string | undefined,
) => {
  if (file !== undefined) {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uplaodTask = uploadBytesResumable(storageRef, file);

    uplaodTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Failed to add image");
      },
      () => {
        console.log("Uploading image...");
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadUrl: string) => {
          console.log("Image has been set!");
          setUrl(downloadUrl);
        });
      },
    );
  } else {
    console.log("Image has been set!");
    setUrl(media as string);
  }
};
