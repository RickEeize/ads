package ru.jarsoft.ads.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "banner")
@Getter
@Setter
@NoArgsConstructor
public class Banner {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private BigDecimal price;

    @ManyToOne
    private Category category;

    private String content;
    private boolean deleted;
}
