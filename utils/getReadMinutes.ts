const getReadMinutes = (content: string) => {
  const minutes = Math.round(content.length / 600);
  return Math.max(1, minutes);
};

export default getReadMinutes;
