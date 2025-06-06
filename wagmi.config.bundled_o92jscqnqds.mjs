// wagmi.config.ts
import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import * as chains from "wagmi/chains";
var wagmi_config_default = defineConfig(() => {
  const env = loadEnv({
    mode: typeof process !== "undefined" ? process.env.NODE_ENV : undefined,
    envDir: typeof process !== "undefined" ? process.cwd() : undefined
  });
  return {
    out: "src/generated.ts",
    contracts: [],
    plugins: [
      etherscan({
        apiKey: typeof process !== "undefined" ? process.env.ETHERSCAN_API_KEY : undefined,
        chainId: chains.mainnet.id,
        contracts: [
          {
            name: "WagmiMintExample",
            address: {
              [chains.mainnet.id]: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
              [chains.goerli.id]: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2"
            }
          }
        ]
      }),
      react()
    ]
  };
});
export {
  wagmi_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2FnbWkuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9tbnQvYy9Vc2Vycy9hamhhci9jb2RlL25pdHN1YWgtaW8vd2FnbWkuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9tbnQvYy9Vc2Vycy9hamhhci9jb2RlL25pdHN1YWgtaW9cIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL2FqaGFyL2NvZGUvbml0c3VhaC1pby93YWdtaS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICdAd2FnbWkvY2xpJ1xyXG5pbXBvcnQgeyBldGhlcnNjYW4sIHJlYWN0IH0gZnJvbSAnQHdhZ21pL2NsaS9wbHVnaW5zJ1xyXG5pbXBvcnQgKiBhcyBjaGFpbnMgZnJvbSAnd2FnbWkvY2hhaW5zJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KHtcclxuICAgIG1vZGU6IHByb2Nlc3MuZW52Lk5PREVfRU5WLFxyXG4gICAgZW52RGlyOiBwcm9jZXNzLmN3ZCgpLFxyXG4gIH0pXHJcbiAgcmV0dXJuIHtcclxuICAgIG91dDogJ3NyYy9nZW5lcmF0ZWQudHMnLFxyXG4gICAgY29udHJhY3RzOiBbXSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgZXRoZXJzY2FuKHtcclxuICAgICAgICBhcGlLZXk6IGVudi5FVEhFUlNDQU5fQVBJX0tFWSEsXHJcbiAgICAgICAgY2hhaW5JZDogY2hhaW5zLm1haW5uZXQuaWQsXHJcbiAgICAgICAgY29udHJhY3RzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdXYWdtaU1pbnRFeGFtcGxlJyxcclxuICAgICAgICAgICAgYWRkcmVzczoge1xyXG4gICAgICAgICAgICAgIFtjaGFpbnMubWFpbm5ldC5pZF06ICcweEZCQTM5MTJDYTA0ZGQ0NThjODQzZTJFRTA4OTY3ZkMwNGYzNTc5YzInLFxyXG4gICAgICAgICAgICAgIFtjaGFpbnMuZ29lcmxpLmlkXTogJzB4RkJBMzkxMkNhMDRkZDQ1OGM4NDNlMkVFMDg5NjdmQzA0ZjM1NzljMicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICByZWFjdCgpLFxyXG4gICAgXSxcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1AsU0FBUyxjQUFjLGVBQWU7QUFDNVIsU0FBUyxXQUFXLGFBQWE7QUFDakMsWUFBWSxZQUFZO0FBRXhCLElBQU8sdUJBQVEsYUFBYSxNQUFNO0FBQ2hDLFFBQU0sTUFBTSxRQUFRO0FBQUEsSUFDbEIsTUFBTSxRQUFRLElBQUk7QUFBQSxJQUNsQixRQUFRLFFBQVEsSUFBSTtBQUFBLEVBQ3RCLENBQUM7QUFDRCxTQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxXQUFXLENBQUM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQLFVBQVU7QUFBQSxRQUNSLFFBQVEsSUFBSTtBQUFBLFFBQ1osU0FBZ0IsZUFBUTtBQUFBLFFBQ3hCLFdBQVc7QUFBQSxVQUNUO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsY0FDUCxDQUFRLGVBQVEsRUFBRSxHQUFHO0FBQUEsY0FDckIsQ0FBUSxjQUFPLEVBQUUsR0FBRztBQUFBLFlBQ3RCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
