package ru.jarsoft.ads.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.jarsoft.ads.model.Banner;
import ru.jarsoft.ads.model.Category;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Integer> {
    List<Banner> findAllByDeletedIsFalse();
    List<Banner> findAllByDeletedIsFalseAndCategory_NameEquals(String category_name);

    Banner findByName(String name);
}