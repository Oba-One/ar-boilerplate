const worker = new Worker(new URL('./modules/game/audio/worker.ts', import.meta.url));

export class GameAudioPlayer {
  private audioContexts: { [key: string]: AudioContext } = {};
  private sounds: { [key: string]: AudioBuffer } = {};

  public createAudioContext(name: string): void {
    this.audioContexts[name] = new AudioContext();
  }

  public pauseContext(context = "default"): void {
    this.audioContexts[context].suspend();
  }

  public resumeContext(context = "default"): void {
    this.audioContexts[context].resume();
  }

  public async loadSound(
    name: string,
    url: string,
    context?: string
  ): Promise<void> {
    const audioContext = context
      ? this.audioContexts[context]
      : new AudioContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    this.sounds[name] = audioBuffer;
  }

  public playSound(name: string, context = "default"): void {
    const audioContext = this.audioContexts[context];
    const audioBuffer = this.sounds[name];
    if (!audioBuffer) {
      console.warn(`Sound not found: ${name}`);
      return;
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  }

  public pauseSound(name: string, context = "default"): void {
    const audioBuffer = this.sounds[name];
    if (!audioBuffer) {
      console.warn(`Sound not found: ${name}`);
      return;
    }

    const source = this.audioContexts[context].createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContexts[context].destination);
    source.stop();
  }

  public stopSound(name: string, context = "default"): void {
    const audioBuffer = this.sounds[name];
    if (!audioBuffer) {
      console.warn(`Sound not found: ${name}`);
      return;
    }

    const source = this.audioContexts[context].createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContexts[context].destination);
    source.stop();
    source.disconnect();
  }
}

export async function loadSounds(
  audioPlayer: GameAudioPlayer,
  sounds: { [key: string]: string }
): Promise<void> {
  for (const [name, url] of Object.entries(sounds)) {
    await audioPlayer.loadSound(name, url);
  }
}
