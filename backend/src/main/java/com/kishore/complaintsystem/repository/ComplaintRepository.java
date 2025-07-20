package com.kishore.complaintsystem.repository;

import com.kishore.complaintsystem.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    List<Complaint> findByUserEmail(String email);

}
