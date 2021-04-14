package ru.jarsoft.ads.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.jarsoft.ads.model.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findAllByDeletedIsFalse();

    Category findByNameAndDeletedIsFalse(String categoryName);

    Category findByRequestNameAndDeletedIsFalse(String requestName);
}
