package ru.jarsoft.ads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.jarsoft.ads.exception.BannerNotFoundException;
import ru.jarsoft.ads.service.BannerInfoService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("bid")
public class BannerInfoController {

    private final BannerInfoService bannerInfoService;

    @Autowired
    public BannerInfoController(BannerInfoService bannerInfoService) {
        this.bannerInfoService = bannerInfoService;
    }

    @GetMapping()
    public ResponseEntity<String> getBannerText(@RequestParam String category, HttpServletRequest request) throws BannerNotFoundException {
        String userAgent = request.getHeader("user-agent");
        String ip = request.getRemoteAddr();
        return ResponseEntity.ok(bannerInfoService.getBannerText(category, ip, userAgent));

    }
}
