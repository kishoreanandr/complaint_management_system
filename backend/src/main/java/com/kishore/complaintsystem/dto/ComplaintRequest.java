package com.kishore.complaintsystem.dto;

import lombok.Data;

@Data
public class ComplaintRequest {
    private String title;
    private String description;
    private String userEmail;
}

