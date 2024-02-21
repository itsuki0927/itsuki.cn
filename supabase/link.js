require('dotenv').config({ path: './.env.local' });

const { execSync } = require('child_process');

// Define the actual command with sensitive data
const command = `npx supabase link --project-ref "${process.env.SUPABASE_PROJECT_REF}" --password "${process.env.SUPABASE_DB_PASSWORD}"`;

// Create a log-safe version of the command by replacing sensitive data
const logSafeCommand = command.replace(
  process.env.SUPABASE_DB_PASSWORD,
  '[HIDDEN]',
);

try {
  // Execute the actual command
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  // Log the safe version of the command
  console.error('Failed to execute command:', logSafeCommand);
  console.error('Error:', error.name);
  process.exit(1);
}
