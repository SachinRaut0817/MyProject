import Request from "./UtilsService";
import APIConstant from "../constant/APIConstant";

export async function login(data) {
  return await Request({
    url: APIConstant.ADMIN_BASE_URL + APIConstant.LOGIN_URL,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllUser(data, pageNumber) {
  return await Request({
    url:
      APIConstant.USER_BASE_URL +
      APIConstant.GET_ALL_USER +
      "?page=" +
      pageNumber,
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function registerAccountHolder(data) {
  return await Request({
    url: APIConstant.USER_BASE_URL + APIConstant.REGISTER_USER,
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function updateAccountHolder(data) {
  return await Request({
    url: APIConstant.USER_BASE_URL + APIConstant.UPDATE_USER,
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteUser(data) {
  return await Request({
    url: APIConstant.USER_BASE_URL + APIConstant.DELETE_USER,
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

export async function changeUserStatus(data) {
  return await Request({
    url: APIConstant.USER_BASE_URL + APIConstant.CHANGE_USER_STATUS,
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
