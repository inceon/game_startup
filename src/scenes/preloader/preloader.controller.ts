import { Loader } from 'pixi.js';
import StateManager from '../../core/state-manager';
import AssetsNames from '../../misc/assets.names';
import States from '../../misc/states.names';
import { LoaderService } from '../../services/loader.service';
import AbstractController from '../abstract/abstract.controller';
import PreloaderView from './preloader.view';

export default class PreloaderController extends AbstractController {
    protected declare view: PreloaderView;
    /**
     * @inheritDoc
     */
    public showScene(): void {
        super.showScene();

        LoaderService.getInstance()
            .loadAll(AssetsNames.GAME_ASSETS)
            .then(() => {
                setTimeout(() => {
                    StateManager.getInstance().changeState(States.INTRO);
                }, 2000);
            });

        LoaderService.getInstance().addProgressCallback(
            this.setProgress.bind(this)
        );
    }

    /**
     * Set progress of loading
     */
    protected setProgress(loader: Loader): void {
        this.view.setProgress(loader.progress / 100);
    }
}
