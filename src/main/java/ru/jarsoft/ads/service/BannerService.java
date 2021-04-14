package ru.jarsoft.ads.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.jarsoft.ads.dto.BannerDto;
import ru.jarsoft.ads.exception.FieldContentException;
import ru.jarsoft.ads.exception.FieldAlreadyExistException;
import ru.jarsoft.ads.exception.SizeLimitExceededException;
import ru.jarsoft.ads.mapper.BannerMapper;
import ru.jarsoft.ads.model.Banner;
import ru.jarsoft.ads.repository.BannerRepository;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class BannerService {
    private final BannerRepository bannerRepository;
    private final BannerMapper bannerMapper;

    @Autowired
    public BannerService(BannerRepository bannerRepository, BannerMapper bannerMapper) {
        this.bannerRepository = bannerRepository;
        this.bannerMapper = bannerMapper;
    }

    public List<BannerDto> getAllBanners() {
        List<Banner> all = bannerRepository.findAllByDeletedIsFalse();
        return all.stream().map(bannerMapper::map).collect(Collectors.toList());
    }

    public BannerDto getBanner(int id) {
        Banner banner = bannerRepository.findById(id).orElse(null);
        return bannerMapper.map(banner);
    }

    public BannerDto newBanner(BannerDto bannerDto) throws FieldAlreadyExistException, FieldContentException, SizeLimitExceededException {
        checkBannerCorrect(bannerDto);
        Banner b = bannerMapper.map(bannerDto);
        return bannerMapper.map(bannerRepository.save(b));
    }

    public BannerDto updateBanner(int id, BannerDto bannerDto) throws FieldAlreadyExistException, FieldContentException, SizeLimitExceededException {
        checkBannerCorrect(bannerDto);
        Banner newBanner = bannerMapper.map(bannerDto);
        Banner oldBanner = bannerRepository.findById(id).orElseThrow();
        oldBanner.setName(newBanner.getName());
        oldBanner.setContent(newBanner.getContent());
        oldBanner.setPrice(newBanner.getPrice());
        oldBanner.setCategory(newBanner.getCategory());
        bannerRepository.save(oldBanner);
        return bannerMapper.map(oldBanner);
    }

    public BannerDto deleteBanner(int id) {
        Banner banner = bannerRepository.findById(id).orElseThrow();
        banner.setDeleted(true);
        bannerRepository.save(banner);
        return bannerMapper.map(banner);
    }

    private void checkBannerCorrect(BannerDto bannerDto) throws FieldContentException, FieldAlreadyExistException, SizeLimitExceededException {
        if (StringUtils.isBlank(bannerDto.getName()))
            throw new FieldContentException("Banner name cannot be blank");
        if(bannerDto.getName().length() > 255)
            throw new SizeLimitExceededException("Banner name must be no longer than 255");
        if (StringUtils.isBlank(bannerDto.getContent()))
            throw new FieldContentException("Banner content cannot be blank");
        if(bannerDto.getPrice() == null)
            throw new FieldContentException("Need to specify banner price");
        if (StringUtils.isBlank(bannerDto.getCategoryName()))
            throw new FieldContentException("Banner category name cannot be blank");
        if (StringUtils.isBlank(bannerDto.getPrice()))
            throw new FieldContentException("Banner price cannot be blank");
        bannerDto.setPrice(bannerDto.getPrice().trim());
        if(!bannerDto.getPrice().matches("[0-9]{0,8}([.][0-9]{1,2})?")){
            throw new FieldContentException("Banner price must be in the form `xxxxxxxx.xx`");
        }
        bannerDto.setName(bannerDto.getName().trim());
        bannerDto.setCategoryName(bannerDto.getCategoryName().trim());

        Banner byName = bannerRepository.findByNameAndDeletedIsFalse(bannerDto.getName());
        if (byName != null && byName.getId() != bannerDto.getId()) {
            throw new FieldAlreadyExistException(
                    "Banner with name '" + bannerDto.getName() + "' already exist"
            );
        }
    }
}
