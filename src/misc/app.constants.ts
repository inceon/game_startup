import { Point } from 'pixi.js';

export default class Screen {
    public static readonly MAX_RESOLUTION: number = 1.5;
    public static readonly WIDTH: number = 1000;
    public static readonly HEIGHT: number = 700;
    public static readonly CENTER: Point = new Point(
        Screen.WIDTH / 2,
        Screen.HEIGHT / 2
    );
}
