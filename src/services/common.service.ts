export const getIdFromUrl = (url: string | undefined) => {
  if (url) {
    const arr = url.split('/');
    return arr[arr.length - 2];
  } else {
    return undefined;
  }
};
