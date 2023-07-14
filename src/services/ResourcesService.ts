import AbstractService from './AbstractService.js';
import { AppInstances } from '../types/AppInstances.js';
import {
  AudioResource,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  VoiceConnection,
} from '@discordjs/voice';
import { Readable } from 'stream';

export default class CommandInteractionService extends AbstractService {
  public constructor(appInstances: AppInstances) {
    super(appInstances);
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
