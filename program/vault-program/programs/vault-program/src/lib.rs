use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("J7Ng6Tf7bYbRh85qSeYC52sJUJbtBArvPgpUWXi3KQdT");

#[program]
pub mod vault_program {
    use super::*;

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.user_vault_account.to_account_info(),
                },
            ),
            amount,
        )?;

        ctx.accounts.user_interactions_counter.total_deposits += 1;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let bump = *ctx.bumps.get("user_vault_account").unwrap();

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user_vault_account.key(),
            &ctx.accounts.signer.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke_signed(
            &ix,
            &[
                ctx.accounts.user_vault_account.to_account_info(),
                ctx.accounts.signer.to_account_info(),
            ],
            &[&[b"vault", ctx.accounts.signer.key().as_ref(), &[bump]]],
        )?;

        ctx.accounts.user_interactions_counter.total_withdrawals += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    /// CHECK: `user_vault_account` is safe because it is created and initialized
    /// by the signer, ensuring it has the correct ownership and permissions.
    #[account(mut, seeds=[b"vault", signer.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(init_if_needed, space = 16 + 8, seeds=[b"counter", signer.key().as_ref()], bump, payer = signer)]
    pub user_interactions_counter: Account<'info, UserInteractions>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    /// CHECK: `user_vault_account` is safe because it is created and initialized
    /// by the signer, ensuring it has the correct ownership and permissions.
    #[account(mut, seeds=[b"vault", signer.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(mut, seeds=[b"counter", signer.key().as_ref()], bump)]
    pub user_interactions_counter: Account<'info, UserInteractions>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserInteractions {
    total_deposits: u64,
    total_withdrawals: u64,
}