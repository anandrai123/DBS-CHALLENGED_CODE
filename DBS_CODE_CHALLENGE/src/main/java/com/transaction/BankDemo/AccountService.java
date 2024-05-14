package com.transaction.BankDemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Account createAccount(String owner, String password, BigDecimal balance) {
        Account account = new Account();
        account.setOwner(owner);
        account.setPassword(passwordEncoder.encode(password));
        account.setBalance(balance);

        return accountRepository.save(account);
    }
}
