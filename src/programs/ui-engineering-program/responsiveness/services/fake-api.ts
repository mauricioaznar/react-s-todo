const CONSISTENCY_LIKES_VALUE_KEY = 'consistency_likes_value_key';
let likes = window.localStorage.getItem(CONSISTENCY_LIKES_VALUE_KEY)
  ? Number(window.localStorage.getItem(CONSISTENCY_LIKES_VALUE_KEY))
  : 0;

export const fakeApi = {
  fetchSuccess: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  },
  fetchFail: function () {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(true);
      }, 1000);
    });
  },
  getLikes(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(likes);
      }, 1000);
    });
  },
  setLikes: function (newLikes: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        window.localStorage.setItem(CONSISTENCY_LIKES_VALUE_KEY, String(newLikes));
        likes = newLikes;
        resolve(true);
      }, 1000);
    });
  },
};
