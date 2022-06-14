import AbstractController from '../abstract/abstract.controller';
import GameModel from './game.model';
import GameView from './game.view';

export default class GameController extends AbstractController {
    protected declare view: GameView;
    protected declare model: GameModel;

    /**
     * @inheritDoc
     */
    public showScene() {
        this.view.generateBalls(this.model.numberOfBalls);
        super.showScene();
    }
}
