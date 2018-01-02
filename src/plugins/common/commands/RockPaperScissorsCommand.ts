import * as Discord from 'discord.js';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class RockPaperScissorsCommand extends CommandAbstract implements CommandInterface {
	public SHAPES = [
		'ROCK',
		'PAPER',
		'SCISSORS',
	];

	public readonly pattern: string = '^\\?rps';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server // Origin is a foreign server.
		);
	}

	public async execute(): Promise<string> {
		const index = Math.floor(Math.random() * 3) + 1;
		const answer = this.SHAPES[index];

		return `${answer} ― rps`;
	}
}
