// Minimal mock for wagmi hooks used in tests
const useWaitForTransactionReceipt = jest.fn(() => ({
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
}));

module.exports = {
  useWaitForTransactionReceipt,
};
