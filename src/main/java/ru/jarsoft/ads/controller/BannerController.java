package ru.jarsoft.ads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.jarsoft.ads.dto.BannerDto;
import ru.jarsoft.ads.exception.FieldContentException;
import ru.jarsoft.ads.exception.FieldAlreadyExistException;
import ru.jarsoft.ads.exception.SizeLimitExceededException;
import ru.jarsoft.ads.service.BannerService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("banners")
public class BannerController {

    private final BannerService bannerService;

    @Autowired
    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @GetMapping
    public ResponseEntity<List<BannerDto>> getAllBanners() {
        return ResponseEntity.ok(bannerService.getAllBanners());
    }

    @PostMapping
    public ResponseEntity<BannerDto> newBanner(@RequestBody BannerDto bannerDto) throws FieldAlreadyExistException, FieldContentException, SizeLimitExceededException {
        return ResponseEntity.ok(bannerService.newBanner(bannerDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BannerDto> getBannerById(@PathVariable int id) {
        return ResponseEntity.ok(bannerService.getBanner(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BannerDto> updateBanner(@PathVariable int id, @RequestBody BannerDto bannerDto) throws FieldAlreadyExistException, FieldContentException, SizeLimitExceededException {
        return ResponseEntity.ok(bannerService.updateBanner(id, bannerDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BannerDto> deleteBanner(@PathVariable int id) {
        return ResponseEntity.ok(bannerService.deleteBanner(id));
    }
}
