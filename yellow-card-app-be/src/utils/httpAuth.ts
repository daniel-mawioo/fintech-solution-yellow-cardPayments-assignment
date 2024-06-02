import crypto from "crypto-js";
import config from "../config";

const httpAuth = (path: string, method: string, body: any) => {
  const date = new Date().toISOString();
  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, config.secret);

  hmac.update(date);
  hmac.update(path);
  hmac.update(method);

  if (body) {
    console.log(`req body: ${body}`);
    const bodyHmac = crypto
      .SHA256(JSON.stringify(body))
      .toString(crypto.enc.Base64);
    hmac.update(bodyHmac);

    console.log(`bodyHmac: ${bodyHmac}`);

  }

  const hash = hmac.finalize();
  const signature = crypto.enc.Base64.stringify(hash);

  return {
    date,
    signature: `YcHmacV1 ${config.apiKey}:${signature}`,
  };
};

export default httpAuth;
