#!/usr/bin/env node
import {
  CLIApplication,
  HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
  createCliApplicationContainer
} from './cli/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

import { Container } from 'inversify';
import { Component } from './shared/types/index.js';

function bootstrap() {
  const appContainer = Container.merge(
    createCliApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const cliApplication = appContainer.get<CLIApplication>(Component.CliApplication);
  cliApplication.registerCommands([
    appContainer.get<HelpCommand>(Component.HelpCommand),
    appContainer.get<VersionCommand>(Component.VersionCommand),
    appContainer.get<ImportCommand>(Component.ImportCommand),
    appContainer.get<GenerateCommand>(Component.GenerateCommand),
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
