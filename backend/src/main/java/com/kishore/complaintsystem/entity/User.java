package com.kishore.complaintsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    private String name;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        STUDENT, ADMIN
    }
}
