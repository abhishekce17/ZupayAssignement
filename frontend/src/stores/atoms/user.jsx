import { atom } from "recoil";

export const userAtom = atom({
    key: "userAtom",
    default: {
        userId: "",
        name: "",
        username: "",
        email: "",
        password: "",
        posts: [],
        following: []
    }
})

export const userPostsAtom = atom({
    key: "userPostsAtom",
    default: []
})

export const userFollowingAtom = atom({
    key: "userFollowingAtom",
    default: []
})
