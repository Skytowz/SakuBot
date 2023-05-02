import AbstractEvent from '../Events/AbstractEvent.js';
import InteractionCreateEvent from '../Events/InteractionCreateEvent.js';
import readyEvent from '../Events/ReadyEvent.js';

export default [
  { event: readyEvent },
  { event: InteractionCreateEvent },
] as Array<{
  event: typeof AbstractEvent;
}>;
