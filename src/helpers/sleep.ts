export default function sleep(time: number) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
