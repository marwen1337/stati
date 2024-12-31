import { ConfigService } from '@app/config'

interface AgentConfig {
  accesskey: string | undefined;
  server: {
    host: string;
    port: number;
  };
}

const defaultAgentConfig: AgentConfig = {
  accesskey: undefined,
  server: {
    host: 'localhost',
    port: 8080
  }
}

export class AgentConfigService extends ConfigService<AgentConfig> {
  constructor() {
    super(defaultAgentConfig, 'agent')
  }
}
