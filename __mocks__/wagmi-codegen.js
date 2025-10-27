// Jest manual mock for 'wagmi/codegen' factories used by generated.ts
exports.createUseReadContract = (opts) => {
  return () => ({ data: undefined });
};

exports.createUseWriteContract = (opts) => {
  return () => ({
    data: null,
    writeContract: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  });
};

exports.createUseSimulateContract = (opts) => {
  return () => ({ data: { request: {} } });
};

exports.createUseWatchContractEvent = (opts) => {
  return () => ({});
};

module.exports = exports;
