import axios from "axios";

const apiRequest = async (url, method, body, content_type) => {
  var config = {
    url,
    method,
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
      "Content-type": content_type ? content_type : "application/json",
    },
    data: body,
  };

  const response = await axios(config);
  return response.data;
};

export { apiRequest };
