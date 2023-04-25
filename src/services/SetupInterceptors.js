// import axios from "axios";

// const SetupInterceptors = (navigate) => {
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
//   axios.interceptors.response.use(
//     function (response) {
//       // Do something with response data
//       return response;
//     },
//     function (error) {
//       // Do something with response error
//       if (error.response) {
//         if (error.response.status === 401 || error.response.status === 403) {
//           navigate("/login");
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default SetupInterceptors;
