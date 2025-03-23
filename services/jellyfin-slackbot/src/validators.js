const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateApiKey = (key) => {
  return typeof key === 'string' && key.length > 0;
};

const requiredEnvVars = {
  SLACK_BOT_TOKEN: (value) => value?.startsWith('xoxb-'),
  SLACK_SIGNING_SECRET: (value) => typeof value === 'string' && value.length > 0,
  JELLYSEERR_API_URL: validateUrl,
  JELLYSEERR_API_KEY: validateApiKey
};

function validateEnvironment() {
  const errors = [];

  for (const [varName, validator] of Object.entries(requiredEnvVars)) {
    const value = process.env[varName];
    
    if (!value) {
      errors.push(`Missing ${varName}`);
      continue;
    }

    if (!validator(value)) {
      errors.push(`Invalid ${varName}: ${value}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  return true;
}

module.exports = {
  validateEnvironment,
  validateUrl,
  validateApiKey
};
