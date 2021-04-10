package ru.jarsoft.ads.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import ru.jarsoft.ads.dto.CategoryDto;
import ru.jarsoft.ads.model.Category;

@Mapper(componentModel = "spring")
@Component
public interface CategoryMapper {

    CategoryDto map(Category category);

    Category map(CategoryDto category);
}

