import { login, initiateTransation, confirmTransaction } from "./utils.js";

main();

async function main() {
    const loginData = await login();
    let token = loginData.data.access_token;

    const initiateTransactionData = await initiateTransation(token);

    console.log(initiateTransactionData)

    let __txn_id__ = initiateTransactionData.__include__.__txn_id__;

    confirmTransaction(token, __txn_id__)

}

