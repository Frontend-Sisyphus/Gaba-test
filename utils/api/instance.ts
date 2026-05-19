import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

// На будущее, если нам надо будет перехватывать запрос
apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// На будущее, если нам надо будет перехватывать ответ
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || `Ошибка сервера: ${error.response.status}`;

      console.debug("Ошибка API:", message);
    } else if (error.request) {
      console.debug("Ошибка сети, ответ не получен");
    } else {
      console.error("Ошибка запроса:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiInstance;