import StateManager from '../../core/state-manager';
import States from '../../misc/states.names';
import AbstractController from '../abstract/abstract.controller';

export default class PreloaderController extends AbstractController {
    /**
     * @inheritDoc
     */
    public showScene(): void {
        super.showScene();
        setTimeout(() => {
            StateManager.getInstance().changeState(States.INTRO);
        }, 2000);
    }
}
