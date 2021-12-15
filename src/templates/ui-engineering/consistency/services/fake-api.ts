export const fakeApi = {
    fetchSuccess: function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    },
    fetchFail: function () {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(true)
            }, 1000)
        })
    },
}
