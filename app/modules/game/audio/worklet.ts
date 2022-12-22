export class AudioWorker extends AudioWorkletProcessor {
  private audioContext: AudioContext;
  private audioDestination: AudioDestinationNode;
  private paused: boolean = false;
  private currentBuffer: AudioBuffer | null = null;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor() {
    super();
    this.audioContext = new AudioContext();
    this.audioDestination = new AudioDestinationNode();
    this.port.onmessage = this.handleMessage.bind(this);
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: any
  ) {
    if (this.currentBuffer && !this.paused) {
      for (let i = 0; i < outputs.length; i++) {
        for (let j = 0; j < outputs[i].length; j++) {
          this.currentBuffer.copyToChannel(outputs[i][j], j);
        }
      }
    }
    return true;
  }

  handleMessage(event: any) {
    switch (event.data.type) {
      case "play":
        this.playSound(event.data.buffer);
        break;
      case "pause":
        this.pauseSound();
        break;
      case "stop":
        this.stopSound();
        break;
      case "resume":
        this.resumeSound();
        break;
      default:
        break;
    }
  }

  playSound(buffer: AudioBuffer) {
    if (this.currentSource) {
      this.stopSound();
    }

    this.currentBuffer = buffer;
    this.currentSource = new AudioBufferSourceNode(this.audioContext, {
      buffer: buffer,
    });
    this.currentSource.connect(this.audioDestination);
    this.currentSource.start();
  }

  pauseSound() {
    if (this.currentSource) {
      this.currentSource.stop();
      this.paused = true;
    }
  }

  stopSound() {
    if (this.currentSource) {
      this.currentSource.stop();
      this.currentSource.disconnect();
      this.currentSource = null;
      this.currentBuffer = null;
      this.paused = false;
    }
  }

  resumeSound() {
    if (this.currentBuffer && this.paused) {
      this.playSound(this.currentBuffer);
      this.paused = false;
    }
  }
}

registerProcessor("audio-worker", AudioWorker);
