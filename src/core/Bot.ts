import * as Discord from 'discord.js';
import {PluginConstructor} from './plugin/PluginInterface';
import {CommandConstructor} from './command/CommandConstructor';
import {CommandInterface} from './command/CommandInterface';
import {BehaviorConstructor} from './Behavior/BehaviorConstructor';
import {BehaviorInterface} from './Behavior/BehaviorInterface';

export class Bot {
	public configuration: any;
	public client: Discord.Client;

	private token: string;
	private plugins: PluginConstructor[] = [];
	private commands: CommandInterface[] = [];
	private behaviors: BehaviorInterface[] = [];

	public constructor(token: string, configuration: any) {
		this.token = token;
		this.configuration = configuration;
	}

	public async connect(): Promise<string> {
		this.client = new Discord.Client({
			disableEveryone: true,
		});

		this.load();
		this.bind();

		return this.client.login(this.token);
	}

	public async disconnect(): Promise<void> {
		return this.client.destroy();
	}

	public async reconnect(): Promise<string> {
		await this.disconnect();
		return this.connect();
	}

	public async type(
		channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel,
		content: Discord.Message | Discord.RichEmbed | string,
	): Promise<Discord.Message | Discord.Message[]> {
		this.client.emit('bot.type', channel, content);

		channel.startTyping();

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 500);
		}).then(() => {
			channel.stopTyping();
			return channel.send(content);
		});
	}

	public use(plugin: PluginConstructor): this {
		this.plugins.push(plugin);
		return this;
	}

	private bind(): void {
		this.client.on('ready', () => {
			if (this.client.user.username !== this.configuration.username) {
				this.client.user.setUsername(this.configuration.username);
			}
		});

		this.client.on('message', this.process.bind(this));
		this.client.on('warn', this.warn.bind(this));
		this.client.on('error', this.error.bind(this));

		this.loadBehaviors();
	}

	private load(): void {
		this.plugins.forEach((Plugin: PluginConstructor): void => {
			const plugin = new Plugin(this);
			plugin.load();

			plugin.commands.forEach((Command: CommandConstructor) => {
				const command = new Command(this, plugin);
				command.load();

				this.commands.push(command);
			});

			plugin.behaviors.forEach((Behavior: BehaviorConstructor) => {
				const behavior = new Behavior(this, plugin);
				behavior.load();

				this.behaviors.push(behavior);
			});
		});
	}

	private loadBehaviors(): void {
		this.behaviors.forEach((behavior: BehaviorInterface) => {
			this.client.on(behavior.event, behavior.execute.bind(behavior));
		});
	}

	private process(message: Discord.Message): void {
		if (message.author.bot) {
			return;
		}

		this.commands.forEach((command: CommandInterface) => {
			const expression = new RegExp(command.pattern, 'g');
			let match: RegExpExecArray|null;

			while ((match = expression.exec(message.content)) !== null) {
				const parameters = match;

				command.permit(message).then((permit: boolean) => {
					permit && command.execute(parameters, message).then((response: Discord.RichEmbed|string|void) => {
						response && this.type(message.channel, response).catch((reason: any) => console.log(reason));
					});
				});
			}
		});
	}

	private warn(warning: string): void {
		console.log(warning);
	}

	private error(error: Error): void {
		console.log(error);
	}
}
