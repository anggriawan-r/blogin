export const getDateFromDB = (data: any) => {
  const date = new Date(data.createdAt);
  const month = new Date(data.createdAt).toLocaleString("en-US", {
    month: "short",
  });

  const day = date.getDate();
  const year = date.getFullYear();

  return { day, month, year };
};
