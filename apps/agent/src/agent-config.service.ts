import { ConfigService } from '@app/config'

interface AgentConfig {
  accesskey: string | undefined;
  server: {
    url: string;
  };
}

const defaultAgentConfig: AgentConfig = {
  accesskey: undefined,
  server: {
    url: 'http://localhost:8080'
  }
}

export class AgentConfigService extends ConfigService<AgentConfig> {
  constructor() {
    super(defaultAgentConfig, 'agent')
  }
}
