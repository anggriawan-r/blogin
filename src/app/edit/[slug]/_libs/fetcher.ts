import { EditBlogType } from "@/libs/types";
import slugify from "slugify";

export const fetcher = async (
  data: EditBlogType,
  downloadUrl: string,
  oldSlug: string,
) => {
  const res = await fetch(`/api/edit/${oldSlug}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.title,
      body: data.body,
      abstract: data.abstract,
      image: downloadUrl,
      slug: slugify(data.title).toLowerCase(),
    }),
  });

  const slug = await res.json();
  return slug;
};
