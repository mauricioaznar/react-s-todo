export const fakeApi = {
    fetchSuccess: function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
    },
    fetchFail: function () {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(true)
            }, 2000)
        })
    },
}
