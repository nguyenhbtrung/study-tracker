import { Container } from '@ntrg/simple-di';
import { SessionRepository } from '../entities/session/session.repository';
import { TrackerService } from '../features/tracker/tracker.service';

export function createContainer() {
  const container = new Container();
  container.register({
    provide: SessionRepository,
    useClass: SessionRepository,
    scope: 'singleton',
  });

  container.register({
    provide: TrackerService,
    useClass: TrackerService,
    scope: 'singleton',
  });

  return container;
}
