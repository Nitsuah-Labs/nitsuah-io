// DOMAINS - cleaned implementation
"use client";
export const dynamicParams = true;

import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useSimulateContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import contractAbi from "../../_components/_labs/_utils/domainABI.json";

// LAB STYLES
import DomainForm from "../../_components/_labs/DomainForm";
import DomainsNotConnected from "../../_components/_labs/DomainsNotConnected";
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import LabSubNav from "../../_components/_labs/LabSubNav";
import MintsList from "../../_components/_labs/MintsList";
import "../../_components/_styles/labs.css";

// LAB ASSETS
import icons180 from "../../_components/_labs/_assets/icons180.png";
import ethLogo from "../../_components/_web3/_assets/ethlogo.png";
import polygonLogo from "../../_components/_web3/_assets/polygonlogo.png";

// CONSTANTS
const tld = ".nitsuah.eth";
const SCAN_LINK =
  "https://mumbai.polygonscan.com/address/0xBbDF8C47BC3FF87aaC2396493C3F98a89C399163";
const OPENSEA_LINK =
  "https://testnets.opensea.io/collection/nitsuah-name-service-grnrwqs5vq";
const CONTRACT_ADDRESS =
  "0xBbDF8C47BC3FF87aaC2396493C3F98a89C399163" as unknown as `0x${string}`;

// Inner component that uses wagmi hooks
const DomainsContent = (): React.ReactElement => {
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTestHelpers, setShowTestHelpers] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("testHelpers") === "1") setShowTestHelpers(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const helpersEnabled =
    process.env.NEXT_PUBLIC_TEST_HELPERS === "1" || showTestHelpers;

  interface Mint {
    id: number;
    name: string;
    record: string;
    owner: string;
  }

  const [mints, setMints] = useState<Mint[]>([]);
  const { address: currentAccount, isConnected, chain } = useAccount();
  const { switchChain: wagmiSwitchNetwork } = useSwitchChain();

  const network = chain?.name || "";

  const contractConfig: { address: `0x${string}`; abi: any } = {
    address: CONTRACT_ADDRESS,
    abi: contractAbi.abi as any,
  };

  const { data: names, refetch: refetchNames } = useReadContract({
    ...contractConfig,
    functionName: "getAllNames",
    query: { enabled: isConnected },
  });

  type SimpleContractCall = {
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args?: any[];
  };

  const recordCalls: SimpleContractCall[] | undefined = (
    names as string[] | undefined
  )?.map((name: string) => ({
    address: contractConfig.address,
    abi: contractConfig.abi,
    functionName: "records",
    args: [name],
  }));

  const ownerCalls: SimpleContractCall[] | undefined = (
    names as string[] | undefined
  )?.map((name: string) => ({
    address: contractConfig.address,
    abi: contractConfig.abi,
    functionName: "domains",
    args: [name],
  }));

  const useReadContractsAny = useReadContracts as unknown as (props: any) => {
    data?: any[];
  };

  const _recordsRes = useReadContractsAny({
    contracts: (recordCalls || []) as readonly any[],
    query: {
      enabled: !!names && Array.isArray(recordCalls) && recordCalls.length > 0,
    },
  });
  const records = _recordsRes.data;

  const _ownersRes = useReadContractsAny({
    contracts: (ownerCalls || []) as readonly any[],
    query: { enabled: !!names && (ownerCalls?.length ?? 0) > 0 },
  });
  const owners = _ownersRes.data;

  useEffect(() => {
    if (
      Array.isArray(names) &&
      Array.isArray(records) &&
      Array.isArray(owners)
    ) {
      setMints(
        (names as string[]).map((name: string, idx: number) => ({
          id: idx,
          name,
          record: String(records[idx]?.result || ""),
          owner: String(owners[idx]?.result || ""),
        })),
      );
    }
  }, [names, records, owners]);

  const handleSwitchNetwork = () => {
    if (wagmiSwitchNetwork) {
      wagmiSwitchNetwork({ chainId: 80001 });
    } else if ((window as any).ethereum) {
      (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html",
      );
    }
  };

  useEffect(() => {
    if (network === "Polygon Mumbai Testnet") {
      refetchNames();
    }
  }, [isConnected, network, refetchNames]);

  const { data: registerSim } = useSimulateContract({
    ...contractConfig,
    functionName: "register",
    args: [domain],
    value:
      domain.length === 1
        ? BigInt(1e18)
        : domain.length === 2
          ? BigInt(5e17)
          : domain.length === 3
            ? BigInt(2e17)
            : BigInt(1e17),
    query: {
      enabled: !!domain && domain.length <= 6 && !containsSpecialChars(domain),
    },
  });

  const { writeContract: registerDomain, data: registerTx } =
    useWriteContract();
  useWaitForTransactionReceipt({ hash: registerTx });

  const { data: setRecordSim } = useSimulateContract({
    ...contractConfig,
    functionName: "setRecord",
    args: [domain, record],
    query: { enabled: !!domain && !!record },
  });
  const { writeContract: setRecordWrite, data: setRecordTx } =
    useWriteContract();
  useWaitForTransactionReceipt({ hash: setRecordTx });

  const mintDomain = async () => {
    if (!domain) {
      alert("Domain cannot be empty");
      return;
    }
    if (domain.length > 6) {
      alert("Domain cannot be more than 6 characters long");
      return;
    }
    if (containsSpecialChars(domain)) {
      alert("Domain cannot contain special characters");
      return;
    }
    if (registerSim?.request) {
      registerDomain(registerSim.request);
    }
  };

  const updateDomain = async () => {
    if (!record || !domain) return;
    setLoading(true);
    if (setRecordSim?.request) {
      setRecordWrite(setRecordSim.request);
    }
    setLoading(false);
  };

  const editRecord = (name: string): void => {
    setEditing(true);
    setDomain(name);
  };

  return (
    <>
      <h1>SUB-DOMAIN PORTAL</h1>
      <div className="form-container">
        <div className="mint-container">
          {helpersEnabled && !mounted && (
            <div data-testid="domains-test-helpers" style={{ marginTop: 12 }}>
              <div data-testid="network-info">Network: testnet</div>
            </div>
          )}
          {!currentAccount && <DomainsNotConnected />}
          {currentAccount ? (
            <DomainForm
              domain={domain}
              setDomain={setDomain}
              record={record}
              setRecord={setRecord}
              editing={editing}
              setEditing={setEditing}
              loading={loading}
              mintDomain={mintDomain}
              updateDomain={updateDomain}
              network={network}
              handleSwitchNetwork={handleSwitchNetwork}
              currentAccount={currentAccount}
              icons180={icons180}
              polygonLogo={polygonLogo}
              ethLogo={ethLogo}
              tld={tld}
              SCAN_LINK={SCAN_LINK}
              OPENSEA_LINK={OPENSEA_LINK}
            />
          ) : null}
          <MintsList
            currentAccount={currentAccount}
            mints={mints}
            CONTRACT_ADDRESS={CONTRACT_ADDRESS}
            tld={tld}
            editRecord={editRecord}
          />
        </div>
      </div>
    </>
  );
};

// Wrapper component that always renders layout
const DomainSite = (): React.ReactElement => {
  return (
    <div className="App">
      <LabNav />
      <LabSubNav />
      <main
        id="main"
        role="main"
        aria-label="Domains Content"
        style={{ paddingBottom: "80px" }}
      >
        <DomainsContent />
      </main>
      <LabFooter />
    </div>
  );
};

function containsSpecialChars(str: string): boolean {
  const specialChars = /[ `!@#$%^&*()_+\-=[{};':"\\|,.<>/?~]/;
  return specialChars.test(str);
}

export default DomainSite;
