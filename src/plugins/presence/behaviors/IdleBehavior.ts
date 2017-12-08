import {BehaviorAbstract} from '../../../core/Behavior/BehaviorAbstract';
import {BehaviorInterface} from '../../../core/Behavior/BehaviorInterface';
import {PresencePlugin} from '../PresencePlugin';

export class IdleBehavior extends BehaviorAbstract implements BehaviorInterface {
	public readonly event: string = 'bot.type';
	protected plugin: PresencePlugin;

	private timer: NodeJS.Timer;

	public load(): void {
		this.bot.client.on('ready', this.ready.bind(this));
	}

	public execute(): void {
		this.busy();
	}

	private ready(): void {
		this.busy('Don\'t Starve Together');
	}

	private busy(game?: string): void {
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(() => this.plugin.idle(), 1000 * 60 * 5);

		this.plugin.busy(game);
	}
}
