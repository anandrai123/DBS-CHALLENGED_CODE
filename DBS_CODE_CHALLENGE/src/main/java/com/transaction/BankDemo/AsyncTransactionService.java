package com.transaction.BankDemo;

import java.math.BigDecimal;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AsyncTransactionService {

    @Autowired
    private TransactionService transactionService;

    @Async
    public CompletableFuture<Transaction> processTransaction(Long accountId, BigDecimal amount, TransactionType type) {
        return CompletableFuture.completedFuture(transactionService.createTransaction(accountId, amount, type));
    }
}
