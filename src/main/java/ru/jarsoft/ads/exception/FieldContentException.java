package ru.jarsoft.ads.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class FieldContentException extends Exception {
    public FieldContentException(String message) {
        super(message);
    }
}