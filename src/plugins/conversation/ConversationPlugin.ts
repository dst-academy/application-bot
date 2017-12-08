import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {BehaviorConstructor} from '../../core/Behavior/BehaviorConstructor';
import {ClapBehavior} from './behaviors/ClapBehavior';
import {PokeBehavior} from './behaviors/PokeBehavior';
import {ReactBehavior} from './behaviors/ReactBehavior';

export class ConversationPlugin extends PluginAbstract implements PluginInterface {
	public readonly behaviors: BehaviorConstructor[] = [
		ClapBehavior,
		PokeBehavior,
		ReactBehavior,
	];
}
