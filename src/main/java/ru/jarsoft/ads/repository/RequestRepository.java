package ru.jarsoft.ads.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.jarsoft.ads.model.Request;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findAllByIpAddressAndUserAgentAndDateAfterAndBannerIsNotNull(String ipAddress,
                                                                               String userAgent,
                                                                               LocalDateTime date);
}
