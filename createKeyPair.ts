import { Keypair } from "stellar-sdk";

const secretKey = Buffer.allocUnsafe(32);
secretKey.fill(process.env.secretKey);

function createKeypair(publicKey: string) {
  const BufferpublicKey = Buffer.allocUnsafe(32);
  BufferpublicKey.fill(publicKey);

  console.log(BufferpublicKey);

  const keypair = new Keypair({
    type: "ed25519",
    secretKey,
    publicKey: BufferpublicKey,
  });
  console.log("KEYPAIR: " + keypair);
  // return keypair;
}

export default createKeypair;
