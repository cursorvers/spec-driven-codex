const noop = () => {};

function createLogger(logger) {
  if (!logger) {
    return console;
  }

  return {
    info: typeof logger.info === 'function' ? logger.info.bind(logger) : noop,
    warn: typeof logger.warn === 'function' ? logger.warn.bind(logger) : noop,
    error: typeof logger.error === 'function' ? logger.error.bind(logger) : noop,
  };
}

module.exports = { createLogger };
