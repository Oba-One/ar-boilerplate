export class GameAudioPlayer {
  private audioContexts: { [key: string]: AudioContext } = {};
  private soundGroups: { [key: string]: string[] } = {};
  private sounds: { [key: string]: AudioBuffer } = {};
  // private filters: { [key: string]: BiquadFilterNode } = {};
  private volumes: { [key: string]: number } = {};

  public createAudioContext(name: string): void {
    this.audioContexts[name] = new AudioContext();
  }

  public pauseContext(context = "default"): void {
    this.audioContexts[context].suspend();
  }

  public resumeContext(context = "default"): void {
    this.audioContexts[context].resume();
  }

  public setVolume(name: string, volume: number): void {
    this.volumes[name] = volume;
  }

  public setGroupVolume(group: string, volume: number): void {
    const soundNames = this.soundGroups[group];
    if (!soundNames) {
      console.warn(`Sound group not found: ${group}`);
      return;
    }
    for (const name of soundNames) {
      this.setVolume(name, volume);
    }
  }

  public setContextVolume(volume: number, context = "default"): void {
    this.volumes[context] = volume;
    // this.audioContexts[context].destination.gain.value = volume;
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
