# Sanitized ticket — fee calculation bug

This document is a sanitized version of the original ticket. Sensitive values were removed or replaced with placeholders so the issue remains understandable to an AI or teammate without exposing secrets or PII.

## Classification summary

- 🔴 Removed: secrets, PII, banking details, production logs, and connection strings.
- 🟡 Generalized: internal component and branch names.
- 🟢 Kept: the bug description, reproduction steps, and acceptance criteria.

## Ticket

**Title:** Bug: incorrect fee calculation for premium accounts

**Priority:** High

## Description

A customer reported that the transfer fee is applied twice for a premium account. The issue is reproducible for a specific account scenario.

## Customer context

- Customer name: [CUSTOMER_1]
- Contact details: removed
- Card: ****-1234
- IBAN: <IBAN>
- Balance: masked
- Identity documents: removed

## Reproduction steps

1. Start a transfer for a premium account.
2. Observe that the fee is applied during both the pre-authorization and settlement stages.
3. The total fee ends up higher than expected.

## Internal logic

The issue appears in the fee calculation flow for the payments component. The fee is added in both the pre-authorization and settlement stages. The related implementation is associated with a feature branch, but the branch name is intentionally generalized.

## Acceptance criteria

- The transfer fee is applied exactly once.
- A regression test covers the pre-auth → settle flow.
- The public interface remains unchanged.

## Notes

- Secrets and credentials were replaced with <SECRET_OUT_OF_BAND> and removed from the document.
- Production log details were abstracted to preserve the bug context without exposing system internals.
