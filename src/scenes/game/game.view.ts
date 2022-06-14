import * as _ from 'lodash';
import { ease } from 'pixi-ease';
import { Point, Sprite, Texture } from 'pixi.js';
import Screen from '../../misc/app.constants';
import AssetsNames from '../../misc/assets.names';
import { LoaderService } from '../../services/loader.service';
import AbstractView from '../abstract/abstract.view';

export default class GameView extends AbstractView {
    protected balls: Sprite[] = [];
    protected textures: Texture[] = [];

    /**
     * Get textures from loader
     * @protected - protected because it's used in show()
     */
    protected getTextures() {
        this.textures.push(
            LoaderService.getInstance().getResourceAsTexture(
                AssetsNames.GAME_ASSETS.BALL
            )
        );
        this.textures.push(
            LoaderService.getInstance().getResourceAsTexture(
                AssetsNames.GAME_ASSETS.BALL2
            )
        );
    }

    /**
     * @param numberOfBalls - number of balls to generate
     */
    public generateBalls(numberOfBalls: number) {
        this.getTextures();

        for (let i = 0; i < numberOfBalls; i++) {
            const ball = new Sprite(_.sample(this.textures));
            ball.position.set(
                Math.random() * Screen.WIDTH,
                Math.random() * Screen.HEIGHT
            );
            ball.scale.set(0.2);
            ball.interactive = true;
            ball.buttonMode = true;
            ball.on('pointerdown', () => {
                ball.parent.removeChild(ball);
                this.balls.splice(this.balls.indexOf(ball), 1);
            });
            this.display.addChild(ball);
            this.balls.push(ball);
        }
    }

    /**
     * @inheritDoc
     */
    public onShowComplete() {
        super.onShowComplete();
        this.animateBalls();
    }

    /**
     * Animate balls with ease
     * @protected
     */
    protected animateBalls() {
        _.each(this.balls, (ball: Sprite, index: number) => {
            ease.add(
                ball,
                {
                    position: new Point(
                        Math.random() * Screen.WIDTH,
                        Math.random() * Screen.HEIGHT
                    )
                },
                {
                    duration: 2000
                }
            ).on('complete', () => {
                if (index === this.balls.length - 1) {
                    this.animateBalls();
                }
            });
        });
    }

    public onHideComplete() {
        super.onHideComplete();
        this.display.removeChildren();
        this.balls = [];
    }
}
