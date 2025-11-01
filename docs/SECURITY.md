# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of nitsuah-io seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

- Email: [nitsuahlabs+security@gmail.com]
- GitHub Security Advisories: [https://github.com/Nitsuah-Labs/nitsuah-io/security/advisories/new](https://github.com/Nitsuah-Labs/nitsuah-io/security/advisories/new)

### What to Include

Please include the following information:

- Type of issue (e.g., buffer overflow, SQL injection, XSS, etc.)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 30 days
  - Low: 90 days

## Security Best Practices for Contributors

When contributing to this project:

1. **Never commit secrets:**
   - API keys, tokens, passwords
   - Use environment variables
   - Review `.env.example` for required variables

2. **Dependency updates:**
   - Run `npm audit` before submitting PRs
   - Keep dependencies up to date
   - Review Dependabot alerts

3. **Input validation:**
   - Validate all user inputs
   - Sanitize data before rendering
   - Use TypeScript for type safety

4. **Authentication & Authorization:**
   - Never store credentials in code
   - Use secure wallet connection patterns
   - Validate chain IDs and contract addresses

5. **Web3 Security:**
   - Verify contract addresses before interactions
   - Validate transaction parameters
   - Display clear confirmation prompts

## Known Security Considerations

### Web3 Integration

- This application interacts with blockchain networks
- Users are responsible for reviewing all transactions
- Always verify contract addresses and network settings

### Third-Party Services

- Spline 3D scenes loaded from `https://prod.spline.design`
- WalletConnect for wallet connections
- Users should verify wallet connection prompts

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release patches and publish a security advisory

## Public Disclosure Timing

We ask security researchers to keep vulnerability reports confidential until:

- A fix has been developed and tested
- Affected users have been notified
- A reasonable time has passed for users to update (typically 7 days)

## Acknowledgments

We appreciate the security research community and will acknowledge researchers who report vulnerabilities responsibly (with their permission).

## Contact

For security concerns: [nitsuahlabs+security@gmail.com]
For general questions: [nitsuahlabs+help@gmail.com]

---

Last Updated: October 28, 2025
