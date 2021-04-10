package ru.jarsoft.ads.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String requestName;
    private boolean deleted;
}
