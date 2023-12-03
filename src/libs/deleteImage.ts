import { app } from "@/utils/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage(app);

export const deleteImage = (imageUrl: string) => {
  const desertRef = ref(storage, imageUrl);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log("Old image has been deleted");
    })
    .catch((error) => {
      console.log("Something went wrong while deleting old image");
    });
};
