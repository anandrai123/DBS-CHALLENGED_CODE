package com.transaction.BankDemo;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Retry(name = "transactionService")
    @CircuitBreaker(name = "transactionService", fallbackMethod = "fallbackCreateTransaction")
    @Transactional
    public Transaction createTransaction(Long accountId, BigDecimal amount, TransactionType type) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        if (type == TransactionType.DEBIT && account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient funds");
        }

        if (type == TransactionType.CREDIT) {
            account.setBalance(account.getBalance().add(amount));
        } else if (type == TransactionType.DEBIT) {
            account.setBalance(account.getBalance().subtract(amount));
        }

        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setTimestamp(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    public Transaction fallbackCreateTransaction(Long accountId, BigDecimal amount, TransactionType type, Throwable t) {
        // Fallback logic, e.g., logging or returning a default response
        Transaction fallbackTransaction = new Transaction();
        fallbackTransaction.setAccountId(accountId);
        fallbackTransaction.setAmount(BigDecimal.ZERO);
        fallbackTransaction.setType(type);
        fallbackTransaction.setTimestamp(LocalDateTime.now());
        return fallbackTransaction;
    }
}
