export function colorLum(hex: string): string {
  const hexToRgb = (hex: string): number[] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const rgb = hexToRgb(hex);
  const lrgb: number[] = [];
  rgb.forEach(function (c) {
    c = c / 255.0;
    if (c <= 0.03928) {
      c = c / 12.92;
    } else {
      c = Math.pow((c + 0.055) / 1.055, 2.4);
    }
    lrgb.push(c);
  });
  const lum = 0.2126 * lrgb[0] + 0.7152 * lrgb[1] + 0.0722 * lrgb[2];
  return lum > 0.179 ? "#000000" : "#ffffff";
}
