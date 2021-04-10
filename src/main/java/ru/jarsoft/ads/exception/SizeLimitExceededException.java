package ru.jarsoft.ads.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class SizeLimitExceededException extends Exception{
    public SizeLimitExceededException(String message) {
        super(message);
    }
}
