package ru.jarsoft.ads.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class EmptyFieldException extends Exception {
    public EmptyFieldException(String message) {
        super(message);
    }
}