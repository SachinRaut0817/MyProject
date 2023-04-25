import Request from "./UtilsService";
import APIConstant from "../constant/APIConstant";

export async function getAllUnRepresentative(data, pageNumber) {
  return await Request({
    url:
      APIConstant.ADMIN_BASE_URL +
      APIConstant.GET_ALL_UN_REPRESENTATIVE +
      "?page=" +
      pageNumber,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUnRepStatus(data) {
  return await Request({
    url:
      APIConstant.ADMIN_BASE_URL + APIConstant.CHANGE_UN_STATUS + "?id=" + data,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function addRepresentetive(data) {
  let URL = APIConstant.ADMIN_BASE_URL;
  if (data.get("id") == "undefined") {
    URL = URL + APIConstant.ADD_UN_REP;
  } else {
    URL = URL + APIConstant.EDIT_UN_REP + "?id=" + data.get("id");
  }

  return await Request({
    url: URL,
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteUNR(data) {
  return await Request({
    url: APIConstant.ADMIN_BASE_URL + APIConstant.DELETE_UNR_BY_ID + data,
    method: "POST",
    body: JSON.stringify(data),
  });
}
