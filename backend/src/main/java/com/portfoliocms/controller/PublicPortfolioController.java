package com.portfoliocms.controller;

import com.portfoliocms.dto.ProfileResponse;
import com.portfoliocms.dto.ProjectResponse;
import com.portfoliocms.service.ProfileService;
import com.portfoliocms.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicPortfolioController {

    private final ProfileService profileService;
    private final ProjectService projectService;

    public PublicPortfolioController(ProfileService profileService, ProjectService projectService) {
        this.profileService = profileService;
        this.projectService = projectService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile() {
        return ResponseEntity.ok(profileService.getProfile());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectResponse>> getProjects() {
        return ResponseEntity.ok(projectService.getPublicProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectResponse> getProject(@PathVariable Long id) {
        ProjectResponse response = projectService.getProject(id);
        if (response == null || !response.isPublicVisible()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
