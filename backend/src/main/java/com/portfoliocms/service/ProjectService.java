package com.portfoliocms.service;

import com.portfoliocms.dto.ProjectRequest;
import com.portfoliocms.dto.ProjectResponse;
import com.portfoliocms.entity.Project;
import com.portfoliocms.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> getPublicProjects() {
        return projectRepository.findByPublicVisibleTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProjectResponse getProject(Long id) {
        return projectRepository.findById(id)
                .map(this::mapToResponse)
                .orElse(null);
    }

    public ProjectResponse createProject(ProjectRequest request) {
        Project project = new Project();
        updateEntity(project, request);
        Project saved = projectRepository.save(project);
        return mapToResponse(saved);
    }

    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Projeto não encontrado"));
        updateEntity(project, request);
        Project saved = projectRepository.save(project);
        return mapToResponse(saved);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    private void updateEntity(Project project, ProjectRequest request) {
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setImageUrl(request.getImageUrl());
        project.setProjectUrl(request.getProjectUrl());
        project.setRepositoryUrl(request.getRepositoryUrl());
        project.setPublicVisible(request.isPublicVisible());
    }

    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setImageUrl(project.getImageUrl());
        response.setProjectUrl(project.getProjectUrl());
        response.setRepositoryUrl(project.getRepositoryUrl());
        response.setPublicVisible(project.isPublicVisible());
        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());
        return response;
    }
}
