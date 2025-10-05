package com.portfoliocms.service;

import com.portfoliocms.dto.ProfileRequest;
import com.portfoliocms.dto.ProfileResponse;
import com.portfoliocms.entity.Profile;
import com.portfoliocms.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileResponse getProfile() {
        return profileRepository.findAll().stream()
                .findFirst()
                .map(this::mapToResponse)
                .orElse(null);
    }

    public ProfileResponse updateProfile(ProfileRequest request) {
        Profile profile = profileRepository.findAll().stream().findFirst().orElse(new Profile());
        profile.setFullName(request.getFullName());
        profile.setRole(request.getRole());
        profile.setBio(request.getBio());
        profile.setEmail(request.getEmail());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setLinkedinUrl(request.getLinkedinUrl());
        profile.setWhatsappUrl(request.getWhatsappUrl());
        profile.setPhotoUrl(request.getPhotoUrl());
        profile.setTheme(request.getTheme());
        profile.setSkills(request.getSkills());
        Profile saved = profileRepository.save(profile);
        return mapToResponse(saved);
    }

    private ProfileResponse mapToResponse(Profile profile) {
        ProfileResponse response = new ProfileResponse();
        response.setId(profile.getId());
        response.setFullName(profile.getFullName());
        response.setRole(profile.getRole());
        response.setBio(profile.getBio());
        response.setEmail(profile.getEmail());
        response.setGithubUrl(profile.getGithubUrl());
        response.setLinkedinUrl(profile.getLinkedinUrl());
        response.setWhatsappUrl(profile.getWhatsappUrl());
        response.setPhotoUrl(profile.getPhotoUrl());
        response.setTheme(profile.getTheme());
        response.setSkills(profile.getSkills());
        return response;
    }
}
