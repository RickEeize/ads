package ru.jarsoft.ads.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class DeletingException extends Exception{
    private final List<Integer> bannerIds;
    public DeletingException(String message, List<Integer> bannerIds) {
        super(message);
        this.bannerIds = bannerIds;
    }

    @Override
    public String getMessage() {
        return super.getMessage() + " " + bannerIds.toString();
    }
}
