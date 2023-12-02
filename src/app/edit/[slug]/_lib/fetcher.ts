import slugify from "slugify";

type InputType = {
  title: string;
  abstract: string;
  body: string;
  image?: string;
  slug: string;
};

export const fetcher = async (
  data: InputType,
  downloadUrl: string,
  oldSlug: string,
) => {
  const res = await fetch(`/api/edit/${oldSlug}`, {
    method: "POST",
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
