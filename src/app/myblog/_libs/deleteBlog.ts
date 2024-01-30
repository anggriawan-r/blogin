import { deleteImage } from "@/libs/deleteImage";
import { BlogType } from "@/libs/types";

export const deleteBlog = async (
  slug: string,
  content: BlogType,
  mutate: () => void,
) => {
  try {
    deleteImage(content.image as string);

    await fetch(`/api/delete/${slug}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  mutate();
};
