package com.transaction.BankDemo;

import java.math.BigDecimal;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private AsyncTransactionService asyncTransactionService;

    @PostMapping("/transactions")
    public CompletableFuture<ResponseEntity<Transaction>> createTransaction(@RequestParam Long accountId,
            @RequestParam BigDecimal amount,
            @RequestParam TransactionType type) {
        return asyncTransactionService.processTransaction(accountId, amount, type)
                .thenApply(ResponseEntity::ok);
    }
}
