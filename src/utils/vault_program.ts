export type VaultProgram = {
  "version": "0.1.0",
  "name": "vault_program",
  "instructions": [
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userInteractions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalDeposits",
            "type": "u64"
          },
          {
            "name": "totalWithdrawals",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: VaultProgram = {
  "version": "0.1.0",
  "name": "vault_program",
  "instructions": [
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userInteractions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalDeposits",
            "type": "u64"
          },
          {
            "name": "totalWithdrawals",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
