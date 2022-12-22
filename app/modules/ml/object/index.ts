import cocoSsd from "@tensorflow-models/coco-ssd";

// import "@tensorflow/tfjs-backend-webgl";
// import "@tensorflow/tfjs-backend-cpu";

export class ObjectML {
  model?: cocoSsd.ObjectDetection;

  constructor() {
    cocoSsd.load().then((model) => {
      this.model = model;
    });
  }

  public async detectObject(id: string) {
    const img = document.getElementById(id) as HTMLImageElement | null;

    if (!img) {
      console.error("No image found please pass proper ID");
      return;
    }

    try {
      const predictions = await this.model?.detect(img);
      return predictions;
    } catch (error) {
      console.error("Error detecting objects in image", error);
    }
  }
}
