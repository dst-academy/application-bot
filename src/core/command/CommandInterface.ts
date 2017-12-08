import * as Discord from 'discord.js';

export interface CommandInterface {
	readonly pattern: string;

	load(): void;
	permit(message: Discord.Message): Promise<boolean>;
	execute(parameters: string[], message: Discord.Message): Promise<Discord.RichEmbed|string|void>;
}
