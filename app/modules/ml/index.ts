import * as tf from "@tensorflow/tfjs";

import "@tensorflow/tfjs-backend-wasm";

import { ObjectML } from "./object";
import { SpeechML } from "./speech";

export async function intializeMlConfig() {
  try {
    await tf.setBackend("wasm");

    // @ts-ignore
    console.log(tf.wasm.getThreadsCount());
  } catch (error) {
    console.error("Error setting Tensorflow backend to WASM", error);
  }
}

export class ML {
  speech?: SpeechML;
  object?: ObjectML;

  constructor() {
    intializeMlConfig();

    this.speech = new SpeechML();
    this.object = new ObjectML();
  }
}
