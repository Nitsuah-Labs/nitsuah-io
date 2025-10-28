// Manual Jest mock for src/generated.ts — placed at repository root
exports.__esModule = true;
exports.useSimulateWagmiMintExampleMint = () => ({ data: { request: {} } });
exports.useWriteWagmiMintExampleMint = () => ({
  data: null,
  writeContract: jest.fn(),
  isPending: false,
  isError: false,
  error: null,
});

module.exports = exports;
