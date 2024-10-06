import axios from "axios";
import { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
    return axios
        .get<Diary[]>(baseUrl)
        .then((response) => response.data);
}

export const addDiary = async (diary: NewDiary) => {
    return axios
        .post(baseUrl, diary)
        .then((response) => response.data)
        
}