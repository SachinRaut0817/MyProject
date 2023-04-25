import Request from "./UtilsService";
import APIConstant from "../constant/APIConstant";

export async function getAllCountry() {
  return await Request({
    url: APIConstant.COUNTRY_BASE_URL + APIConstant.GET_ALL_COUNTRY,
    method: "GET",
  });
}
