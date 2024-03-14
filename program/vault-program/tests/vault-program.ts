import * as anchor from "@coral-xyz/anchor";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import { VaultProgram } from "../target/types/vault_program";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";


describe("vault-program", async () => {
    // 配置客戶端使用本地集群（或根據環境變量配置的集群）
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    // 獲取CounterProgram的程序引用，用於後續的方法調用
    const program = anchor.workspace.VaultProgram as Program<VaultProgram>;

    // 算userVaultAccount 的 PDA
    const userVaultAccount = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), provider.wallet.publicKey.toBuffer()],
      program.programId
    )[0];
  
    // 算userVaultAccount 的 PDA
    const totalInteractionsAccount = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("counter"), provider.wallet.publicKey.toBuffer()],
      program.programId
    )[0];
      
    // 測試用例：存款到金庫
    it("Deposit into Vault", async () => {
      const amount = new anchor.BN(1000000000);
      // 調用deposit方法進行存錢，存 1 顆 sol
      const tx = await program.methods
        .deposit(amount)                      // 這個單位是 0.000000001 個 sol
        .accounts({
          userVaultAccount: userVaultAccount, // 指定計數器賬戶  算PDA  (debug這個帳戶原本是0 sol 打sol進去後就可以正常deposit錢進去了  懷疑是payer設定到他自己了?)
          userInteractionsCounter: totalInteractionsAccount, // 調用者賬戶   算PDA
          signer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId, // 系統程序ID，用於創建賬戶等操作
        })
        .rpc();
      console.log("Initialize transaction signature:", tx);
      console.log(`SolScan transaction link: https://solscan.io/tx/${tx}?cluster=devnet`);
      
      // Confirm transaction
      await provider.connection.confirmTransaction(tx);

      // Fetch the created account
      const vaultData = await program.account.userInteractions.fetch(
        totalInteractionsAccount
      );

      console.log("On-chain data is:", vaultData.totalDeposits);    // 鏈上互動次數

      // 獲取userVaultAccount的餘額
      const balance = await provider.connection.getBalance(userVaultAccount);
      console.log("User Vault Account Balance:", balance / anchor.web3.LAMPORTS_PER_SOL, "SOL");

      assert.ok(1);
    });
});
