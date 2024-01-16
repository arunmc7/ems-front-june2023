import { BASE_URL } from "./baseurl";
import { commonApi } from "./commonApi";

//add employee

export const addUser=(body,header)=>{
    return commonApi("POST",`${BASE_URL}/add`,body,header)
}

//get employee

export const getUsers=async(search)=>{
    return await commonApi("GET",`${BASE_URL}/get/allusers?search=${search}`,"")
}

//delete employee

export const deleteUser=async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete/user/${id}`,{})
}

//edit employee

export const editUser=(id,body,header)=>{
    return commonApi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}



