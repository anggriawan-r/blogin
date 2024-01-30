import { app } from "@/utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import slugify from "slugify";

type InputType = {
  title: string;
  abstract: string;
  body: string;
  image?: string;
  slug: string;
  category: string;
};

const storage = getStorage(app);

export const uploadBlog = async (
  file: File | undefined,
  setSlug: (T: string) => void,
  data: InputType,
) => {
  if (file !== undefined) {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uplaodTask = uploadBytesResumable(storageRef, file);

    uplaodTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadUrl: string) => {
          fetcher(data, downloadUrl).then((res) => setSlug(res.slug));
        });
      },
    );
  }
};

const fetcher = async (data: InputType, downloadUrl: string) => {
  const res = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title: data.title,
      body: data.body,
      abstract: data.abstract,
      image: downloadUrl,
      slug: slugify(data.title).toLowerCase(),
      categoryId: data.category,
    }),
  });

  const slug = await res.json();
  return slug;
};
