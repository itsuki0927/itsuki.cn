const colorMap = {
  red: 'text-red-800 bg-red-100 hover:bg-red-800',
  orange: 'text-orange-800 bg-orange-100 hover:bg-orange-800',
  amber: 'text-amber-800 bg-amber-100 hover:bg-amber-800',
  yellow: 'text-yellow-800 bg-yellow-100 hover:bg-yellow-800',
  lime: 'text-lime-800 bg-lime-100 hover:bg-lime-800',
  green: 'text-green-800 bg-green-100 hover:bg-green-800',
  emerald: 'text-emerald-800 bg-emerald-100 hover:bg-emerald-800',
  teal: 'text-teal-800 bg-teal-100 hover:bg-teal-800',
  cyan: 'text-cyan-800 bg-cyan-100 hover:bg-cyan-800',
  sky: 'text-sky-800 bg-sky-100 hover:bg-sky-800',
  blue: 'text-blue-800 bg-cyan-100 hover:bg-blue-800',
  indigo: 'text-indigo-800 bg-indigo-100 hover:bg-indigo-800',
  violet: 'text-violet-800 bg-violet-100 hover:bg-violet-800',
  purple: 'text-purple-800 bg-purple-100 hover:bg-purple-800',
  fuchsia: 'text-fuchsia-800 bg-fuchsia-100 hover:bg-fuchsia-800',
  pink: 'text-pink-800 bg-pink-100 hover:bg-pink-800',
  rose: 'text-rose-800 bg-rose-100 hover:bg-rose-800',
};

export const genRandomColor = (isDark = false) => {
  const colorList = Object.keys(colorMap) as (keyof typeof colorMap)[];
  const total = colorList.length;
  const randomIndex = Math.floor(Math.random() * total);
  const randomColor = colorList[randomIndex];

  return colorMap[randomColor];
};

const ringColorMap = {
  red: 'ring-red-200',
  orange: 'ring-orange-200',
  amber: 'ring-amber-200',
  yellow: 'ring-yellow-200',
  lime: 'ring-lime-200',
  green: 'ring-green-200',
  emerald: 'ring-emerald-200',
  teal: 'ring-teal-200',
  cyan: 'ring-cyan-200',
  sky: 'ring-sky-200',
  blue: 'ring-blue-200',
  indigo: 'ring-indigo-200',
  violet: 'ring-violet-200',
  purple: 'ring-purple-200',
  fuchsia: 'ring-fuchsia-200',
  pink: 'ring-pink-200',
  rose: 'ring-rose-200',
};
export const genRandomRingColor = () => {
  const colorList = Object.keys(ringColorMap) as (keyof typeof ringColorMap)[];
  const total = colorList.length;
  const randomIndex = Math.floor(Math.random() * total);
  const randomColor = colorList[randomIndex];
  return ringColorMap[randomColor];
};
