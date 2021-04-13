package ru.jarsoft.ads.dto;

import lombok.Data;

@Data
public class BannerDto {
    private int id;
    private String name;
    private String price;
    private String content;
    private String categoryName;
}
