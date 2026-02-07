export const getYoutubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getYoutubeThumbnail = (url, quality = 'mqdefault') => {
  const id = getYoutubeID(url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : null;
};

export const getYoutubeEmbedUrl = (url) => {
  const id = getYoutubeID(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
};