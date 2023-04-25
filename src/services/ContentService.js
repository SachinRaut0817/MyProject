import Request from "./UtilsService";
import APIConstant from "../constant/APIConstant";

export async function getAllContent(data, pageNumber) {
  return await Request({
    url:
      APIConstant.ADMIN_BASE_URL +
      APIConstant.GET_ALL_CONTENT +
      "?page=" +
      pageNumber,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateContentStatus(data) {
  return await Request({
    url:
      APIConstant.ADMIN_BASE_URL +
      APIConstant.CHANGE_CONTENT_STATUS +
      "?id=" +
      data,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function addContent(data) {
  let URL = APIConstant.ADMIN_BASE_URL;
  if (data.id == undefined) {
    URL = URL + APIConstant.ADD_CONTENT;
  } else {
    URL = URL + APIConstant.EDIT_CONTENT + "?id=" + data.id;
  }
  return await Request({
    url: URL,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getContentById(data) {
  return await Request({
    url: APIConstant.ADMIN_BASE_URL + APIConstant.GET_CONTENT_BY_ID + data,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteContent(data) {
  return await Request({
    url: APIConstant.ADMIN_BASE_URL + APIConstant.DELETE_CONTENT_BY_ID + data,
    method: "POST",
    body: JSON.stringify(data),
  });
}
