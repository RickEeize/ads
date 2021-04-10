package ru.jarsoft.ads.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BannerDto {
    private int id;
    private String name;
    private BigDecimal price;
    private String content;
    private String categoryName;
}
