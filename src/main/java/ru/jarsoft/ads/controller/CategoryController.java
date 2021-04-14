package ru.jarsoft.ads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.jarsoft.ads.dto.CategoryDto;
import ru.jarsoft.ads.exception.DeletingException;
import ru.jarsoft.ads.exception.FieldContentException;
import ru.jarsoft.ads.exception.FieldAlreadyExistException;
import ru.jarsoft.ads.exception.SizeLimitExceededException;
import ru.jarsoft.ads.service.CategoryService;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<CategoryDto> newCategory(@RequestBody CategoryDto categoryDto) throws FieldAlreadyExistException, FieldContentException, SizeLimitExceededException {
        categoryService.newCategory(categoryDto);
        return ResponseEntity.ok(categoryDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.getCategory(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable int id, @RequestBody CategoryDto categoryDto) throws FieldAlreadyExistException, FieldContentException, SizeLimitExceededException {
        categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(categoryDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CategoryDto> deleteCategory(@PathVariable int id) throws DeletingException {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
