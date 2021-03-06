import { Loader, Texture } from 'pixi.js';
import AssetsNames from '../misc/assets.names';

export class LoaderService {
    private static instance: LoaderService;
    private loader: Loader;

    private constructor() {
        this.loader = new Loader();
    }

    /**
     * Get loader service instance
     */
    public static getInstance(): LoaderService {
        if (!LoaderService.instance) {
            LoaderService.instance = new LoaderService();
        }
        return LoaderService.instance;
    }

    /**
     * Load asset
     * @param name
     * @param url
     */
    public load(name: string, url: string): void {
        this.loader.add(name, url);
    }

    /**
     * Load all assets
     * @param assets
     */
    public loadAll(assets: any): Promise<void> {
        for (let name in assets) {
            this.load(assets[name], AssetsNames.PATH + assets[name]);
        }

        return new Promise((resolve) => {
            this.loader.load(() => {
                resolve();
            });
        });
    }

    /**
     * Get loader assets
     */
    public getLoader(): Loader {
        return this.loader;
    }

    /**
     * Get loaded asset by name
     * @param name
     */
    public getResource(name: string): any {
        return this.loader.resources[name];
    }

    /**
     * Get loaded asset by name as texture
     * @param name
     */
    public getResourceAsTexture(name: string): Texture {
        let texture = this.loader.resources[name].texture;
        if (texture) {
            return texture;
        } else {
            throw new Error(`Texture ${name} not found`);
        }
    }

    /**
     * Add progress callback
     */
    public addProgressCallback(
        callback: (loader: Loader, resource: any) => void
    ): void {
        this.loader.onProgress.add(callback);
    }
}
