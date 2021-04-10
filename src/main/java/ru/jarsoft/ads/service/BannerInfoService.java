package ru.jarsoft.ads.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.jarsoft.ads.exception.BannerNotFoundException;
import ru.jarsoft.ads.model.Banner;
import ru.jarsoft.ads.model.Request;
import ru.jarsoft.ads.repository.BannerRepository;
import ru.jarsoft.ads.repository.RequestRepository;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class BannerInfoService {

    private final BannerRepository bannerRepository;
    private final RequestRepository requestRepository;

    @Autowired
    public BannerInfoService(BannerRepository bannerRepository, RequestRepository requestRepository) {
        this.bannerRepository = bannerRepository;
        this.requestRepository = requestRepository;
    }

    public String getBannerText(String category, String ip, String userAgent) throws BannerNotFoundException {

        List<Banner> banners = bannerRepository.findAllByDeletedIsFalseAndCategory_NameEquals(category);
        if (banners.isEmpty()) {
            saveRequest(null, ip, userAgent);
            throw new BannerNotFoundException();
        }

        Instant yesterday = Instant.now().minus(1, ChronoUnit.DAYS);
        List<Request> requests = requestRepository.findAllByIpAddressAndUserAgentAndDateAfterAndBannerIsNotNull(
                ip,
                userAgent,
                LocalDateTime.ofInstant(yesterday, ZoneId.systemDefault())
        );
        banners = banners.stream()
                .filter(banner -> requests.stream()
                        .noneMatch(request -> request.getBanner().getId() == banner.getId()))
                .collect(Collectors.toList());
        if (banners.isEmpty()) {
            saveRequest(null, ip, userAgent);
            throw new BannerNotFoundException();
        }


        BigDecimal maxPrice = banners.stream()
                .max(Comparator.comparing(Banner::getPrice)).orElse(null).getPrice();
        banners = banners.stream()
                .filter(banner -> banner.getPrice().compareTo(maxPrice) == 0)
                .collect(Collectors.toList());

        int index = new Random().nextInt(banners.size());
        saveRequest(banners.get(index), ip, userAgent);
        return banners.get(index).getContent();
    }

    public void saveRequest(Banner banner, String ip, String userAgent) {
        Request request = new Request();
        request.setBanner(banner);
        request.setDate(LocalDateTime.now());
        request.setIpAddress(ip);
        request.setUserAgent(userAgent);
        System.out.println(request);
        requestRepository.save(request);
    }
}
