import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  VoiceConnection,
} from '@discordjs/voice';
import { Readable } from 'stream';
import injector from 'wire-dependency-injection';

export default class ResourcesService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
    });
  }

  public constructor() {
    super(ResourcesService.name);
  }

  public prepareAudioSource(voiceConnection: VoiceConnection) {
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    voiceConnection.subscribe(player);

    return player;
  }

  public getAudioResource(resource: string | Readable) {
    return createAudioResource(resource);
  }

  public playAudioResource(
    voiceConnection: VoiceConnection,
    audioResource: string | Readable
  ) {
    const player = this.prepareAudioSource(voiceConnection);

    const ressource = this.getAudioResource(audioResource);

    player.play(ressource);

    return player;
  }
}
