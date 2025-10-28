// Minimal mock for wagmi hooks used in tests
const useWaitForTransactionReceipt = jest.fn(() => ({
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
}));

// Factories used by generated code (wagmi/codegen). These factories return
// simple hook functions that provide minimal shapes expected by components.
const createUseReadContract = () => {
  return () => ({ data: undefined });
};

const createUseWriteContract = () => {
  return () => ({
    data: null,
    writeContract: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  });
};

const createUseSimulateContract = () => {
  return () => ({ data: { request: {} } });
};

const createUseWatchContractEvent = () => {
  return () => ({});
};

module.exports = {
  useWaitForTransactionReceipt,
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
};
