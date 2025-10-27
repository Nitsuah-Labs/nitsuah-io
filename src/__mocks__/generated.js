// Manual Jest mock for src/generated.ts to avoid importing ESM-only code in tests
module.exports = {
  useSimulateWagmiMintExampleMint: () => ({ data: { request: {} } }),
  useWriteWagmiMintExampleMint: () => ({
    data: null,
    writeContract: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  }),
};
