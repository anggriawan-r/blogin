import { app } from "@/utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";

type InputType = {
  title: string;
  abstract: string;
  body: string;
  image?: string;
  slug: string;
};

const storage = getStorage(app);

export const uploadBlog = async (
  file: File | undefined,
  setUrl: (T: string) => void,
  fetcher: () => void,
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
        toast.success("Image uploaded");
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadUrl: string) => {
          fetcher();
        });
      },
    );
  }
};

// const fetcher = async (
//   data: InputType,
//   downloadUrl: string,
//   oldSlug: string,
// ) => {
//   const res = await fetch(`/api/edit/${oldSlug}`, {
//     method: "POST",
//     body: JSON.stringify({
//       title: data.title,
//       body: data.body,
//       abstract: data.abstract,
//       image: downloadUrl,
//       slug: slugify(data.title).toLowerCase(),
//       oldSlug: oldSlug,
//     }),
//   });

//   const slug = await res.json();
//   return slug;
// };
