import speechCommands from "@tensorflow-models/speech-commands";

export class SpeechML {
  recognizer?: speechCommands.SpeechCommandRecognizer;
  callbacks: Record<
    string,
    (reult: speechCommands.SpeechCommandRecognizerResult) => void
  > = {};

  constructor() {
    this.recognizer = speechCommands.create("BROWSER_FFT");

    this.recognizer.ensureModelLoaded().catch((e) => {
      console.log("Error loading speech model", e);

      this.recognizer = undefined;
    });
  }

  public addCallback(
    name: string,
    callback: (result: speechCommands.SpeechCommandRecognizerResult) => void
  ) {
    this.callbacks[name] = callback;
  }

  public removeCallback(name: string) {
    delete this.callbacks[name];
  }

  public resetCallbacks() {
    this.callbacks = {};
  }

  public async trainModel() {
    // const INPUT_SHAPE = [NUM_FRAMES, 232, 1];
    // let model;
    // async function train() {
    //   toggleButtons(false);
    //   const ys = tf.oneHot(
    //     examples.map((e) => e.label),
    //     3
    //   );
    //   const xsShape = [examples.length, ...INPUT_SHAPE];
    //   const xs = tf.tensor(flatten(examples.map((e) => e.vals)), xsShape);
    //   await model.fit(xs, ys, {
    //     batchSize: 16,
    //     epochs: 10,
    //     callbacks: {
    //       onEpochEnd: (epoch, logs) => {
    //         document.querySelector("#console").textContent = `Accuracy: ${(
    //           logs.acc * 100
    //         ).toFixed(1)}% Epoch: ${epoch + 1}`;
    //       },
    //     },
    //   });
    //   tf.dispose([xs, ys]);
    //   toggleButtons(true);
    // }
    // function buildModel() {
    //   model = tf.sequential();
    //   model.add(
    //     tf.layers.depthwiseConv2d({
    //       depthMultiplier: 8,
    //       kernelSize: [NUM_FRAMES, 3],
    //       activation: "relu",
    //       inputShape: INPUT_SHAPE,
    //     })
    //   );
    //   model.add(tf.layers.maxPooling2d({ poolSize: [1, 2], strides: [2, 2] }));
    //   model.add(tf.layers.flatten());
    //   model.add(tf.layers.dense({ units: 3, activation: "softmax" }));
    //   const optimizer = tf.train.adam(0.01);
    //   model.compile({
    //     optimizer,
    //     loss: "categoricalCrossentropy",
    //     metrics: ["accuracy"],
    //   });
    // }
    // function toggleButtons(enable) {
    //   document
    //     .querySelectorAll("button")
    //     .forEach((b) => (b.disabled = !enable));
    // }
    // function flatten(tensors) {
    //   const size = tensors[0].length;
    //   const result = new Float32Array(tensors.length * size);
    //   tensors.forEach((arr, i) => result.set(arr, i * size));
    //   return result;
    // }
  }

  public async startSpeechDetection() {
    try {
      const words = this.recognizer?.wordLabels();

      await this.recognizer?.listen(
        async (result) => {
          const callbacks = Object.values(this.callbacks);

          for (let i = 0; i < callbacks.length; i++) {
            const callback = callbacks[i];
            callback(result);
          }

          if (!words) {
            return;
          }

          // Turn scores into a list of (score,word) pairs.
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const scores = Array.from(<ArrayLike<number>>result.scores).map(
            (s, i) => ({
              score: s,
              word: words[i],
            })
          );
          // Find the most probable word.
          scores.sort((s1, s2) => s2.score - s1.score);
        },
        {
          includeSpectrogram: true,
          probabilityThreshold: 0.75,
        }
      );
    } catch (error) {
      console.log("Error starting listening for recognizer", error);
    }
  }

  public async stopSpeechDetection() {
    try {
      this.recognizer?.stopListening();
    } catch (error) {
      console.log("Error stop speech recognizer", error);
    }
  }
}
