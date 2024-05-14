package com.transaction.BankDemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Validated
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/accounts")
    public ResponseEntity<Account> createAccount(@Validated @RequestBody AccountCreationDTO accountCreationDTO) {
        Account account = accountService.createAccount(
                accountCreationDTO.getOwner(),
                accountCreationDTO.getPassword(),
                accountCreationDTO.getBalance());
        return new ResponseEntity<>(account, HttpStatus.CREATED);
    }
}
