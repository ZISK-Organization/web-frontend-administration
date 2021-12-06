interface FetchOptions {
  success: (data: any) => void;
  error: (message: string) => void;
}

const formatUrl = (url: string, params?: { [index: string]: any }) => {
  if (params === undefined) return url;
  return `${url}?${Object.keys(params)
    .filter((k) => params[k] !== null && params[k] !== undefined)
    .map((k) => {
      if (Array.isArray(params[k])) {
        return params[k].map((p: any) => `${k}=${encodeURIComponent(p.toString())}`).join("&");
      }
      return `${k}=${encodeURIComponent(params[k].toString())}`;
    })
    .join("&")}`;
};

class ApiService {
  private _apiUrl: string = "";

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  public async get(url: string, params?: { [index: string]: any }, options?: FetchOptions) {
    if (url.startsWith("/")) url = url.substring(1);
    const initReq: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   localStorage.getItem("QR-APIAccessToken") === null ? "" : `Bearer ${localStorage.getItem("QR-APIAccessToken")}`,
      },
    };
    basicFetch(initReq, `${this._apiUrl}${url}`, params, options);
  }

  public async post(url: string, params: { [index: string]: any }, data?: any, options?: FetchOptions) {
    if (url.startsWith("/")) url = url.substring(1);
    const initReq: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   localStorage.getItem("QR-APIAccessToken") === null ? "" : `Bearer ${localStorage.getItem("QR-APIAccessToken")}`,
      },
      body: JSON.stringify(data),
    };
    basicFetch(initReq, `${this._apiUrl}${url}`, params, options);
  }

  public async put(url: string, params?: { [index: string]: any }, data?: any, options?: FetchOptions) {
    if (url.startsWith("/")) url = url.substring(1);
    const initReq: RequestInit = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   localStorage.getItem("QR-APIAccessToken") === null ? "" : `Bearer ${localStorage.getItem("QR-APIAccessToken")}`,
      },
      body: JSON.stringify(data),
    };

    basicFetch(initReq, `${this._apiUrl}${url}`, params, options);
  }

  public async delete(url: string, params?: { [index: string]: any }, data?: any, options?: FetchOptions) {
    if (url.startsWith("/")) url = url.substring(1);
    const initReq: RequestInit = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   localStorage.getItem("QR-APIAccessToken") === null ? "" : `Bearer ${localStorage.getItem("QR-APIAccessToken")}`,
      },
      body: JSON.stringify(data),
    };

    basicFetch(initReq, `${this._apiUrl}${url}`, params, options);
  }

  public async uploadFile(url: string, file: File, params?: { [index: string]: any }, options?: FetchOptions) {
    if (url.startsWith("/")) url = url.substring(1);
    const formData = new FormData();
    formData.append("file", file);
    fetch(formatUrl(`${this._apiUrl}${url}`, params), {
      method: "post",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res
          .text()
          .then((t) => options?.success(t))
          .catch(() => options?.error(""));
      } else {
        options?.error(res.statusText);
      }
    });
  }
}

function basicFetch(initReq: RequestInit, url: string, params?: { [index: string]: any }, options?: FetchOptions) {
  if (options === undefined) options = { error: () => {}, success: () => {} };

  return new Promise(async (resolve, reject) => {
    fetch(formatUrl(url, params), initReq)
      .then((res) => {
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            res
              .json()
              .then((result) => {
                options?.success(result);
                resolve(result);
              })
              .catch(() => {
                options?.success(null);
                resolve(null);
              });
          } else {
            res
              .text()
              .then((result) => {
                options?.success(result);
                resolve(result);
              })
              .catch(() => {
                options?.success(null);
                resolve(null);
              });
          }
        } else {
          options?.error(res.statusText + " [" + res.status + "]");
          resolve(res.statusText + " [" + res.status + "]");
        }
      })
      .catch((error) => {
        options?.error(error.toString());
        reject(error.toString());
      });
  });
}

const apiUrl = "https://api.zisk-go.com/";

const tasksService = new ApiService(apiUrl + "tasks/");
const profilesService = new ApiService(apiUrl + "profile/");
const submissionsService = new ApiService(apiUrl + "submissions/");
const discussionService = new ApiService(apiUrl + "discussion/");

export { apiUrl, tasksService, profilesService, submissionsService, discussionService };
