import { Container, Graphics, Text } from 'pixi.js';
import StateManager from '../../core/state-manager';
import Screen from '../../misc/app.constants';
import States from '../../misc/states.names';
import AbstractView from '../abstract/abstract.view';

export default class IntroView extends AbstractView {
    protected startButton: Container;
    /**
     * @inheritDoc
     */
    public show() {
        super.show();
        this.createButton();
    }

    protected createButton(): void {
        this.startButton = new Container();
        this.startButton.interactive = true;
        this.startButton.buttonMode = true;
        this.startButton.on('pointerdown', () => {
            StateManager.getInstance().changeState(States.GAME);
        });
        this.display.addChild(this.startButton);

        let graphics = new Graphics();
        graphics.beginFill(0x3e494b);
        graphics.drawRoundedRect(
            Screen.WIDTH / 2 - 100,
            Screen.HEIGHT / 2 - 50,
            200,
            50,
            10
        );
        graphics.endFill();
        this.startButton.addChild(graphics);

        let text = new Text('Start', {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 0x66ffff,
            align: 'center'
        });
        text.x = Screen.WIDTH / 2 - text.width / 2;
        text.y = Screen.HEIGHT / 2 - 45;
        this.startButton.addChild(text);
    }
}
