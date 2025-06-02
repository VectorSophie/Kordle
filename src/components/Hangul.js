export const chosung_arr = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

export function chosung(syllable) {
  const code = syllable.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return syllable;
  const index = Math.floor((code - 0xac00) / 588);
  return chosung_arr[index];
}
