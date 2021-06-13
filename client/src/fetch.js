const axios = require("axios").default;
import store from "./store";

export default class call {
  static getItems() {
    axios({
      method: "get",
      url: "http://localhost:5000/api/lists",
      headers: {
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        store.commit("setLists", res.data);
      })
      .catch((err) => console.log("find error in get lists", err));
  }
  static changeStatus(id, status) {
    axios({
      method: "put",
      url: "http://localhost:5000/api/lists/" + id + "/update",
      headers: {
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
      data: {
        status: status,
      },
    })
      .then((res) => {
        store.commit("setLists", res.data.data);
      })
      .catch((err) => console.log("error in put status in db", err));
  }
  static deleteItem(id) {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/lists/" + id,
      headers: {
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200 && res.data.success === true) {
        store.commit("setLists", res.data.data);
      }
    });
  }
}
