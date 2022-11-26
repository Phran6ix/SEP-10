import * as stellar from "stellar-sdk";
import { Transaction, Keypair } from "stellar-sdk";
import fetch from "node-fetch";

import createKeyPair from "./createKeyPair";
import requestChallengeTransaction from "./request-challenge";
import submitSignedTransactionChallenge from "./submit-challenge";
import signChallengeTransactionAccount from "./sign-challenge";
import { Request, Response, NextFunction } from "express";
import { TransformCallback } from "stream";

const anchorAuthEndpoint = "https://anchor.mykobo.co/auth";
const getRandomKeyPair = () => stellar.Keypair.random();

const accountKeyPair = getRandomKeyPair();

const {publicKey} = req.body

const createdKeyPair = createKeyPair(
  publickey
);
console.log(createdKeyPair);

console.log("step 1");

export async function requestAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const challenge = await requestChallengeTransaction({
    // publicKey: accountKeyPair.publicKey(),
    publicKey: fromPublicKey.publicKey(),
    anchorHomeDomain: "https://anchor.mykobo.co",
    anchorAuthEndpoint,
    serverSigningKey:
      "GAHNDAOJ7IB6KKMGKBGI5JWJHCTFXOVGY4U2N57C2CUZPK3SPEPCLU76",
  });

  if (!process.env.NETWORK_PASSPHRASE) {
    throw new Error("Unknown input");
  }
  const signedChallenge = await signChallengeTransactionAccount({
    challengeTransaction: challenge as Transaction,
    networkPassphrase: process.env.NETWORK_PASSPHRASE as string,
    // keyPair: accountKeyPair,
    keyPair: fromPublicKey,
  });

  const token = await submitSignedTransactionChallenge({
    signedChallengeTransaction: signedChallenge,
    anchorAuthEndpoint,
  });

  res.status(200).json({ token });
}
