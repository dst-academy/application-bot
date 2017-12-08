import * as dotenv from 'dotenv';
import * as configuration from './configuration/configuration.json';
import {Bot} from '../src/core/Bot';
import {CommonPlugin} from '../src/plugins/common/CommonPlugin';
import {ConversationPlugin} from '../src/plugins/conversation/ConversationPlugin';
import {LinkPlugin} from '../src/plugins/link/LinkPlugin';
import {PresencePlugin} from '../src/plugins/presence/PresencePlugin';
import {WikiPlugin} from '../src/plugins/wiki/WikiPlugin';
import {DebugPlugin} from '../src/plugins/debug/DebugPlugin';

dotenv.config();

new Bot(process.env.DISCORD_BOT_TOKEN!, configuration)
	.use(CommonPlugin)
	.use(ConversationPlugin)
	.use(LinkPlugin)
	.use(PresencePlugin)
	.use(WikiPlugin)
	.use(DebugPlugin)
	.connect();
