"use client";
import React from "react";

interface Mint {
  id: number;
  name: string;
  record: string;
  owner: string;
}

interface MintsListProps {
  currentAccount?: string | null;
  mints: Mint[];
  CONTRACT_ADDRESS: `0x${string}`;
  tld: string;
  editRecord: (name: string) => void;
}

export default function MintsList(
  props: MintsListProps,
): React.ReactElement | null {
  const { currentAccount, mints, CONTRACT_ADDRESS, tld, editRecord } = props;

  if (!currentAccount || mints.length === 0) return null;

  return (
    <div className="long-container">
      <p className="subtitle">RECENT MINTS:</p>
      <div className="mint-list">
        {mints.map((mint, index) => (
          <div className="mint-item" key={index}>
            <div className="mint-row">
              <a
                className="link"
                href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="underlined">
                  {" "}
                  {mint.name}
                  {tld}{" "}
                </p>
              </a>
              {mint.owner.toLowerCase() === currentAccount.toLowerCase() ? (
                <button
                  className="edit-button"
                  onClick={() => editRecord(mint.name)}
                >
                  <img
                    className="edit-icon"
                    src="https://img.icons8.com/metro/26/000000/pencil.png"
                    alt="Edit button"
                  />
                </button>
              ) : null}
            </div>
            <p> {mint.record} </p>
          </div>
        ))}
      </div>
    </div>
  );
}
