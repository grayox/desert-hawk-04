// inspired by:
// https://codepen.io/WebSeed/pen/pvgqEq?editors=0010
// https://stackoverflow.com/a/1855903/1640892
// http://stackoverflow.com/a/1855903/186965
// rgb to hex: https://stackoverflow.com/a/5624139/1640892

// Exports random background color (as bgTextColors.bgHex)
// and foreground text color (as bgTextColors.textHex) optimized for contrast
// Demo: https://codepen.io/WebSeed/pen/pvgqEq?editors=0010

const rgbToHex = ({r, g, b}) => `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
const componentToHex = c => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const colorIsLight = ({r, g, b}) => {
  // Counting the perceptive luminance
  // human eye favors green color... 
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // console.log(a);
  return (a < 0.5);
}

const colorFromRgb = ({r, g, b,}) => `rgb(${r},${g},${b})`
const randomRgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, };
}

const bgTextColors = hex => {
  const randBgRgb = randomRgb();
  const bgRgb = colorFromRgb(randBgRgb);
  const bgHex = hex || rgbToHex(randBgRgb);
  const textHex = colorIsLight(bgRgb) ? '000000' : 'FFFFFF';
  const out = { randBgRgb, bgRgb, bgHex, textHex, };
  return out;
}

export default bgTextColors