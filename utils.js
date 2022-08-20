import fetch from "node-fetch";

const LOGIN_URL = "https://api.moru.com.np/login";
const INITIATE_TRANSACTION =
  "https://api.moru.com.np/services/transfer/start-txn";

const CONFIRM_TRANSACTION =
  "https://api.moru.com.np/services/transfer/execute-txn";

async function login() {
  try {
    const credentials = {
      password: "@Bibek8848",
      username: "9827314543",
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    };

    const res = await fetch(LOGIN_URL, options);

    const data = await res.json();

    return { data: data.data, success: true };
  } catch (error) {
    console.log(error);
    return { error: "Invalid credentials", success: false };
  }
}

async function initiateTransation(token) {
  try {
    token = `Bearer ${token}`;

    let payload = {
      amount: "0.2",
      message: "test",
      receiver: "9806085429",
    };

    const options = {
      method: "POST",
      headers: { "content-type": "application/json", authorization: token },
      body: JSON.stringify(payload),
    };

    const res = await fetch(INITIATE_TRANSACTION, options);

    const data = await res.json();

    console.log({ data });

    return data.data;
  } catch (error) {
    console.log(error);
  }
}

async function confirmTransaction(token, __txn_id__) {
  try {
    token = `Bearer ${token}`;

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ __txn_id__, pin_code: "1104" }),
    };

    const res = await fetch(CONFIRM_TRANSACTION, options);

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export { login, initiateTransation, confirmTransaction };
