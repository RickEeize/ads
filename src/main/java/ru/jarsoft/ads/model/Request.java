package ru.jarsoft.ads.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "request")
@Getter
@Setter
@NoArgsConstructor
public class Request {
    @Id
    @GeneratedValue
    private int id;
    @ManyToOne
    private Banner banner;
    private String userAgent;
    private String ipAddress;
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private LocalDateTime date;
}
