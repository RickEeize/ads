package ru.jarsoft.ads.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.jarsoft.ads.dto.BannerDto;
import ru.jarsoft.ads.model.Banner;
import ru.jarsoft.ads.repository.CategoryRepository;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
@Component
public abstract class BannerMapper {

    @Autowired
    protected CategoryRepository repo;

    @Mapping(target = "categoryName", source = "banner.category.name")
    public abstract BannerDto map(Banner banner);

    public abstract Banner map(BannerDto bannerDto);

    @AfterMapping
    public void map(@MappingTarget Banner target, BannerDto source) {
        target.setCategory(repo.findByName(source.getCategoryName()));
        target.setPrice(new BigDecimal(source.getPrice()));
    }
}
