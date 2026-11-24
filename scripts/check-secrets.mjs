import { execSync } from 'child_process';

const BLOCKED_FILE_PATTERNS = [
  /^\.env/i,
  /\/\.env/i,
  /\.sst$/i,
  /\.key$/i,
  /\.pem$/i,
  /\.cert$/i,
  /\.pfx$/i,
  /\.pkcs12$/i,
  /\.next\//i,
  /turbopack/i,
];

const ALLOWED_FILES = [
  /\.env\.example$/i
];

const SECRET_PATTERNS = [
  { name: 'Resend API Key', regex: /re_[A-Za-z0-9_]{20,}/ },
  { name: 'Google / Gemini API Key', regex: /AIza[0-9A-Za-z\-_]{35}/ },
  { name: 'Stripe Secret Key', regex: /sk_(live|test)_[0-9a-zA-Z]{24,}/ },
  { name: 'GitHub Token', regex: /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36,}/ },
  { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Private Key Block', regex: /-----BEGIN (?:RSA|EC|OPENSSH|PGP)? PRIVATE KEY-----/ },
  { name: 'Hardcoded Secret Assignment', regex: /(?:RESEND_API_KEY|GEMINI_API_KEY|CLOUDINARY_SECRET|STRIPE_SECRET|API_SECRET|AUTH_SECRET)\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]/i },
];

function checkStagedFiles() {
  let stagedFiles = [];
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();
    if (!output) return;
    stagedFiles = output.split(/\r?\n/).filter(Boolean);
  } catch (err) {
    console.error('Error checking staged files:', err);
    process.exit(1);
  }

  // 1. Check for forbidden filenames
  for (const file of stagedFiles) {
    const isAllowed = ALLOWED_FILES.some((pattern) => pattern.test(file));
    if (isAllowed) continue;

    for (const pattern of BLOCKED_FILE_PATTERNS) {
      if (pattern.test(file)) {
        console.error('\n🚨 ========================================================');
        console.error('⛔ COMMIT ABORTED: SENSITIVE FILE DETECTED IN STAGING');
        console.error(   File: );
        console.error('   This file is restricted and must never be committed to Git.');
        console.error('   Run: git reset HEAD <file> to unstage it.');
        console.error('========================================================\n');
        process.exit(1);
      }
    }
  }

  // 2. Check added lines in diff for secrets
  try {
    const diff = execSync('git diff --cached -U0', { encoding: 'utf8' });
    const addedLines = diff
      .split(/\r?\n/)
      .filter((line) => line.startsWith('+') && !line.startsWith('+++'));

    for (const line of addedLines) {
      for (const { name, regex } of SECRET_PATTERNS) {
        if (regex.test(line)) {
          console.error('\n🚨 ========================================================');
          console.error('⛔ COMMIT ABORTED: POTENTIAL SECRET DETECTED IN DIFF');
          console.error(   Pattern: );
          console.error(   Line: ...);
          console.error('   Never commit raw secrets, tokens, or private keys.');
          console.error('   Use environment variables (.env.local) instead.');
          console.error('========================================================\n');
          process.exit(1);
        }
      }
    }
  } catch (err) {
    console.error('Error scanning git diff:', err);
    process.exit(1);
  }

  console.log('✅ Secret Scanning Gate: No exposed secrets or restricted files detected.');
}

checkStagedFiles();
