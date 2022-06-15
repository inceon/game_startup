import AbstractController from '../abstract/abstract.controller';
import GameModel from './game.model';
import GameView from './game.view';

export default class GameController extends AbstractController {
    /**
     * @inheritDoc
     */
    protected get view(): GameView {
        return this.viewComponent as GameView;
    }

    /**
     * @inheritDoc
     */
    protected get model(): GameModel {
        return this.modelComponent as GameModel;
    }

    /**
     * @inheritDoc
     */
    public showScene() {
        this.view.generateBalls(this.model.numberOfBalls);
        super.showScene();
    }
}
