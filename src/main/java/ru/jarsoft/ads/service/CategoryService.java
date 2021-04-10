package ru.jarsoft.ads.service;


import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.jarsoft.ads.dto.CategoryDto;
import ru.jarsoft.ads.exception.DeletingException;
import ru.jarsoft.ads.exception.EmptyFieldException;
import ru.jarsoft.ads.exception.FieldAlreadyExistException;
import ru.jarsoft.ads.exception.SizeLimitExceededException;
import ru.jarsoft.ads.mapper.CategoryMapper;
import ru.jarsoft.ads.model.Banner;
import ru.jarsoft.ads.model.Category;
import ru.jarsoft.ads.repository.BannerRepository;
import ru.jarsoft.ads.repository.CategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;
    private final BannerRepository bannerRepository;

    @Autowired
    public CategoryService(CategoryMapper categoryMapper,
                           CategoryRepository categoryRepository,
                           BannerRepository bannerRepository) {
        this.categoryMapper = categoryMapper;
        this.categoryRepository = categoryRepository;
        this.bannerRepository = bannerRepository;
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> all = categoryRepository.findAllByDeletedIsFalse();
        return all.stream().map(categoryMapper::map).collect(Collectors.toList());
    }

    public CategoryDto getCategory(int id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return categoryMapper.map(category);
    }

    public void newCategory(CategoryDto categoryDto) throws FieldAlreadyExistException, EmptyFieldException, SizeLimitExceededException {
        checkCategoryCorrect(categoryDto);
        Category newCategory = categoryMapper.map(categoryDto);
        categoryRepository.save(newCategory);
    }

    public void updateCategory(int id, CategoryDto categoryDto) throws EmptyFieldException, FieldAlreadyExistException, SizeLimitExceededException {
        checkCategoryCorrect(categoryDto);
        Category newCategory = categoryMapper.map(categoryDto);
        Category oldCategory = categoryRepository.findById(id).orElseThrow();
        oldCategory.setName(newCategory.getName());
        oldCategory.setRequestName(newCategory.getRequestName());
        categoryRepository.save(oldCategory);
    }

    public void deleteCategory(int id) throws DeletingException {
        Category category = categoryRepository.findById(id).orElseThrow();
        List<Banner> banners = bannerRepository.findAllByDeletedIsFalseAndCategory_NameEquals(category.getName());
        if (!banners.isEmpty()) {
            throw new DeletingException(
                    "Cannot delete category that appears in banners with ids:",
                    banners.stream().map(Banner::getId).collect(Collectors.toList())
            );
        }
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    private void checkCategoryCorrect(CategoryDto categoryDto) throws EmptyFieldException, FieldAlreadyExistException, SizeLimitExceededException {
        if (StringUtils.isBlank(categoryDto.getName()))
            throw new EmptyFieldException("Category name cannot be blank");
        if(categoryDto.getName().length() > 255)
            throw new SizeLimitExceededException("Category name must be no longer than 255");
        if (StringUtils.isBlank(categoryDto.getRequestName()))
            throw new EmptyFieldException("Category request name cannot be blank");
        if(categoryDto.getRequestName().length() > 255)
            throw new SizeLimitExceededException("Category request name must be no longer than 255");
        categoryDto.setName(categoryDto.getName().trim());
        categoryDto.setRequestName(categoryDto.getRequestName().trim());
        if (categoryRepository.findByName(categoryDto.getName()) != null)
            throw new FieldAlreadyExistException("Category with name '" + categoryDto.getName() + "' already exist");
        if (categoryRepository.findByRequestName(categoryDto.getRequestName()) != null)
            throw new FieldAlreadyExistException(
                    "Category with request name '" + categoryDto.getRequestName() + "' already exist"
            );
    }
}
